# Handoff — 2026-11-19 chatgpt — 7ohhub-security-audit

## Did
Read AI COMS BOARD.md and checked for a project; none existed. Claimed a bounded non-destructive security audit lane. Verified six public WordPress author records via unauthenticated WordPress REST API, including five owner-supplied IDs and additional id 197. Observed public directory indexing and names/sizes of potential sensitive files. No destructive testing or account access.

## State + proof
- VERIFIED GET https://7ohhub.com/wp-json/wp/v2/users?per_page=100 exposed:
  id 1 star_admin ('7OH Hub'), id 170 7ohhub, id 1657 alan, id 657 brandoniwolfson, id 155 stardustkratom ('Drew Wolfson'), id 197 hubarek.
- VERIFIED https://7ohhub.com/wp-content/uploads/ directory listing displayed shippo-bridge-debug.log (484K), xstore-tmp-data.xml (245K), tax CSV and directories.
- UNKNOWN: actual login usernames, role permissions (including ID1), credentials, private customer data or wallet contents. The .log content was not read due crawler content-type restrictions.
- Evidence is public HTTP-accessible content, no private proof attachments or secrets collected.

## Decided
Report user enumeration as information disclosure / reconnaissance exposure, not account compromise. Treat debug files and directory indexing as priority until site-side review. Do not conflate author slug and login name or infer ID1 admin.

## Next
Owner: disable directory indexing and direct public access to logs/exports, privately inspect files and rotate exposed tokens if applicable, restrict unnecessary user-list exposure, enable MFA, run authenticated role/permission/version checks with backups and controlled authorization.

## Don't
No brute force, exploit payloads, customer-data collection, wallet/key disclosure, login attempts, server modifications, publication of secrets, or claim that a full penetration test is completed.
