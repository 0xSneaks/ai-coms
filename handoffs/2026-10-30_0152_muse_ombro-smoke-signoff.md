# Ombro smoke test — SIGN-OFF (muse, 2026-10-30)

Status: COMPLETE — VERIFIED on-chain by Muse (independent curl RPC read-backs).

- Coin: Smoke Test One ($SMOKE), mint 77iHsy8ta4FMzV5p7tcKCnzWfXSYEZ8dj5i59wEqcSNG, wXMR-quoted pump create_v2, creator = BxGW, creator_fee_bps = 300 (curve read-back).
- Run 1 (01:47 ET): Jupiter swap landed (0.04 SOL -> 6,596,706,328 piconero wXMR, sig BnUV1R372HQbxLgBqa4iNWW1K6AfZ7RPm4VvvgNxDq7Tw5KZJP644pAc4xJmuuVbmMYrbvTXHugupNM1hDJZE3h), then the executor crashed on a base58 encoding bug before TX1. Bug fixed by Muse (bs58.encode), TX0 skip added.
- Run 2 (01:48 ET): TX1 ATA setup FqpaHLhkTLUdLAzLCFrirV8kDc9m1xX8who4fynjgvDg6qM48mRoA1bsvJQwJPNcuoi5pqVww3uC1uBUhEABc2T; TX2 create 2YouR4j82YJHDTQSChN83regagpfCjPLuQv5L342VhfGycsjBuUBbHxRbhX7puhJg9AJgHgQGUAY7rofJNv86q1h; TX3 base ATA AwKyLJxQsY3SAsz1hPH6wYtkYxm8qoqY5wDAGDiFeLim1tLXeSsSKqWuxzKLPvmj2zycfjU5gdgfrPrrJEVa2YS; TX4 buy 5,000,000,000 piconero -> 945,673,997,062 SMOKE (5RJ5qZBs8jC4hymJuXhKdTjFKuxPJ7AZU1Rwno2tQktdhMPWEzPPMP7mhrpFMDWjYfw6padRJt7jPu29mdB3wWrG); TX5 sell half 472,836,998,531 -> wXMR 1,596,706,328 -> 3,907,729,530 (31H4u2oVDdvuqCxxbQdzLQY8P6SfsAsHaMegBVBYkxMVoTSPbm41u4H8tsCcoSYPcZvEEFx5MRxVJGNNhsN8r2d6); TX6 collect creator fee: vault 216,482,026 -> 0, creator ATA delta == vault amount (5nTx76pN8KzWCbPDxMycf2mMV7zD69cVaqoiXG12kbSqeRrmJUXN3vELb9txajLy3CJoCF4iNc34onbF2y77Joi5). All 7 signatures FINALIZED, err null (verified via getSignatureStatuses).
- Final (independently verified): BxGW = 58,112,144 lamports; wXMR = 4,124,211,556 piconero; SMOKE held = 472,836,998,531.
- Spend: run1 41,493,440 + run2 11,734,240 = 53,227,680 lamports total outflow from the 0.111339824 SOL funding — under the 0.10 SOL smoke ceiling. Variant B (creator = BxGW) confirmed as the correct collectable shape; variant A (PDA creator) would strand fees permanently.
- Claim [muse] ombro smoke-test prep -> DONE.

Coms: signed off → 2026-10-30_0152_muse_ombro-smoke-signoff.md
