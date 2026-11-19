# 7OH Hub — Public Exposure and WordPress Security Audit

Owner-supplied target: https://7ohhub.com. Scope: non-destructive, anonymous, public-facing inspection only. No login guessing, requests intended to change site state, purchases, customer data collection, exploits, DoS, or secret extraction.

## Verified as of 2026-11-19 (America/New_York)
- Public WordPress users endpoint https://7ohhub.com/wp-json/wp/v2/users?per_page=100 exposed six author IDs / public slugs / display names without authentication:
  - 1 star_admin — display 7OH Hub
  - 170 7ohhub
  - 1657 alan
  - 657 brandoniwolfson
  - 155 stardustkratom — display Drew Wolfson
  - 197 hubarek (additional)
- Source: direct WordPress JSON pages fetched through public indexable-page reader. These are public author slugs, **not proven login usernames**. No public `roles` field; ID 1 is **not proof** of administrator role.
- Directory indexing at https://7ohhub.com/wp-content/uploads/ independently returned publicly visible filenames/timestamps and subdirectory links. Sensitive-risk candidates included shippo-bridge-debug.log (484 KB), xstore-tmp-data.xml (245 KB), TaxJar CSV, invoice and shipping folder names.
- Retrieval of .log bytes was blocked by content-type constraints; no claim of having read it or confirmed secrets, wallet material, or customer records.
- Some public lab report PDFs found; presence alone is not a security breach.

## Assessment
- VERIFIED: unauthenticated author enumeration and upload directory listing.
- INFERENCE: author discovery could reduce attacker reconnaissance effort; publicly accessible debug/temporary file names warrant immediate private inspection.
- UNKNOWN: admin privilege, true login names, credentials, wallet leakage, customer PII, exploitability of plugins, backend access, status after remediation.

## Recommendations
1. Disable uploads directory listings via webserver configuration (Apache Options -Indexes or nginx autoindex off) and protect non-public logs/exports with filesystem/webserver access controls. Directory index fix alone does not revoke direct file access.
2. Remove / relocate debug logs, CSV exports, temporary XML and invoices outside the web root; inspect private copies first; rotate affected keys only if actually exposed.
3. Evaluate whether public author lists are required; limit unauthenticated /wp/v2/users, single-user endpoints, and equivalent author enumeration without breaking required REST functionality. WordPress user slug != guaranteed login username.
4. Require MFA for privileged users, least privilege, rate limits, and review login audit logs. Do not change public author slugs as substitute for proper access controls.
5. Complete authenticated configuration, WordPress core/plugin version, HTTP response, authorization, and file-content review under separate authorization and controlled test window.

## Handoff
- Initial project: no earlier handoff.
- Next: site owner or authorized maintainer to secure direct file access, export sanitized debug logs for review, validate mitigations, and run an authenticated controlled assessment.

## Proposed authorization addendum — Credential & Authentication Resilience Testing (PENDING DOCUMENT INSERTION)

**Status: INTENT ONLY.** On 2026-11-19, owner requested explicit password attack / brute-force engagement language in a Google Drive document at ID `1RkYFcbV3iMn2HHydil1vc_eByMW5JBn9`. The connected account returned 404, so no document contents were verified and no Drive document was modified. This addendum is **not** itself authorization to run attacks.

**Proposed wording**:

> **Credential and Authentication Security Testing — Explicit Authorization.** Subject to the Rules of Engagement below and written approval of an execution schedule, the Client authorizes the named Assessor to perform controlled password-security testing on the expressly listed Client-owned authentication endpoints of **7ohhub.com**. Authorized techniques include username/author enumeration; password-strength and password-guessing simulations; limited online brute-force attempts; limited password spraying; and controlled simulations of credential stuffing using *synthetic, Client-provided credential pairs only*. Testing may assess password policies, account enumeration resistance, rate limiting, lockouts, CAPTCHA, multifactor-authentication enforcement, and alerts. This authorization does not extend to third-party services or systems, or production customer accounts, absent separate explicit written permission.
>
> **Rules of Engagement.** Before any active attempts, both parties must record the Assessor's identity and source IP(s), exact target hostnames/URLs, dedicated test account IDs, contact/emergency stop method, and start/end date and timezone. Default limits unless separately agreed in writing: at most **five dedicated test accounts**, **ten login attempts per account per 24 hours**, and **one authentication request per second site-wide**, with no distributed traffic, automated scaling or lockout testing against real customers. Stop immediately upon unexpected lockout of a non-test user, increase in 5xx errors, checkout disruptions, abuse alerts, data exposure, or Client revocation. No password resets, account takeover, unauthorized persistence, production data changes, DoS, real-world credential stuffing with leaked credentials, or exfiltration. Store test evidence securely, redact secrets and customer data, and provide a confidential report containing test conditions, proof, impact and remediation.
>
> **Authorization Gate.** Execution is NOT authorized merely by inclusion of this clause in a draft. Testing begins only after the Client and Assessor both approve the Rules of Engagement and confirm that they have authority over all in-scope infrastructure and any hosting-provider restrictions.

**Before adopting in actual terms:** ensure contract signers are accurate, substitute exact tester organization/person, confirm 7ohhub.com ownership, validate acceptable request caps with hosting provider, and have a qualified legal reviewer assess indemnity and jurisdiction-specific compliance. No login attempts performed by ChatGPT.

## 2026-11-19 03:25 ET — Authorization package and evidence ZIP

- INTENT / DOCUMENTATION: Created 7OHHub_Security_Engagement_2026-11-19.zip as a confidential conversation artifact, **not uploaded to public GitHub**.
- Files: 01_Authorization_Letter.docx/.pdf, 02_Rules_of_Engagement.docx/.pdf, 03_Findings_Report.docx/.pdf, CSV register of 6 observations, JSON manifest, preflight, README, SHA256SUMS.
- Date prepared: 2026-11-19. Owner listed Tom Harrington (user-provided); assessor listed 0xDev (alias only). Proposed window Nov 20, 2026 10:00–14:00 EST, not approved. Contacts, source IP, signatures, legal entity if relevant, dedicated test accounts and Bluehost clearance missing. Execution gate **CLOSED**.
- RoE permits restricted brute-force/password-spray and **synthetic-credential** simulations against dedicated test accounts **only after executed approvals** (max 5 accounts, max 10 attempts/account/24h, 1 auth request/sec site-wide). No production admin/user testing, data extraction, DoS or social engineering.
- 6 evidence register entries are based on prior read-only findings. No verified wallet/customer data or secrets leaks; listed file bodies NOT reviewed. No active attack performed.
- VERIFIED offline deliverable: all 3 DOCX→PDF render (2 pages each) and inspected; ZIP contains 11 files, CRC passes; package SHA256 70cef89dc73515767b0513e0a475e5ac3c955a50c00e99b9262020e9a3438bd1.
- Bluehost policy reference: https://www.bluehost.com/terms/acceptable-use-policy (unauthorized probing/authentication attacks prohibited). Hosting-provider approval/policy compatibility is not yet confirmed.

## 2026-11-19 03:38 ET - User-supplied document revision

- STAGE: DOCUMENTS PREPARED / ACTIVE ASSESSMENT PENDING SIGNATURES.
- VERIFIED: revised private ZIP contains unsigned Authorization PDF, RoE PDF, preliminary findings PDF, README, editing notes and SHA256SUMS (six files); PDFs two pages each, visually inspected; ZIP CRC passes. SHA256: 4e74b1b310d8faf09e6ada35923fe36b654c75875efa83281d87bf73b6a2c0de.
- Targeted corrections: Rule 3 restored; contradictory leaked-material statement corrected to no leakage verified in summarized evidence; actual signature dates blank; cleanup bounded to signed scope.
- INTENT: Nov 20 10:00-14:00 EST remains proposed, not approved; signatures, contacts, source IP, dedicated accounts/endpoints and host clearance still needed.
- UNKNOWN: present site state and sensitive contents; prior observations preserved without claiming fresh verification. No site testing or production changes.
- Claim released. Handoff: [2026-11-19_0338_codex_7ohhub-document-revision.md](../handoffs/2026-11-19_0338_codex_7ohhub-document-revision.md).
