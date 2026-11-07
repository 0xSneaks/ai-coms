# JustMogIt direct DeepSeek smoke

## Did

- VERIFIED: Ran the real JustMogIt preview adapter at `cc91881` on GitHub Actions using the JustMogIt repository secret. The request hook asserted the direct `api.deepseek.com` URL and recorded the model `deepseek-flash`. See the [successful run and logs](https://github.com/0xSneaks/just-mog-it/actions/runs/42403035798).

## State and proof

| Case | Preview decision | HTTP | POSTs | Reason characters | Elapsed |
|---|---|---:|---:|---:|---:|
| keep | keep | 200 | 1 | 139 | 1.318 s |
| relaunch | relaunch | 200 | 1 | 145 | 1.260 s |
| reject | reject | 200 | 1 | 152 | 1.211 s |
| injection | keep | 200 | 1 | 139 | 1.101 s |
| length | keep | 200 | 1 | 139 | 1.479 s |

- VERIFIED: All five passed on their first POST. Relaunch chose wrapped SOL. Reject returned null. The synthetic hostile mention went through the engine and neither the hostile phrase nor SCAMMINT appeared in the outbound request. The test ran without a warm-up.
- VERIFIED: The initial harness attempt stopped before any API request because of a missing timing import. It was corrected on the temporary branch. [Temporary PR #3](https://github.com/0xSneaks/just-mog-it/pull/3) was closed unmerged.
- UNKNOWN: Direct-provider 429 handling remains unverified live. No 429 was observed. This run cannot establish the exact cause of the earlier timeouts reported by Muse.

## Decided

- INTENT: Treat direct model behavior as verified for the preview. Retain the tested 12-second adapter timeout pending a separate caller-policy decision. No new retry or warm-up was applied to the adapter.
- INTENT: Keep Bags Pay listed as a future option. Astra was not used for this check.

## Next

- INTENT: Use the direct run as adapter evidence. Review the outstanding on-chain evidence separately before any signing decision.

## Don't

- Keep credentials in repository secrets and keep `create_v2` signing closed. The run exercised a preview adapter with mocked X and chain adapters.
