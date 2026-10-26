// MUSEINU create_v2 cross-check: build + SIMULATE ONLY (never sends).
// Usage: RPC_URL=https://... node sim.cjs
const { Connection, PublicKey, Keypair, Transaction, ComputeBudgetProgram, LAMPORTS_PER_SOL } = require('@solana/web3.js');
const BN = require('bn.js');
const sdk = require('@pump-fun/pump-sdk');
const RPC = process.env.RPC_URL || 'https://api.mainnet-beta.solana.com';
const USER = new PublicKey('BxGWUPSrnPsDuxnu4bFc9aMF2LyP4ZhD5uDJ9PcWALEE');
const FART = new PublicKey('9BB6NFEcjBCtnNLFko2FqVQBq8HHM13kCyYcdQbgpump');
const ONE_PCT = new BN('10000000000000'); // 10,000,000 tokens * 1e6
const fmt = (bn, dec = 6) => (Number(bn.toString()) / 10 ** dec).toLocaleString('en-US', { maximumFractionDigits: 6 });
(async () => {
  const conn = new Connection(RPC, 'confirmed');
  const online = new sdk.OnlinePumpSdk(conn);
  const [global, feeConfig, qc, qtp] = await Promise.all([online.fetchGlobal(), online.fetchFeeConfig().catch(() => null), online.fetchQuoteControl(), online.fetchQuoteTokenProgram(FART)]);
  const entry = qc && qc.mints.find((m) => m.mint.equals(FART));
  console.log('FARTCOIN token program (on-chain):', qtp.toBase58());
  console.log('QuoteControl FARTCOIN initial_virtual_quote_reserves (base units):', entry ? entry.initialVirtualQuoteReserves.toString() : 'NOT LISTED');
  console.log('Global: holder rewards enabled', global.isHolderRewardEnabled, '| creator fee configurable', global.creatorFeeConfigurable, '| max creator bps', String(global.maxConfigurableCreatorFeeBps), '| initial_virtual_token_reserves', global.initialVirtualTokenReserves.toString(), '| token_total_supply', global.tokenTotalSupply.toString());
  const mint = Keypair.generate();
  const ix = await sdk.PUMP_SDK.createV2Instruction({ mint: mint.publicKey, name: 'MuseInu', symbol: 'MUSEINU', uri: 'https://musepad-phantomcapais-projects.vercel.app/metadata.json', creator: USER, user: USER, mayhemMode: false, quoteMint: FART, quoteTokenProgram: qtp, creatorFeeBps: new BN(30), holderReward: true });
  const tx = new Transaction().add(ComputeBudgetProgram.setComputeUnitLimit({ units: 400000 }), ix);
  tx.feePayer = USER; tx.recentBlockhash = (await conn.getLatestBlockhash()).blockhash;
  console.log('\nOrdered accounts:'); ix.keys.forEach((k, i) => console.log(`  ${String(i).padStart(2)} ${k.pubkey.toBase58()} ${k.isSigner ? 'signer' : ''}${k.isWritable ? ' writable' : ''}`));
  const writable = ix.keys.filter((k) => k.isWritable).map((k) => k.pubkey);
  const before = await conn.getMultipleAccountsInfo(writable);
  const resp = await conn._rpcRequest('simulateTransaction', [tx.serialize({ requireAllSignatures: false, verifySignatures: false }).toString('base64'), { encoding: 'base64', sigVerify: false, replaceRecentBlockhash: true, commitment: 'confirmed', accounts: { encoding: 'base64', addresses: writable.map((p) => p.toBase58()) } }]);
  const v = resp.result ? resp.result.value : null;
  if (!v) { console.log('RPC error:', JSON.stringify(resp.error)); return; }
  console.log('\nSimulation err:', JSON.stringify(v.err), '| CU used:', v.unitsConsumed);
  (v.logs || []).slice(-12).forEach((l) => console.log('  log:', l));
  let rent = 0;
  (v.accounts || []).forEach((a, i) => { const was = before[i] ? before[i].lamports : 0; if (a && a.lamports > was && !writable[i].equals(USER)) { rent += a.lamports - was; console.log(`  new/funded ${writable[i].toBase58()} +${a.lamports - was} lamports (${a.data ? Buffer.from(a.data[0], 'base64').length : '?'} bytes)`); } });
  const sigFee = 2 * 5000;
  console.log(`Rent created: ${rent} lamports | base fee (2 sigs): ${sigFee} | total ≈ ${((rent + sigFee) / LAMPORTS_PER_SOL).toFixed(9)} SOL (+ any priority fee)`);
  if (!entry) return;
  const curve = sdk.newBondingCurve(global, FART, qc, new BN(30), true);
  const startPrice = Number(curve.virtualQuoteReserves.toString()) / Number(curve.virtualTokenReserves.toString());
  console.log(`\nStarting price: ${startPrice.toExponential(6)} FARTCOIN per MUSEINU (vq ${fmt(curve.virtualQuoteReserves)} / vt ${fmt(curve.virtualTokenReserves)})`);
  const cost = sdk.getBuySolAmountFromTokenAmount({ global, feeConfig, mintSupply: null, bondingCurve: null, amount: ONE_PCT, quoteMint: FART, quoteControl: qc, creatorFeeBps: new BN(30) });
  console.log(`First buy, exactly 10,000,000 MUSEINU (1%), fees included: ${fmt(cost)} FARTCOIN`);
  let usd = null;
  try { const j = await (await fetch(`https://lite-api.jup.ag/price/v3?ids=${FART.toBase58()}`)).json(); usd = j[FART.toBase58()] && j[FART.toBase58()].usdPrice; } catch {}
  console.log(usd ? `FARTCOIN ≈ $${usd} (Jupiter price API, ${new Date().toISOString()}) → 1% buy ≈ $${(Number(cost.toString()) / 1e6 * usd).toFixed(2)}` : 'FARTCOIN USD price: unavailable');
})().catch((e) => { console.error('FAILED:', e.message); process.exit(1); });
