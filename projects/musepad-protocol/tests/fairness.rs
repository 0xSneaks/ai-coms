//! Proof tests for MusePad v0, run against Solana's real runtime (BanksClient).
use borsh::{BorshDeserialize, BorshSerialize};
use musepad::*;
use solana_program::{program_pack::Pack, pubkey::Pubkey, system_program};
use solana_program_test::{processor, BanksClientError, ProgramTest, ProgramTestContext};
use solana_sdk::{
    account::Account,
    instruction::{AccountMeta, Instruction, InstructionError},
    signature::{Keypair, Signer},
    system_instruction,
    transaction::{Transaction, TransactionError},
};

const SOL: u64 = 1_000_000_000;
const WINDOW: u64 = 5;

struct Env {
    ctx: ProgramTestContext,
    pid: Pubkey,
    mint: Keypair,
    launch: Pubkey,
    fee: Pubkey,
    creator: Keypair,
}

fn funded(pt: &mut ProgramTest, kp: &Keypair, sol: u64) {
    pt.add_account(kp.pubkey(), Account { lamports: sol * SOL, owner: system_program::id(), ..Account::default() });
}

async fn setup(buyers: &[&Keypair], fee_bps: u16, cap: u64) -> Env {
    let pid = Pubkey::new_unique();
    let mut pt = ProgramTest::new("musepad", pid, processor!(process_instruction));
    let creator = Keypair::new();
    funded(&mut pt, &creator, 10);
    for b in buyers {
        funded(&mut pt, b, 1_000);
    }
    let fee = Pubkey::new_unique();
    pt.add_account(fee, Account { lamports: SOL, owner: system_program::id(), ..Account::default() });
    let mut ctx = pt.start_with_context().await;
    let mint = Keypair::new();
    let (launch, _) = launch_pda(&pid, &mint.pubkey());
    let ix = Instruction {
        program_id: pid,
        accounts: vec![
            AccountMeta::new(creator.pubkey(), true),
            AccountMeta::new(mint.pubkey(), true),
            AccountMeta::new(launch, false),
            AccountMeta::new_readonly(fee, false),
            AccountMeta::new_readonly(system_program::id(), false),
            AccountMeta::new_readonly(spl_token::id(), false),
        ],
        data: borsh::to_vec(&Ix::CreateLaunch { fee_bps, window_slots: WINDOW, max_lamports_per_order: cap }).unwrap(),
    };
    send(&mut ctx, &[ix], &[&creator, &mint]).await.expect("create launch");
    Env { ctx, pid, mint, launch, fee, creator }
}

async fn send(ctx: &mut ProgramTestContext, ixs: &[Instruction], signers: &[&Keypair]) -> Result<(), BanksClientError> {
    let bh = ctx.get_new_latest_blockhash().await.unwrap();
    let payer = signers[0];
    let tx = Transaction::new_signed_with_payer(ixs, Some(&payer.pubkey()), signers, bh);
    ctx.banks_client.process_transaction(tx).await
}

fn custom(e: BanksClientError) -> u32 {
    match e.unwrap() {
        TransactionError::InstructionError(_, InstructionError::Custom(c)) => c,
        other => panic!("expected custom error, got {other:?}"),
    }
}

async fn launch_state(env: &mut Env) -> Launch {
    let a = env.ctx.banks_client.get_account(env.launch).await.unwrap().unwrap();
    Launch::try_from_slice(&a.data).unwrap()
}

async fn order(env: &mut Env, buyer: &Keypair, lamports: u64) -> Result<(), BanksClientError> {
    let l = launch_state(env).await;
    let (o, _) = order_pda(&env.pid, &env.launch, l.batch_id, &buyer.pubkey());
    let ix = Instruction {
        program_id: env.pid,
        accounts: vec![
            AccountMeta::new(buyer.pubkey(), true),
            AccountMeta::new(env.launch, false),
            AccountMeta::new(o, false),
            AccountMeta::new(env.fee, false),
            AccountMeta::new_readonly(system_program::id(), false),
        ],
        data: borsh::to_vec(&Ix::PlaceOrder { lamports }).unwrap(),
    };
    send(&mut env.ctx, &[ix], &[buyer]).await
}

async fn settle(env: &mut Env, by: &Keypair) -> Result<u64, BanksClientError> {
    let l = launch_state(env).await;
    let (b, _) = batch_pda(&env.pid, &env.launch, l.batch_id);
    let ix = Instruction {
        program_id: env.pid,
        accounts: vec![
            AccountMeta::new(by.pubkey(), true),
            AccountMeta::new(env.launch, false),
            AccountMeta::new(b, false),
            AccountMeta::new_readonly(system_program::id(), false),
        ],
        data: borsh::to_vec(&Ix::SettleBatch).unwrap(),
    };
    send(&mut env.ctx, &[ix], &[by]).await.map(|_| l.batch_id)
}

async fn warp_past_window(env: &mut Env) {
    let slot = env.ctx.banks_client.get_root_slot().await.unwrap();
    env.ctx.warp_to_slot(slot + WINDOW + 2).unwrap();
}

async fn token_account(env: &mut Env, owner: &Keypair) -> Pubkey {
    let ta = Keypair::new();
    let rent = env.ctx.banks_client.get_rent().await.unwrap().minimum_balance(spl_token::state::Account::LEN);
    let ixs = [
        system_instruction::create_account(&owner.pubkey(), &ta.pubkey(), rent, spl_token::state::Account::LEN as u64, &spl_token::id()),
        spl_token::instruction::initialize_account3(&spl_token::id(), &ta.pubkey(), &env.mint.pubkey(), &owner.pubkey()).unwrap(),
    ];
    send(&mut env.ctx, &ixs, &[owner, &ta]).await.unwrap();
    ta.pubkey()
}

async fn claim(env: &mut Env, payer: &Keypair, buyer: &Pubkey, batch_id: u64, dest: Pubkey) -> Result<u64, BanksClientError> {
    let (b, _) = batch_pda(&env.pid, &env.launch, batch_id);
    let (o, _) = order_pda(&env.pid, &env.launch, batch_id, buyer);
    let ix = Instruction {
        program_id: env.pid,
        accounts: vec![
            AccountMeta::new(payer.pubkey(), true),
            AccountMeta::new_readonly(env.launch, false),
            AccountMeta::new_readonly(b, false),
            AccountMeta::new(o, false),
            AccountMeta::new(env.mint.pubkey(), false),
            AccountMeta::new(dest, false),
            AccountMeta::new_readonly(spl_token::id(), false),
        ],
        data: borsh::to_vec(&Ix::Claim { batch_id }).unwrap(),
    };
    send(&mut env.ctx, &[ix], &[payer]).await?;
    Ok(balance(env, dest).await)
}

async fn balance(env: &mut Env, ta: Pubkey) -> u64 {
    let a = env.ctx.banks_client.get_account(ta).await.unwrap().unwrap();
    spl_token::state::Account::unpack(&a.data).unwrap().amount
}

#[tokio::test]
async fn rule04_creator_starts_with_zero_and_only_the_curve_can_mint() {
    let mut env = setup(&[], 100, 10 * SOL).await;
    let m = env.ctx.banks_client.get_account(env.mint.pubkey()).await.unwrap().unwrap();
    let mint = spl_token::state::Mint::unpack(&m.data).unwrap();
    assert_eq!(mint.supply, 0, "no tokens exist at launch: no dev buy, no pre-allocation");
    assert_eq!(mint.mint_authority.unwrap(), env.launch, "only the launch PDA (the curve) can mint");
    assert!(mint.freeze_authority.is_none(), "nobody can freeze holders");
    let l = launch_state(&mut env).await;
    assert_eq!(l.creator, env.creator.pubkey());
}

#[tokio::test]
async fn rule01_sniper_first_and_human_last_pay_the_same_price() {
    let sniper = Keypair::new();
    let human = Keypair::new();
    let crowd: Vec<Keypair> = (0..4).map(|_| Keypair::new()).collect();
    let mut all = vec![&sniper, &human];
    all.extend(crowd.iter());
    let mut env = setup(&all, 100, 50 * SOL).await;

    // Same window: the sniper lands first with the biggest order, the human last.
    order(&mut env, &sniper, 20 * SOL).await.unwrap();
    for c in &crowd {
        order(&mut env, c, 2 * SOL).await.unwrap();
    }
    order(&mut env, &human, SOL / 2).await.unwrap();

    warp_past_window(&mut env).await;
    let anyone = Keypair::new();
    env.ctx.set_account(&anyone.pubkey(), &Account { lamports: SOL, owner: system_program::id(), ..Account::default() }.into());
    let batch = settle(&mut env, &anyone).await.expect("anyone can settle a closed window");

    let s_ta = token_account(&mut env, &sniper).await;
    let h_ta = token_account(&mut env, &human).await;
    let s_tok = claim(&mut env, &sniper, &sniper.pubkey(), batch, s_ta).await.unwrap();
    let h_tok = claim(&mut env, &human, &human.pubkey(), batch, h_ta).await.unwrap();

    let net = |sol: u64| sol - sol * 100 / 10_000;
    let s_price = net(20 * SOL) as f64 / s_tok as f64;
    let h_price = net(SOL / 2) as f64 / h_tok as f64;
    let rel = (s_price - h_price).abs() / h_price;
    println!("sniper: {s_tok} tokens for {} lamports, price {s_price:.9} lamports/unit", net(20 * SOL));
    println!("human : {h_tok} tokens for {} lamports, price {h_price:.9} lamports/unit", net(SOL / 2));
    assert!(rel < 1e-6, "same window, same price (rounding only): diff {rel}");

    // What the same orders would have paid on a first-come curve (today's pads).
    let fifo_s = curve_buy(VIRTUAL_SOL_0, VIRTUAL_TOKENS_0, net(20 * SOL)).unwrap();
    let mut vs = VIRTUAL_SOL_0 + net(20 * SOL);
    let mut vt = VIRTUAL_TOKENS_0 - fifo_s;
    for _ in 0..4 {
        let t = curve_buy(vs, vt, net(2 * SOL)).unwrap();
        vs += net(2 * SOL);
        vt -= t;
    }
    let fifo_h = curve_buy(vs, vt, net(SOL / 2)).unwrap();
    let fifo_gap = (net(SOL / 2) as f64 / fifo_h as f64) / (net(20 * SOL) as f64 / fifo_s as f64);
    println!("first-come curve: the human pays {fifo_gap:.3}x the sniper's price; MusePad: {:.6}x", h_price / s_price);
    assert!(fifo_gap > 1.5, "today's model gives the sniper a big edge");
}

#[tokio::test]
async fn rule02_one_order_per_wallet_per_window_and_a_cap() {
    let w = Keypair::new();
    let mut env = setup(&[&w], 0, 5 * SOL).await;
    order(&mut env, &w, SOL).await.unwrap();
    assert!(order(&mut env, &w, SOL).await.is_err(), "second order in the same window must fail");
    let w2 = Keypair::new();
    env.ctx.set_account(&w2.pubkey(), &Account { lamports: 100 * SOL, owner: system_program::id(), ..Account::default() }.into());
    assert_eq!(custom(order(&mut env, &w2, 6 * SOL).await.unwrap_err()), MuseError::BadAmount as u32, "cap enforced");
    assert_eq!(custom(order(&mut env, &w2, 0).await.unwrap_err()), MuseError::BadAmount as u32);
}

#[tokio::test]
async fn windows_settle_only_when_closed_and_orders_wait_for_the_next() {
    let a = Keypair::new();
    let mut env = setup(&[&a], 0, 10 * SOL).await;
    order(&mut env, &a, SOL).await.unwrap();
    assert_eq!(custom(settle(&mut env, &a).await.unwrap_err()), MuseError::WindowOpen as u32);
    warp_past_window(&mut env).await;
    let b = Keypair::new();
    env.ctx.set_account(&b.pubkey(), &Account { lamports: 10 * SOL, owner: system_program::id(), ..Account::default() }.into());
    assert_eq!(custom(order(&mut env, &b, SOL).await.unwrap_err()), MuseError::WindowClosed as u32, "late order can't sneak into a closed window");
    settle(&mut env, &b).await.unwrap();
    order(&mut env, &b, SOL).await.unwrap();
    order(&mut env, &a, SOL).await.expect("same wallet can order again in the next window");
    let l = launch_state(&mut env).await;
    assert_eq!(l.batch_id, 1);
    assert!(l.virtual_sol > VIRTUAL_SOL_0, "the curve moved once for the whole first window");
}

#[tokio::test]
async fn claims_are_once_only_and_only_to_the_buyers_account() {
    let a = Keypair::new();
    let thief = Keypair::new();
    let mut env = setup(&[&a, &thief], 0, 10 * SOL).await;
    order(&mut env, &a, SOL).await.unwrap();
    warp_past_window(&mut env).await;
    let id = settle(&mut env, &a).await.unwrap();
    let thief_ta = token_account(&mut env, &thief).await;
    assert_eq!(custom(claim(&mut env, &thief, &a.pubkey(), id, thief_ta).await.unwrap_err()), MuseError::WrongAccount as u32);
    let a_ta = token_account(&mut env, &a).await;
    let got = claim(&mut env, &thief, &a.pubkey(), id, a_ta).await.expect("anyone may trigger delivery to the buyer");
    assert!(got > 0);
    assert_eq!(custom(claim(&mut env, &a, &a.pubkey(), id, a_ta).await.unwrap_err()), MuseError::AlreadyClaimed as u32);
}

#[tokio::test]
async fn rule06_fee_is_fixed_goes_to_the_set_recipient_and_nothing_can_change_it() {
    let a = Keypair::new();
    let mut env = setup(&[&a], 100, 10 * SOL).await;
    let before = env.ctx.banks_client.get_balance(env.fee).await.unwrap();
    order(&mut env, &a, 2 * SOL).await.unwrap();
    let after = env.ctx.banks_client.get_balance(env.fee).await.unwrap();
    assert_eq!(after - before, 2 * SOL / 100, "1% fee to the recipient fixed at launch");

    // A different fee recipient is refused.
    let b = Keypair::new();
    env.ctx.set_account(&b.pubkey(), &Account { lamports: 10 * SOL, owner: system_program::id(), ..Account::default() }.into());
    let l = launch_state(&mut env).await;
    let (o, _) = order_pda(&env.pid, &env.launch, l.batch_id, &b.pubkey());
    let ix = Instruction {
        program_id: env.pid,
        accounts: vec![
            AccountMeta::new(b.pubkey(), true),
            AccountMeta::new(env.launch, false),
            AccountMeta::new(o, false),
            AccountMeta::new(b.pubkey(), false),
            AccountMeta::new_readonly(system_program::id(), false),
        ],
        data: borsh::to_vec(&Ix::PlaceOrder { lamports: SOL }).unwrap(),
    };
    assert_eq!(custom(send(&mut env.ctx, &[ix], &[&b]).await.unwrap_err()), MuseError::WrongFeeRecipient as u32);

    // There is no admin instruction: any other instruction tag is rejected.
    for tag in 4u8..=12 {
        let ix = Instruction { program_id: env.pid, accounts: vec![AccountMeta::new(env.creator.pubkey(), true), AccountMeta::new(env.launch, false)], data: vec![tag] };
        let err = send(&mut env.ctx, &[ix], &[&env.creator.insecure_clone()]).await.unwrap_err().unwrap();
        assert_eq!(err, TransactionError::InstructionError(0, InstructionError::InvalidInstructionData));
    }
    let l2 = launch_state(&mut env).await;
    assert_eq!((l2.fee_bps, l2.fee_recipient), (100, env.fee));
}

#[tokio::test]
async fn fee_cap_is_three_percent() {
    let pid = Pubkey::new_unique();
    let mut pt = ProgramTest::new("musepad", pid, processor!(process_instruction));
    let creator = Keypair::new();
    funded(&mut pt, &creator, 10);
    let mut ctx = pt.start_with_context().await;
    let mint = Keypair::new();
    let (launch, _) = launch_pda(&pid, &mint.pubkey());
    let ix = Instruction {
        program_id: pid,
        accounts: vec![
            AccountMeta::new(creator.pubkey(), true),
            AccountMeta::new(mint.pubkey(), true),
            AccountMeta::new(launch, false),
            AccountMeta::new_readonly(Pubkey::new_unique(), false),
            AccountMeta::new_readonly(system_program::id(), false),
            AccountMeta::new_readonly(spl_token::id(), false),
        ],
        data: borsh::to_vec(&Ix::CreateLaunch { fee_bps: 301, window_slots: WINDOW, max_lamports_per_order: SOL }).unwrap(),
    };
    assert_eq!(custom(send(&mut ctx, &[ix], &[&creator, &mint]).await.unwrap_err()), MuseError::FeeTooHigh as u32);
}

#[tokio::test]
async fn attack_multi_wallet_split_gains_nothing_inside_a_window() {
    // One actor: 10 wallets x 2 SOL. Another: 1 wallet x 20 SOL. Same window.
    let split: Vec<Keypair> = (0..10).map(|_| Keypair::new()).collect();
    let whale = Keypair::new();
    let mut all: Vec<&Keypair> = split.iter().collect();
    all.push(&whale);
    let mut env = setup(&all, 0, 50 * SOL).await;
    for w in &split {
        order(&mut env, w, 2 * SOL).await.unwrap();
    }
    order(&mut env, &whale, 20 * SOL).await.unwrap();
    warp_past_window(&mut env).await;
    let id = settle(&mut env, &whale).await.unwrap();
    let mut split_total = 0u64;
    for w in &split {
        let ta = token_account(&mut env, w).await;
        split_total += claim(&mut env, w, &w.pubkey(), id, ta).await.unwrap();
    }
    let ta = token_account(&mut env, &whale).await;
    let whale_tok = claim(&mut env, &whale, &whale.pubkey(), id, ta).await.unwrap();
    println!("MEASURED multi-wallet: 10 wallets x 2 SOL -> {split_total} units; 1 wallet x 20 SOL -> {whale_tok} units");
    let diff = (split_total as i128 - whale_tok as i128).unsigned_abs();
    assert!(diff <= 10, "splitting across wallets gives no price edge (rounding only), diff {diff}");
    // Honest limit: splitting does get around the per-order cap (Rule 02 is per wallet, not per person).
}

#[tokio::test]
async fn attack_slot_edge_first_window_vs_next_window() {
    let early = Keypair::new();
    let late = Keypair::new();
    let mut env = setup(&[&early, &late], 0, 50 * SOL).await;
    order(&mut env, &early, 10 * SOL).await.unwrap();
    warp_past_window(&mut env).await;
    let w0 = settle(&mut env, &early).await.unwrap();
    order(&mut env, &late, 10 * SOL).await.unwrap();
    warp_past_window(&mut env).await;
    let w1 = settle(&mut env, &late).await.unwrap();
    let ta = token_account(&mut env, &early).await;
    let e = claim(&mut env, &early, &early.pubkey(), w0, ta).await.unwrap();
    let ta = token_account(&mut env, &late).await;
    let l = claim(&mut env, &late, &late.pubkey(), w1, ta).await.unwrap();
    let edge = e as f64 / l as f64;
    println!("MEASURED slot edge: same 10 SOL buys {e} units in window 0 vs {l} in window 1 -> first window gets {edge:.3}x the tokens");
    assert!(edge > 1.0, "the curve still rewards the earlier window; sealed orders (Rule 03) are the next piece");
}
