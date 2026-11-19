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
