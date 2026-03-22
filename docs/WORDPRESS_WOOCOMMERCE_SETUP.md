# WordPress + WooCommerce for this Next.js site

## Is “only WooCommerce” okay?

**Yes, for products.** WooCommerce is the plugin you need for the **shop** (`/shop`, `/product/...`).

Your **Advice** pages (`/advice`, `/advice/[slug]`) use **WordPress Posts** via the **core REST API** (`/wp-json/wp/v2/posts`). That is **built into WordPress** — you do **not** need another plugin for posts. Just create **Posts** in WP Admin.

Optional later (not required for this site to work):

- **Security** (e.g. limit login attempts) — good practice on any WP host  
- **Backup** plugin  
- **WP Offload Media** or similar — only if you want media on S3/CDN  

You do **not** need a page builder for the Next.js front end; WordPress is mainly **CMS + product catalogue + REST API**.

---

## What the Next.js app calls

| Source | Endpoint | Auth |
|--------|-----------|------|
| Products | `GET {WORDPRESS_URL}/wp-json/wc/v3/products` | WooCommerce **REST API keys** (HTTP Basic) |
| Advice posts | `GET {WORDPRESS_URL}/wp-json/wp/v2/posts?_embed=1` | **Public** (no key in code) — WP must allow REST read access |

Env vars (see `.env.example`):

- `WORDPRESS_URL` — e.g. `https://content.obiskitchenbedrooms.co.uk` (no trailing slash)
- `WC_CONSUMER_KEY` — `ck_...`
- `WC_CONSUMER_SECRET` — `cs_...`

If `WORDPRESS_URL` or Woo keys are missing, the site uses **mock products**. If posts fail, it uses **mock advice**.

**Note:** The code currently requests **up to 8 products** (`per_page=8`). To show more, change `per_page` in `lib/wordpress.js` → `fetchWooProducts`.

---

## 1. Base WordPress setup

1. Install WordPress on your host (PHP, MySQL/MariaDB, HTTPS).
2. **Settings → General**  
   - **Site title / tagline** — Only used inside WordPress (emails, admin, some themes). Your public site is Next.js, so this can be something like “Obi CMS” if you like.  
   - **WordPress Address (URL)** and **Site Address (URL)** — These should normally be **the same** full URL where WordPress actually lives, including `https://` and **no** trailing slash, e.g. `https://content.yourdomain.co.uk`.  
     - **Why it matters:** WooCommerce builds **product permalinks** and **image URLs** from this. If either field is wrong (http vs https, wrong subdomain, or trailing slash mismatch), links in the REST response can be broken or inconsistent.  
     - **Match `WORDPRESS_URL`:** Whatever base URL you put in `.env` as `WORDPRESS_URL` must be the URL you use to reach the site’s REST API in a browser or `curl` — usually the same as **Site Address**.  
     - **When they differ:** WordPress only supports two different values in special setups (e.g. WordPress in a subdirectory, or deliberate URL filtering). For a standard headless install, keep them **identical** unless your host’s documentation says otherwise.
3. **Settings → Permalinks**  
   - Choose **Post name** (pretty URLs). Save — required for clean REST behaviour.
4. **Users**  
   - Use strong passwords; limit admin accounts.

---

## 2. Install & run WooCommerce

1. **Plugins → Add New → WooCommerce** → Install → Activate.
2. Run the **setup wizard** (currency **GBP**, location UK, etc.). You can skip installing optional “bundled” plugins you don’t need.
3. **WooCommerce → Settings**  
   - **General:** Currency, selling location.  
   - **Products:** inventory/shipping as you need (many fitted businesses use **quotes**; you can still show a **price** or “from £X” on products).  
   - **Accounts & Privacy:** match how you take leads (guest checkout off is common for trade).

---

## 3. REST API keys (required for products)

1. **WooCommerce → Settings → Advanced → REST API → Add key**.
2. Description: e.g. `Next.js storefront`.
3. User: an admin or shop manager you trust.
4. Permissions: **Read** is enough if Next.js only **displays** products. Use **Read/Write** only if you later build admin tools.
5. Copy **Consumer key** (`ck_...`) and **Consumer secret** (`cs_...`) into `.env.local` as `WC_CONSUMER_KEY` and `WC_CONSUMER_SECRET`.

**HTTPS:** Keys must be used over HTTPS in production.

---

## 4. Products (what the Next.js site reads from WooCommerce)

The storefront does **not** read your WordPress theme. It reads the **WooCommerce REST API** and maps fields in code (`lib/wordpress.js` → `normalizeWooProduct`). Here is what each WooCommerce product field does **in the admin** and **on your Next.js pages**:

| WooCommerce (admin) | Where you edit it | What appears on the Next.js site |
|---------------------|-------------------|----------------------------------|
| **Product name** | Product editor, top title | Main **heading** and browser title patterns that use the product name. |
| **Permalink / slug** | Product editor → permalink “Edit” | **`/product/{slug}`** on the Next.js site. Keep slugs short and stable (changing slug breaks old links unless you redirect). |
| **Short description** | Product data box, short description tab | **Teaser text** on shop cards and short blurbs — HTML is stripped to plain text for display. Good for one or two sentences. |
| **Description** | Long description tab | **Full product copy** on the product detail page — again, HTML tags are removed for display, so structure with paragraphs/lists in WP if you need them reflected as plain text. |
| **Regular price** (and **Sale price** if set) | General product data | **Price string** (e.g. `£1,200`) and **structured data** for search engines. Sale prices are parsed so the **current** price is shown when Woo sends sale HTML. |
| **Product categories** | Categories box (right) | Only the **first category in WooCommerce’s list** for that product is used for **filtering** on `/shop` (e.g. “Wardrobes”). Assign categories in the order you want that “primary” one to be, or use one category per product if unsure. |
| **Product gallery** (+ featured image) | Product images metabox | **All gallery images** (up to 6) feed the **hero + scroll “story”** sequence. The **first image in the `images` array** from the API is the **main** card/hero image — in WooCommerce this is usually the **featured image** first, then gallery order. Add a strong featured image, then add extra gallery images in the order you want the story to run. |
| **Custom attributes** | Attributes tab | Optional — see next subsection. If absent, the site uses **default** lines (dimensions, lead time, material, bullet features). |

### Optional product attributes (custom)

Use these when you want **real** specs instead of the default placeholder text on the product page.

**How to set them up in WooCommerce**

1. **Products → Attributes** — Create global attributes (e.g. “Dimensions”, “Lead time”) **or** add **Custom product attribute** per product on the **Attributes** tab of each product.  
2. For each attribute, enter **one main value** (see note below).  
3. Names are matched **case-insensitively** (`Dimensions` and `dimensions` both work) because the code lowercases the name before comparing.

**How the code maps them** (`normalizeWooProduct`):

| Attribute name (in WooCommerce) | After lowercasing, code matches | Appears on Next.js as |
|---------------------------------|----------------------------------|------------------------|
| e.g. **Dimensions** | `dimensions` | Single line: **Dimensions** (e.g. “Built to fit alcove width 2400mm”). |
| **Lead time** or **Leadtime** | `lead time` or `leadtime` | Single line: **Lead time**. |
| **Material** | `material` | Single line next to the title area: **Material**. |
| **Highlights** or **Features** | `highlights` or `features` | **Bullet list** — put several items in **one** attribute value, separated by **commas** or **new lines** (e.g. `Soft-close drawers, LED option, Made to measure`). |

**Important details**

- **One value used for dimensions / lead time / material:** The API sends `options` as an array; the site uses **`options[0]`** only. Use a **single** option (one line of text), not multiple checkboxes, for those three.  
- **Features:** Still uses the **first** option string, then **splits** it on commas or newlines into separate bullets.  
- If you **omit** these attributes entirely, visitors still see friendly **defaults** (e.g. “Dimensions available on request”, generic feature bullets).

### Images

- Add a **featured image** + extra images to the **product gallery** for the PDP “story” sequence.
- Use **large enough** originals; the Next.js `Image` component will optimise them.
- Image URLs must be allowed in **`next.config.mjs`** → `images.remotePatterns` (your WP domain is already listed for `content.obiskitchenbedrooms.co.uk`; add your real hostname if different).

---

## 5. Advice (WordPress Posts)

1. **Posts → Add New** — write your article, set **Featured image** (recommended for cards and OG).
2. Assign a **Category** (e.g. Wardrobes, Kitchens, Storage) — the site uses the first category for labels and **fallback imagery** if there’s no featured image.
3. **Slug** (edit permalink) becomes `/advice/your-slug`.

**REST access:** Standard WP allows **reading published posts** without authentication. If a security plugin **blocks** `/wp-json/`, the Advice section will break or fall back to mock posts — allow read access to `wp/v2/posts` for anonymous GET.

---

## 6. Security & headless hygiene

- **Don’t** expose WP admin on a guessable URL without extra hardening (2FA, IP allowlist, or host-level rules).
- Keep **WordPress, WooCommerce, and PHP** updated.
- **Disable file editing** in `wp-config.php` if you don’t need it:  
  `define('DISALLOW_FILE_EDIT', true);`
- If the site is **headless-only**, you can use a **minimal theme**; WooCommerce still needs to boot — a lightweight default or blank child theme is fine.

---

## 7. Verify from your machine

Replace values:

```bash
# Products (needs keys)
curl -sS -u "ck_xxx:cs_xxx" "https://YOUR-WP/wp-json/wc/v3/products?per_page=2"

# Posts (usually public)
curl -sS "https://YOUR-WP/wp-json/wp/v2/posts?per_page=2&_embed=1"
```

You should see JSON arrays. If `401` on products, check keys and HTTPS. If `404` on `/wp-json/`, permalinks or server rewrite rules.

---

## 8. Connect Next.js

1. Copy `.env.example` → `.env.local`.
2. Set `WORDPRESS_URL`, `WC_CONSUMER_KEY`, `WC_CONSUMER_SECRET`.
3. `npm run dev` — check terminal for `[WP FETCH] Successfully fetched N products`.
4. Deploy: add the same env vars on **Netlify** (or your host).

---

## Quick checklist

- [ ] WordPress installed, HTTPS, **pretty permalinks**  
- [ ] WooCommerce installed, GBP, products created with **images**  
- [ ] **REST API keys** created (Read), in `.env.local`  
- [ ] `WORDPRESS_URL` matches site URL (no trailing slash)  
- [ ] Image hostnames in `next.config.mjs` if WP domain changes  
- [ ] **Posts** (+ categories + featured images) for Advice  
- [ ] Optional: product **attributes** for dimensions / lead time / material / features  

That’s everything this codebase expects from WordPress + WooCommerce.
