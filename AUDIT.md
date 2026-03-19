## Deep audit (local project)

Date: 2026-03-17  
Project: Next.js App Router site for `obiskitchenbedrooms.co.uk`

### Executive summary

- **High risk**: WooCommerce API credentials exist in `.env.local`. They are used server-side (good), but should be treated as compromised if this folder was ever shared/synced. Rotate keys and restrict permissions.
- **Privacy/measurement**: Analytics must not load before consent. This has been fixed in the repo (GA script only loads after opt-in).
- **Indexing hygiene**: “utility” pages like `/checkout` should not be indexed nor appear in sitemap. This has been fixed in the repo.

### What I changed (already implemented)

- **Secrets hygiene**
  - Added `.gitignore` to exclude `.env*`, `.next`, `node_modules`.
  - Added `.env.example` as a safe template.
- **Consent-gated analytics**
  - `app/layout.js` only includes GA scripts when `obi_cookie_consent=accepted`.
  - `app/components/CookieBanner.js` now sets a stricter cookie and reloads on accept.
- **SEO indexing controls**
  - `/checkout` now exports working `metadata.robots` via a server wrapper (`app/checkout/page.js`).
  - Removed `/checkout` from `app/sitemap.js`.
  - Added `Disallow: /checkout` in `app/robots.js`.
- **Performance**
  - Moved `puppeteer` + `dotenv` to `devDependencies` (they’re only used by `populate-wp-headless.js`).
  - Pauses Lenis RAF loop when the tab is hidden (`app/components/ExperienceProvider.js`).
- **Project docs**
  - Added `README.md` (setup, env, content sources).

### Findings & recommendations (prioritized)

#### P0 — Security

- **Rotate WooCommerce keys**
  - **Why**: Any local leakage (backup, shared zip, screen share) compromises store API access.
  - **Action**: Rotate `WC_CONSUMER_KEY` / `WC_CONSUMER_SECRET` in WooCommerce; restrict to read-only if possible; limit IPs if supported.
- **Keep secrets server-only**
  - **Status**: Keys are read from `process.env.*` in `lib/wordpress.js` (server execution). Keep it that way.
  - **Guardrail**: Never prefix secrets with `NEXT_PUBLIC_`.

#### P0 — SEO / crawling

- **Don’t index checkout**
  - **Status**: `noindex/nofollow` metadata + robots disallow + sitemap removal is in place.
- **Canonical coverage**
  - **Status**: Canonicals exist for product/post detail pages. Root layout now sets a canonical for `/`.
  - **Next**: Consider setting `alternates.canonical` for additional static pages if you see duplicates in Search Console.

#### P1 — Analytics / consent

- **GA consent mode correctness**
  - **Status**: GA is loaded only after opt-in.
  - **Next**: If you add Google Ads / conversion tags later, keep them behind the same consent gate and expand consent fields.

#### P1 — Accessibility

- **Dialogs / overlays**
  - **Status**: `CartDrawer` already uses `role="dialog"`, `aria-modal`, focus management and a simple focus trap.
  - **Cookie banner**: Now marked `aria-modal` and locks page scroll.
  - **Next**: Add focus management/trap to cookie banner if you want it to behave like a true modal; otherwise consider removing `aria-modal` and treat it as a non-modal “banner” pattern.
- **Navigation**
  - `MobileNav` supports Escape to close and has `aria-expanded`; consider adding `aria-controls` pointing to the menu container id for richer AT support.

#### P2 — Performance

- **Visual/animation budget**
  - Smooth scrolling + cinematic layers can be expensive on low-end devices.
  - **Status**: Reduced-motion is respected; RAF pauses when tab hidden.
  - **Next**: Consider gating heavy client visuals behind `prefers-reduced-motion` and/or a device heuristic (e.g., low memory / save-data), and ensure large background images are optimized.

#### P2 — Infra / ops

- **Hosting signals**
  - There’s Netlify-style form handling (`public/__forms.html` and `ContactExperience` POST).
  - **Next**: Add a `netlify.toml` only if you’re actually deploying on Netlify (otherwise leave it out). Document deployment in README once confirmed.

### Follow-up checklist (actionable)

- **Rotate WooCommerce keys** and confirm the old ones are revoked.
- **Add Search Console + sitemap submission** and verify `/checkout` does not appear in indexed pages.
- **Run Lighthouse on production** and capture Core Web Vitals before/after animation gating changes.

