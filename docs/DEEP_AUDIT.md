# Deep site audit — pre-launch / end-of-day checklist

**Scope:** All App Router pages, shared layout, forms, SEO, security headers, content consistency, and operational risks.  
**Date:** March 2026 (internal pass).

---

## Executive summary

The site is **production-capable**: strong visual system, consent-aware analytics, structured data on key templates, Netlify-oriented forms, and a clear service focus (kitchens / wardrobes / media walls).  

**Critical fix applied in this pass:** root `layout.js` previously set `alternates.canonical: "/"`, which in Next.js can **merge into every route** and tell search engines that all URLs are duplicates of the homepage. That was removed; **per-route canonicals** were added for static pages, and `/` canonical is set only on `app/page.js`.

---

## Route-by-route

| Route | Metadata | Notes |
|-------|-----------|--------|
| `/` | `canonical: /` (page-level) | Hero + pillars + process + social proof. Good CTA coverage. |
| `/shop` | `canonical: /shop` | Filters + ProductCard; images from Woo when available. |
| `/product/[slug]` | `generateMetadata` + canonical + OG | Quote panel + JSON-LD Product. |
| `/start` | `canonical: /start` | Configurator; consider linking “recommended product” from wizard more often. |
| `/contact` | `canonical: /contact` | Dynamic `searchParams` for product quote prefill; Netlify form. |
| `/advice` | `canonical: /advice` | Search + category filters. |
| `/advice/[slug]` | `generateMetadata` + Article JSON-LD | Long-form; `editorial-content` typography. |
| `/process` | `canonical: /process` | About + NarrativeBeats + FAQ + testimonials. |
| `/privacy`, `/terms` | canonical set | Legal baseline OK; review with solicitor for your contracts. |

**Missing:** dedicated `app/not-found.js` — users get the default Next.js 404. **Recommendation:** branded 404 with links to `/shop`, `/contact`, `/start`.

---

## SEO

| Item | Status | Recommendation |
|------|--------|----------------|
| `metadataBase` | OK (`layout.js`) | Keep single production domain. |
| Canonicals | Fixed this pass | Audit in Search Console after deploy. |
| `sitemap.xml` | Dynamic | Includes products + posts; static URLs use **build-time** `lastModified`. |
| `robots.txt` | OK | Removed stale `/checkout` disallow (no such route). |
| OG / Twitter | `/og.jpg` in layout | Ensure file stays optimized (~1200×630); consider WebP + `og` alternates later. |
| Title/description | Per-route + layout defaults | Avoid duplicating long-term; homepage can override layout if you want sharper H1-adjacent copy in SERP. |

---

## Structured data

- **LocalBusiness** (layout): Good for maps/voice; `address` is region-only — add full postal address when you have a public showroom (or keep vague if home-based).
- **Product** (product page): Includes offers; keep `numericPrice` in sync with displayed `price` string.
- **Article** (advice slug): OK; images absolute via `absoluteUrl`.
- **FAQPage** (process): **Deduped** — “Which areas” and “Do you work in my area?” were merged into one Q&A to avoid thin duplicate content in JSON-LD.

---

## Performance

- `next/image` + AVIF/WebP: Good.
- **Remote patterns:** Ensure **every** Woo/WP image hostname is listed (`next.config.mjs`). Wildcard `*.wp.com` helps Jetpack/CDN; add plain `yoursite.co.uk` if media is served without subdomain.
- Heavy sections: homepage hero + multiple carousels — monitor **LCP** (hero image `priority` + `sizes` already tuned). Consider **lazy** below-fold Reveal sections if LCP regresses.
- Fonts: Google fonts with `display: swap` — OK.

---

## Security & privacy

- Security headers in `next.config.mjs` + `public/_headers` (Netlify): Good baseline (HSTS, XFO, nosniff, COOP/CORP on Netlify file).
- **Cookie banner:** Accept reloads the page to load GA — expected; document in privacy policy.
- **Contact form:** Honeypot + Netlify; subject/message prefill from product — no PII in URL beyond product title (acceptable); avoid putting emails in query strings.
- **`.env`:** Keys only server-side except `NEXT_PUBLIC_GA_ID` — OK.

---

## Accessibility

- Focus rings on nav links and cookie trap: Good patterns in places.
- **Motion:** Many `framer-motion` effects — respect `prefers-reduced-motion` where not already (hero slider does).
- **Contrast:** Transparent nav on light hero — verify WCAG on all hero slides.
- **Forms:** Labels + `role="alert"` on errors — good.

---

## Content & brand consistency

- **Footer socials:** Instagram `@samskitchenandbedroom` / YouTube `@sams_kitchen_bedrooms` vs brand **“Obi’s”** — **recommend** renaming handles or adding a line (“Also on Instagram as…”) to avoid trust friction.
- **Testimonials:** Named + locations — ensure you hold permission if using real names (UK marketing/ASA context).
- **Opening hours** in JSON-LD (`Mo-Fr 08:00-18:00`) — must match how you actually operate.

---

## Analytics & conversion

- GA4 after consent only — aligned with UK PECR/ePrivacy narrative; privacy policy should mention GA + cookies.
- **Events:** Consider `gtag` events for “Request a quote”, contact submit, `/start` completion (future).

---

## Build / hosting

- **`netlify.toml`:** `publish = ".next"` — confirm this matches **your** Netlify Next plugin setup (some use `.netlify` output). Wrong publish dir = failed deploy.
- **Forms:** `public/__forms.html` defines Netlify field schema — keep field `name`s in sync with `ContactExperience`.

---

## Quick wins (next session)

1. Add **`app/not-found.js`** (branded + main links).
2. **`title.template`** in layout (`%s | Obi's Kitchen & Bedrooms`) to shorten child titles if desired.
3. **Search Console:** Submit sitemap, monitor canonical coverage after canonical fix.
4. **Real photos** replacing hero stock when you have installs (biggest trust uplift).
5. **`/start` → product** deep link: pass `?product=slug` and highlight matching recommendation (optional).

---

## Files touched in the canonical / FAQ / sitemap cleanup

- `app/layout.js` — removed global canonical.
- `app/page.js` — homepage `canonical: '/'`.
- Static routes — `alternates.canonical` for shop, advice, process, contact, privacy, terms, start.
- `app/robots.js` — removed bogus `/checkout` disallow.
- `app/components/FAQSection.js` — merged duplicate area FAQ.
- `app/sitemap.js` — static `lastModified` uses build time.

For a lighter inventory of routes and images, see [`PAGE_AUDIT.md`](./PAGE_AUDIT.md).
