//! MusePad v0 — a fair-launch bonding curve for Solana.
//!
//! Every buy placed in the same batch window clears at ONE price
//! (Rule 01). Orders sit in escrow during the window; when it closes, anyone
//! can settle it: the window's total SOL is bought from the curve in one go and
//! each order gets tokens in proportion to the SOL it put in. Landing first in
//! the window buys nothing, so priority-fee sniping inside a window is useless.
//!
//! Also enforced in code:
//! - Rule 02: one order per wallet per window (the order account can exist
//!   only once), and a per-order cap.
//! - Rule 04: the creator gets zero tokens at launch. The mint authority is the
//!   launch PDA; tokens only come out of the curve, through `Claim`.
//! - Rule 06: fee rate and fee recipient are set at launch and can never be
//!   changed. There is no instruction that edits them.
//! - No admin key: there is no admin field and no admin instruction.
//!
//! Not in v0 (next): sealed orders (Rule 03), selling back to the curve,
//! graduation/LP lock (Rule 08), refunds when a window overfills the curve.

use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::{
    account_info::{next_account_info, AccountInfo},
    clock::Clock,
    entrypoint::ProgramResult,
    msg,
    program::{invoke, invoke_signed},
    program_error::ProgramError,
    program_pack::Pack,
    pubkey::Pubkey,
    rent::Rent,
    system_instruction, system_program,
    sysvar::Sysvar,
};

#[cfg(not(feature = "no-entrypoint"))]
solana_program::entrypoint!(process_instruction);

/// Curve shape (pump.fun-style constant product). Token amounts have 6 decimals.
pub const DECIMALS: u8 = 6;
pub const VIRTUAL_SOL_0: u64 = 30_000_000_000; // 30 SOL in lamports
pub const VIRTUAL_TOKENS_0: u64 = 1_073_000_000_000_000; // 1.073B tokens
pub const CURVE_TOKENS_0: u64 = 793_100_000_000_000; // tokens the curve can sell
pub const MAX_FEE_BPS: u16 = 300;

pub const LAUNCH_SEED: &[u8] = b"launch";
pub const BATCH_SEED: &[u8] = b"batch";
pub const ORDER_SEED: &[u8] = b"order";

#[derive(BorshSerialize, BorshDeserialize, Debug, Clone, PartialEq)]
pub enum Ix {
    /// Accounts: [creator (s,w), mint (s,w, new), launch PDA (w), fee_recipient,
    /// system_program, token_program]
    CreateLaunch { fee_bps: u16, window_slots: u64, max_lamports_per_order: u64 },
    /// Accounts: [buyer (s,w), launch (w), order PDA (w), fee_recipient (w), system_program]
    PlaceOrder { lamports: u64 },
    /// Permissionless. Accounts: [payer (s,w), launch (w), batch PDA (w), system_program]
    SettleBatch,
    /// Permissionless. Accounts: [payer (s), launch, batch PDA, order PDA (w),
    /// mint (w), buyer token account (w), token_program]
    Claim { batch_id: u64 },
}

#[derive(BorshSerialize, BorshDeserialize, Debug, Clone, PartialEq)]
pub struct Launch {
    pub creator: Pubkey,
    pub mint: Pubkey,
    pub fee_recipient: Pubkey,
    pub fee_bps: u16,
    pub window_slots: u64,
    pub max_lamports_per_order: u64,
    pub virtual_sol: u64,
    pub virtual_tokens: u64,
    pub curve_tokens_left: u64,
    pub real_sol: u64,
    pub batch_id: u64,
    pub batch_start_slot: u64,
    pub batch_total: u64,
    pub batch_orders: u32,
    pub bump: u8,
}
impl Launch {
    pub const LEN: usize = 32 * 3 + 2 + 8 * 9 + 4 + 1;
}

#[derive(BorshSerialize, BorshDeserialize, Debug, Clone, PartialEq)]
pub struct Batch {
    pub launch: Pubkey,
    pub batch_id: u64,
    pub total_lamports: u64,
    pub tokens_out: u64,
    pub orders: u32,
}
impl Batch {
    pub const LEN: usize = 32 + 8 * 3 + 4;
}

#[derive(BorshSerialize, BorshDeserialize, Debug, Clone, PartialEq)]
pub struct Order {
    pub launch: Pubkey,
    pub batch_id: u64,
    pub buyer: Pubkey,
    pub lamports: u64,
    pub claimed: bool,
}
impl Order {
    pub const LEN: usize = 32 + 8 + 32 + 8 + 1;
}

#[derive(thiserror::Error, Debug, Clone, Copy, PartialEq, Eq)]
pub enum MuseError {
    #[error("fee above 3%")]
    FeeTooHigh = 0,
    #[error("window length must be at least 1 slot")]
    BadWindow,
    #[error("this batch window has closed; settle it first")]
    WindowClosed,
    #[error("this batch window is still open")]
    WindowOpen,
    #[error("order amount is zero or above the per-order cap")]
    BadAmount,
    #[error("wrong fee recipient")]
    WrongFeeRecipient,
    #[error("wrong account")]
    WrongAccount,
    #[error("already claimed")]
    AlreadyClaimed,
    #[error("the curve has sold out")]
    SoldOut,
    #[error("math overflow")]
    Overflow,
}
impl From<MuseError> for ProgramError {
    fn from(e: MuseError) -> Self {
        ProgramError::Custom(e as u32)
    }
}

/// Tokens out for `sol` lamports in, constant product; rounds in the curve's favour.
pub fn curve_buy(virtual_sol: u64, virtual_tokens: u64, sol: u64) -> Option<u64> {
    let k = (virtual_sol as u128).checked_mul(virtual_tokens as u128)?;
    let new_sol = (virtual_sol as u128).checked_add(sol as u128)?;
    let new_tokens = k.checked_add(new_sol - 1)? / new_sol; // ceil
    u64::try_from((virtual_tokens as u128).checked_sub(new_tokens)?).ok()
}

pub fn launch_pda(program_id: &Pubkey, mint: &Pubkey) -> (Pubkey, u8) {
    Pubkey::find_program_address(&[LAUNCH_SEED, mint.as_ref()], program_id)
}
pub fn batch_pda(program_id: &Pubkey, launch: &Pubkey, batch_id: u64) -> (Pubkey, u8) {
    Pubkey::find_program_address(&[BATCH_SEED, launch.as_ref(), &batch_id.to_le_bytes()], program_id)
}
pub fn order_pda(program_id: &Pubkey, launch: &Pubkey, batch_id: u64, buyer: &Pubkey) -> (Pubkey, u8) {
    Pubkey::find_program_address(
        &[ORDER_SEED, launch.as_ref(), &batch_id.to_le_bytes(), buyer.as_ref()],
        program_id,
    )
}

pub fn process_instruction(program_id: &Pubkey, accounts: &[AccountInfo], data: &[u8]) -> ProgramResult {
    let ix = Ix::try_from_slice(data).map_err(|_| ProgramError::InvalidInstructionData)?;
    match ix {
        Ix::CreateLaunch { fee_bps, window_slots, max_lamports_per_order } => {
            create_launch(program_id, accounts, fee_bps, window_slots, max_lamports_per_order)
        }
        Ix::PlaceOrder { lamports } => place_order(program_id, accounts, lamports),
        Ix::SettleBatch => settle_batch(program_id, accounts),
        Ix::Claim { batch_id } => claim(program_id, accounts, batch_id),
    }
}

fn create_pda<'a>(
    payer: &AccountInfo<'a>,
    target: &AccountInfo<'a>,
    system: &AccountInfo<'a>,
    program_id: &Pubkey,
    space: usize,
    seeds: &[&[u8]],
) -> ProgramResult {
    let lamports = Rent::get()?.minimum_balance(space);
    invoke_signed(
        &system_instruction::create_account(payer.key, target.key, lamports, space as u64, program_id),
        &[payer.clone(), target.clone(), system.clone()],
        &[seeds],
    )
}

fn load_launch(program_id: &Pubkey, info: &AccountInfo) -> Result<Launch, ProgramError> {
    if info.owner != program_id {
        return Err(MuseError::WrongAccount.into());
    }
    let launch = Launch::try_from_slice(&info.data.borrow())?;
    let (expected, _) = launch_pda(program_id, &launch.mint);
    if expected != *info.key {
        return Err(MuseError::WrongAccount.into());
    }
    Ok(launch)
}

fn create_launch(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    fee_bps: u16,
    window_slots: u64,
    max_lamports_per_order: u64,
) -> ProgramResult {
    let it = &mut accounts.iter();
    let creator = next_account_info(it)?;
    let mint = next_account_info(it)?;
    let launch_info = next_account_info(it)?;
    let fee_recipient = next_account_info(it)?;
    let system = next_account_info(it)?;
    let token_program = next_account_info(it)?;

    if !creator.is_signer || !mint.is_signer {
        return Err(ProgramError::MissingRequiredSignature);
    }
    if *system.key != system_program::id() || *token_program.key != spl_token::id() {
        return Err(ProgramError::IncorrectProgramId);
    }
    if fee_bps > MAX_FEE_BPS {
        return Err(MuseError::FeeTooHigh.into());
    }
    if window_slots == 0 {
        return Err(MuseError::BadWindow.into());
    }
    if max_lamports_per_order == 0 {
        return Err(MuseError::BadAmount.into());
    }
    let (expected, bump) = launch_pda(program_id, mint.key);
    if expected != *launch_info.key {
        return Err(MuseError::WrongAccount.into());
    }

    // Mint: authority is the launch PDA, so only the curve can ever create tokens.
    let rent = Rent::get()?;
    invoke(
        &system_instruction::create_account(
            creator.key,
            mint.key,
            rent.minimum_balance(spl_token::state::Mint::LEN),
            spl_token::state::Mint::LEN as u64,
            &spl_token::id(),
        ),
        &[creator.clone(), mint.clone(), system.clone()],
    )?;
    invoke(
        &spl_token::instruction::initialize_mint2(&spl_token::id(), mint.key, launch_info.key, None, DECIMALS)?,
        &[mint.clone()],
    )?;

    create_pda(creator, launch_info, system, program_id, Launch::LEN, &[LAUNCH_SEED, mint.key.as_ref(), &[bump]])?;
    let launch = Launch {
        creator: *creator.key,
        mint: *mint.key,
        fee_recipient: *fee_recipient.key,
        fee_bps,
        window_slots,
        max_lamports_per_order,
        virtual_sol: VIRTUAL_SOL_0,
        virtual_tokens: VIRTUAL_TOKENS_0,
        curve_tokens_left: CURVE_TOKENS_0,
        real_sol: 0,
        batch_id: 0,
        batch_start_slot: Clock::get()?.slot,
        batch_total: 0,
        batch_orders: 0,
        bump,
    };
    launch.serialize(&mut &mut launch_info.data.borrow_mut()[..])?;
    msg!("musepad: launch created; creator holds 0 tokens; fee {} bps, fixed", fee_bps);
    Ok(())
}

fn place_order(program_id: &Pubkey, accounts: &[AccountInfo], lamports: u64) -> ProgramResult {
    let it = &mut accounts.iter();
    let buyer = next_account_info(it)?;
    let launch_info = next_account_info(it)?;
    let order_info = next_account_info(it)?;
    let fee_recipient = next_account_info(it)?;
    let system = next_account_info(it)?;

    if !buyer.is_signer {
        return Err(ProgramError::MissingRequiredSignature);
    }
    if *system.key != system_program::id() {
        return Err(ProgramError::IncorrectProgramId);
    }
    let mut launch = load_launch(program_id, launch_info)?;
    if *fee_recipient.key != launch.fee_recipient {
        return Err(MuseError::WrongFeeRecipient.into());
    }
    if launch.curve_tokens_left == 0 {
        return Err(MuseError::SoldOut.into());
    }
    let slot = Clock::get()?.slot;
    if slot >= launch.batch_start_slot.saturating_add(launch.window_slots) {
        return Err(MuseError::WindowClosed.into());
    }
    if lamports == 0 || lamports > launch.max_lamports_per_order {
        return Err(MuseError::BadAmount.into());
    }

    // One order per wallet per window: this account can be created only once.
    let id = launch.batch_id.to_le_bytes();
    let (expected, bump) = order_pda(program_id, launch_info.key, launch.batch_id, buyer.key);
    if expected != *order_info.key {
        return Err(MuseError::WrongAccount.into());
    }
    create_pda(
        buyer,
        order_info,
        system,
        program_id,
        Order::LEN,
        &[ORDER_SEED, launch_info.key.as_ref(), &id, buyer.key.as_ref(), &[bump]],
    )?;

    let fee = ((lamports as u128) * (launch.fee_bps as u128) / 10_000) as u64;
    let net = lamports - fee;
    if fee > 0 {
        invoke(
            &system_instruction::transfer(buyer.key, fee_recipient.key, fee),
            &[buyer.clone(), fee_recipient.clone(), system.clone()],
        )?;
    }
    invoke(
        &system_instruction::transfer(buyer.key, launch_info.key, net),
        &[buyer.clone(), launch_info.clone(), system.clone()],
    )?;

    let order = Order { launch: *launch_info.key, batch_id: launch.batch_id, buyer: *buyer.key, lamports: net, claimed: false };
    order.serialize(&mut &mut order_info.data.borrow_mut()[..])?;
    launch.batch_total = launch.batch_total.checked_add(net).ok_or(MuseError::Overflow)?;
    launch.batch_orders += 1;
    launch.serialize(&mut &mut launch_info.data.borrow_mut()[..])?;
    msg!("musepad: order {} lamports (net) in batch {}", net, launch.batch_id);
    Ok(())
}

fn settle_batch(program_id: &Pubkey, accounts: &[AccountInfo]) -> ProgramResult {
    let it = &mut accounts.iter();
    let payer = next_account_info(it)?;
    let launch_info = next_account_info(it)?;
    let batch_info = next_account_info(it)?;
    let system = next_account_info(it)?;

    if !payer.is_signer {
        return Err(ProgramError::MissingRequiredSignature);
    }
    let mut launch = load_launch(program_id, launch_info)?;
    let slot = Clock::get()?.slot;
    if slot < launch.batch_start_slot.saturating_add(launch.window_slots) {
        return Err(MuseError::WindowOpen.into());
    }

    // The whole window buys from the curve once: one price for everyone in it.
    let total = launch.batch_total;
    let mut tokens_out = curve_buy(launch.virtual_sol, launch.virtual_tokens, total).ok_or(MuseError::Overflow)?;
    if tokens_out > launch.curve_tokens_left {
        tokens_out = launch.curve_tokens_left; // v0: last window gets what is left
    }

    let id = launch.batch_id.to_le_bytes();
    let (expected, bump) = batch_pda(program_id, launch_info.key, launch.batch_id);
    if expected != *batch_info.key {
        return Err(MuseError::WrongAccount.into());
    }
    create_pda(payer, batch_info, system, program_id, Batch::LEN, &[BATCH_SEED, launch_info.key.as_ref(), &id, &[bump]])?;
    let batch = Batch { launch: *launch_info.key, batch_id: launch.batch_id, total_lamports: total, tokens_out, orders: launch.batch_orders };
    batch.serialize(&mut &mut batch_info.data.borrow_mut()[..])?;

    launch.virtual_sol = launch.virtual_sol.checked_add(total).ok_or(MuseError::Overflow)?;
    launch.virtual_tokens -= tokens_out;
    launch.curve_tokens_left -= tokens_out;
    launch.real_sol = launch.real_sol.checked_add(total).ok_or(MuseError::Overflow)?;
    msg!("musepad: settled batch {}: {} lamports -> {} tokens, {} orders", launch.batch_id, total, tokens_out, launch.batch_orders);
    launch.batch_id += 1;
    launch.batch_start_slot = slot;
    launch.batch_total = 0;
    launch.batch_orders = 0;
    launch.serialize(&mut &mut launch_info.data.borrow_mut()[..])?;
    Ok(())
}

fn claim(program_id: &Pubkey, accounts: &[AccountInfo], batch_id: u64) -> ProgramResult {
    let it = &mut accounts.iter();
    let _payer = next_account_info(it)?;
    let launch_info = next_account_info(it)?;
    let batch_info = next_account_info(it)?;
    let order_info = next_account_info(it)?;
    let mint = next_account_info(it)?;
    let dest = next_account_info(it)?;
    let token_program = next_account_info(it)?;

    if *token_program.key != spl_token::id() {
        return Err(ProgramError::IncorrectProgramId);
    }
    let launch = load_launch(program_id, launch_info)?;
    if *mint.key != launch.mint {
        return Err(MuseError::WrongAccount.into());
    }
    if batch_info.owner != program_id || order_info.owner != program_id {
        return Err(MuseError::WrongAccount.into());
    }
    if batch_pda(program_id, launch_info.key, batch_id).0 != *batch_info.key {
        return Err(MuseError::WrongAccount.into());
    }
    let batch = Batch::try_from_slice(&batch_info.data.borrow())?;
    let mut order = Order::try_from_slice(&order_info.data.borrow())?;
    if order.launch != *launch_info.key || order.batch_id != batch_id {
        return Err(MuseError::WrongAccount.into());
    }
    if order_pda(program_id, launch_info.key, batch_id, &order.buyer).0 != *order_info.key {
        return Err(MuseError::WrongAccount.into());
    }
    if order.claimed {
        return Err(MuseError::AlreadyClaimed.into());
    }
    // Tokens go only to a token account the buyer owns, for this mint.
    let dest_state = spl_token::state::Account::unpack(&dest.data.borrow())?;
    if dest_state.owner != order.buyer || dest_state.mint != launch.mint || dest.owner != &spl_token::id() {
        return Err(MuseError::WrongAccount.into());
    }

    // Pro rata: same tokens per lamport for every order in the batch.
    let amount = ((batch.tokens_out as u128) * (order.lamports as u128) / (batch.total_lamports as u128)) as u64;
    order.claimed = true;
    order.serialize(&mut &mut order_info.data.borrow_mut()[..])?;
    invoke_signed(
        &spl_token::instruction::mint_to(&spl_token::id(), mint.key, dest.key, launch_info.key, &[], amount)?,
        &[mint.clone(), dest.clone(), launch_info.clone()],
        &[&[LAUNCH_SEED, launch.mint.as_ref(), &[launch.bump]]],
    )?;
    msg!("musepad: claimed {} tokens for {} lamports in batch {}", amount, order.lamports, batch_id);
    Ok(())
}
