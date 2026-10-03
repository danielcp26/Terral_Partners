# Launch checklist

## Missing business inputs

- [x] Install supplied logo option 04 in the header and footer; hide comparison label and excess whitespace while preserving the original artwork.
- [ ] Obtain a native vector logo when available and prepare approved favicon assets.
- [ ] Confirm the legal business identity, contact channel and jointly approved business wording. Add real contact links only after verification.
- [ ] Confirm ownership of the production domain and set `NEXT_PUBLIC_SITE_URL`. No domain has been assumed.

## Inquiry delivery — blocks launch

- [ ] Choose and configure a real, access-controlled receiving service with HTTPS and server-only credentials.
- [ ] Verify durable storage/queuing before acknowledgement, idempotency-key deduplication, receipt format, and who actually monitors incoming inquiries.
- [ ] Complete an end-to-end buyer and supplier submission with the real receiver and confirm receipt. Current integration tests use fixtures only.
- [ ] Set trusted proxy behavior and shared edge rate limiting; assess whether additional spam protection is needed.
- [ ] Confirm recipient access, retention, deletion, hosting logs and any international processing arrangements.

## Legal and content — blocks launch

- [ ] Complete and review Spanish and English privacy and terms drafts with a qualified reviewer. Supply controller/contact details, purposes, processors, retention, rights procedure and applicable terms. Replace pending-information language and draft notice.
- [ ] Confirm the consent wording and update `privacyVersion` in the submission handler.
- [ ] Only then set `LEGAL_APPROVED=true`. Rebuild after public-origin or legal-indexing configuration changes.
- [ ] Review illustrative stock imagery and replace it if approved business-owned imagery becomes available. Do not represent it as completed work.

## Release

- [ ] Run build, typecheck, lint and Playwright checks. Review mobile/tablet/desktop and assistive-technology behavior.
- [ ] Verify canonical URLs, alternate language URLs, generated social previews, sitemap and robots after setting the real origin. Until configured/approved, search indexing is disabled; local builds may warn that social images use localhost.
- [ ] Resolve or reassess development-tool dependency advisories. At implementation, production audit was clean; full audit flagged the ESLint dependency chain through `braces` (no compatible published fix). Do not downgrade the application to silence this development-only advisory.
- [ ] Obtain explicit approval before deploying publicly.

## Deliberately deferred

Bklit charts until verified useful data exists. Authentication, payments, admin dashboards, CRM, file uploads, analytics and cookie tracking are outside this scope.
