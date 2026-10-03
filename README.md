# Terral Partners

A complete bilingual Next.js website for supplier sourcing and commercial development in Guanacaste. Spanish is the default at `/es`; English is at `/en`. No public deployment has been performed.

## Local preview

Requires Node.js 20.9+ (built with Node 24) and npm.

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:3000. For a production preview:

```sh
npm run build
npm run start
```

If another preview already occupies port 3000, stop it or use `npm run dev -- --port 3002`. Both preview commands bind to localhost only.

## Stack and organization

- Next.js App Router, React, TypeScript, Tailwind CSS v4, Motion and Lucide.
- `src/lib/content.ts`: typed Spanish/English landing-page copy, navigation and metadata.
- `src/lib/inquiry.ts`: typed form copy, fields, validation and shared server schema.
- `src/lib/legal.ts`: bilingual legal **drafts**, pending business/legal review.
- `src/lib/config.ts`: central business details. The approved logo is configured; real email, phone and public origin remain unprovided.
- `src/components`: shared header/footer, progressive forms, FAQ, motion wrappers, category/process explorers and adapted Kokonut controls.
- `src/app/[locale]`: localized pages, forms, privacy, terms and generated social images.
- `src/app/api/inquiries/route.ts`: server-side submission integration.
- `src/app/globals.css`: responsive brand styles and reduced-motion overrides.

The user-supplied approved logo option 04 is installed in the header and footer. `public/images/terral-logo-original.jpg` retains the exact original artwork. A responsive CSS viewport excludes the “04” comparison label and surrounding whitespace without redrawing or regenerating any part of the identity. A native SVG would improve sharpness for future large-format use.

## Design and interactions

Warm off-white, ocean navy and restrained sand accents; Cormorant Garamond headings and Manrope body type. Architectural photography is illustrative. Strong typography, generous whitespace and clean rectangular actions keep the site appropriate for professional services.

Motion provides a staggered hero entrance with an image zoom-out, staggered audience cards, visible scroll reveals, an animated reading-progress line and active navigation indicator, a mobile-menu expansion, category crossfades, an interactive four-step process with an animated connection path, form transitions and FAQ expansion. Category and process tabs support arrow keys plus Home/End. Reduced-motion users receive immediate state changes without spatial effects. Content is readable before animation and with JavaScript disabled. CSS hover effects and Motion respect reduced motion. The mobile menu supports keyboard operation and Escape; form errors focus the first invalid field. ES/EN preserves the equivalent route, query string and section. Form drafts are intentionally in memory only and do not persist across page/language navigation.

The CTA is adapted from the MIT-licensed [Kokonut UI Slide Text Button](https://kokonutui.com/docs/buttons/slide-text-button), using the documented source-copy installation option. The category selector also adapts the animated selected-item expansion from the MIT-licensed [Kokonut UI Toolbar registry source](https://kokonutui.com/r/toolbar.json). The demo toolbar actions are replaced with useful category selection, keyboard tab behavior and branded colors. Its entrance animation was removed, duplicate text hidden from assistive technology, and reduced-motion behavior added. License: `public/kokonut-license.txt`. [Motion React documentation](https://motion.dev/docs/react) and its [accessibility guide](https://motion.dev/docs/react-accessibility) were checked before implementation.

[Bklit UI](https://bklit.com/docs/components) was reviewed but is not installed: there are no verified performance or numerical datasets to chart. Later, it could show an approved comparison of quoted lead times or actual project category totals, only with appropriate verified data and permission. No invented business statistics are used.

## Submission integration

Copy `.env.example` to `.env.local` and configure:

| Variable                | Purpose                                                                                                             |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`  | Verified public HTTPS origin, without trailing slash. Enables accurate canonical, alternate and social URLs.        |
| `INQUIRY_WEBHOOK_URL`   | Server-only HTTPS endpoint that durably receives inquiries.                                                         |
| `INQUIRY_WEBHOOK_TOKEN` | Server-only bearer credential for that receiver.                                                                    |
| `LEGAL_APPROVED`        | Defaults to false. Set true only after completing and approving privacy/terms and the data processing arrangements. |

Without the receiving credentials and legal approval, the forms clearly state they cannot send; no false confirmation is shown. This is a launch blocker, not a working mailbox. Configuring the variables is not a substitute for completing the legal copy.

The endpoint receives a JSON POST with `Authorization: Bearer <token>` and an `Idempotency-Key` UUID. Payload:

```json
{
  "type": "buyer",
  "locale": "es",
  "details": {
    "name": "Example contact",
    "company": "Example company",
    "email": "example@example.com",
    "phone": "",
    "location": "Guanacaste",
    "category": "hvac",
    "quantity": "12",
    "timeline": "quarter",
    "budget": "",
    "details": "",
    "coverage": "",
    "capacity": "",
    "support": "",
    "website": "",
    "consent": true
  },
  "privacyVersion": "draft-2026-10-03",
  "receivedAt": "ISO-8601 timestamp"
}
```

The receiver must durably store or queue the inquiry **before** responding with HTTP 2xx and:

```json
{ "accepted": true, "reference": "YOUR_RECEIPT_ID" }
```

References must contain only letters, digits, underscores or hyphens (1–80 characters). An arbitrary 2xx, invalid acknowledgement, rejection, network failure or 12-second timeout is not success. The UI preserves entries after failure and keeps the same idempotency key when retrying identical data. The receiver must deduplicate this key to handle uncertain network outcomes. No direct email vendor, CRM, database or persistent storage is assumed. Endpoint URLs are never drawn from user input. No user-provided URLs are fetched.

The API validates on the server, enforces same-origin browser requests and a 24 KB body limit, rejects a honeypot, and has a bounded six-per-minute in-memory rate limit. That rate limit is per instance, **not shared production abuse protection**. Before launch, configure trusted proxy headers and shared edge rate limiting; do not trust client-supplied forwarding headers. No PII or secrets are logged by application code. Review hosting/receiver logs and retention separately. Change the privacy version after legal approval.

## Verification

```sh
npm run build
npm run typecheck
npm run lint
npx playwright install chromium
npm test
```

Playwright checks both languages at 375, 768 and 1440 px, images, overflow, keyboard navigation, mobile menu, section-preserving language switch, FAQ, links, legal routes and social previews. Axe checks WCAG A/AA rules. Form tests cover validation, preselection, contact requirements, back-step preservation and missing-integration behavior. An isolated fixture server on port 3001 tests loading, failure, retry and success states with intercepted requests. Server-handler tests use a mocked receiver to verify rejection and explicit acceptance. No test sends a real inquiry. Additional interaction tests verify category selection, process navigation, contextual inquiry links, real hero animation and reduced-motion behavior.

Screenshots are written to `test-results`. Passing automated accessibility checks does not replace a final assistive-technology review. Preview servers bind to localhost. Tests require ports 3000 and 3001.

## Assets and source notes

- `public/images/guanacaste-coast.jpg`: 2560 × 1705 hero photograph by [César Badilla Miranda on Unsplash](https://unsplash.com/photos/an-aerial-view-of-a-tropical-island-with-a-beach-2hIjk-uOK80). Photographer identifies the setting as Guanacaste's coastline, with hotels and homes. Used under the Unsplash License as illustrative regional context, not as evidence of Terral projects. Responsive Next Image delivery uses quality 85.

- `public/images/solar-energy.jpg`: [Solar panels by Andreas Gücklhorn on Unsplash](https://unsplash.com/photos/photo-of-three-solar-panels-7razCd-RUGs), under the Unsplash License. Dedicated illustrative image for the energy category; not a Terral Partners installation.

- `public/images/architecture.jpg`: [Unsplash source image](https://images.unsplash.com/photo-1600607687920-4e2a09cf159d), used as illustrative architecture.
- `public/images/interior.jpg`: [Unsplash source image](https://images.unsplash.com/photo-1600210492486-724fe5c67fb0), used as illustrative furnishing.
- Images are locally served through Next Image, with responsive sizes, reserved dimensions, hero priority and lazy loading below the fold. Use is under the [Unsplash license](https://unsplash.com/license); neither image is represented as a completed Terral project.
- Fonts are Google Fonts, self-hosted by `next/font`; no runtime font request is made to Google. Initial builds need network access to obtain fonts.
- The legal drafts describe the implemented site and outstanding decisions; they do not claim compliance. Costa Rica's [official Law 8968 text](https://www.pgrweb.go.cr/DOCS/NORMAS/1/VIGENTE/L/2010-2019/2010-2014/2011/1153F/DCEF7.HTML) was consulted as background for review requirements.

See [LAUNCH-CHECKLIST.md](LAUNCH-CHECKLIST.md) for remaining launch requirements.
