# Site pages — inventory & notes

Last reviewed: internal audit (routes, imagery, content alignment).

## Routes (`app/`)

| Path | Purpose | Imagery / notes |
|------|---------|-----------------|
| `/` | Home: hero slider, pillars, featured products, process sticky, before/after, testimonials | Hero + pillars use `lib/brand-images` (`hero-stock/`). Process uses `process-scenes/` (distinct from hero). |
| `/shop` | Product grid + filters | Images from WooCommerce + `productVisuals` in `lib/wordpress.js` → `brand-images`. |
| `/product/[slug]` | Product detail, story sequence | Same image pipeline; JSON-LD + OG use `absoluteUrl()` in `lib/site.js`. |
| `/start` | Quote / configurator | No large photography (UI-led). |
| `/contact` | Contact form | Text-led; no mismatched stock. |
| `/advice` | Advice index | Post cards use featured image or **category fallback** via `adviceImageForCategory()`. |
| `/advice/[slug]` | Article | Hero + list cards; WP posts without featured image get category fallback. OG/JSON-LD use absolute image URLs. |
| `/process` | About + **Services at a Glance** (`NarrativeBeats`) + FAQ | Hero/grid use `brand-images`; aligns with kitchens / wardrobes / media walls. |
| `/privacy`, `/terms` | Legal | Text-only. |
| `/robots.txt`, `/sitemap.xml` | SEO | — |

## Shared libraries

- **`lib/brand-images.js`** — Single source for kitchen / wardrobe / media hero paths and advice fallbacks by category.
- **`lib/site.js`** — `absoluteUrl()` for schema and Open Graph when using root-relative paths.
- **`lib/wordpress.js`** — WooCommerce + WP posts. **Product images:** WooCommerce REST `images[]` (featured + gallery) **override** slug-based `productVisuals` whenever the API returns URLs; defaults apply only when a product has no images or when using offline `fallbackProducts`.

## Follow-ups (optional)

- Replace `populate-wp-headless.js` image lists with `brand-images` paths when running headless WP seed scripts.
- Add real project photography for hero and advice when available; keep stock for abstract “process” steps only.
