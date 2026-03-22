# Obi’s Kitchen & Bedrooms — **Content guide (WordPress)**

*Hand this to the client. It explains how to run the **content** side of the website. Technical hosting and the public website build are handled separately.*

---

## How this fits together (simple version)

| You use… | To manage… | It appears on the website as… |
|----------|------------|-------------------------------|
| **WordPress** (your private admin area) | Products and articles | The **Shop**, **product pages**, and **Advice** articles on the public site |

The **public website** (what customers see) is built separately and **pulls in** what you publish here. You do **not** design pages in WordPress like a traditional site — you add **products** and **posts**, and they show up on the right sections of the live site.

**Rough timing:** After you save or publish, changes usually appear on the live site within a **few minutes** (not always instant).

---

## How to log in

1. Open your WordPress admin URL (your developer or host will give you this — often something like `https://content.yourdomain.co.uk/wp-admin`).
2. Sign in with the username and password provided.
3. Use a **strong password** and don’t share the admin login widely. Extra staff can have their own WordPress users if needed.

---

## Part A — **Shop products** (WooCommerce)

### Where to go

**Products → All Products** — list of everything in the shop.  
**Products → Add New** — create a new product.

### For each product, fill in:

| Field | What to put | Why it matters |
|--------|-------------|----------------|
| **Product name** | Clear name (e.g. “Sliding door wardrobe — made to measure”) | Main title on the product page. |
| **Permalink (slug)** | Short, readable URL piece (e.g. `sliding-door-wardrobe`) | Becomes the web address: `/product/your-slug`. **Avoid changing this** after launch without asking your developer — old links can break. |
| **Short description** | 1–2 sentences for teasers | Used on shop listings and short blurbs. |
| **Description** | Full detail: what’s included, options, how you work | Main text on the product page. |
| **Price** | Regular price (and sale price if you run a promotion) | Shown on the shop and product page. |
| **Product categories** | e.g. Wardrobes, Kitchens, Storage | Used for **filters** on the Shop page. **Tip:** The **first** category you assign is treated as the “main” one for filtering — set the order you want, or use one category per product if that’s simpler. |
| **Product image** | Set a **featured image** | Main photo on cards and at the top of the product page. |
| **Product gallery** | Add more images in order | Extra images appear in the **image story** on the product page (hero + scroll). Use **good quality** photos; order them how you want them to appear. |

### Optional — **extra product details** (attributes)

If you want real specs instead of generic placeholder lines, your developer can have set up attributes. Typical names:

- **Dimensions** — one line of text (e.g. “Built to fit your room — survey required”).
- **Lead time** — one line (e.g. “Typically 4–6 weeks from order”).
- **Material** — one line (e.g. “Painted MDF, oak accents optional”).
- **Features** or **Highlights** — several points in **one** box, separated by **commas** or **line breaks** (e.g. “Soft-close hinges, Made to measure, Installation included”).

If you don’t use these, the site still shows sensible default wording.

### Publishing products

- **Publish** when ready, or **Save draft** while working.
- Only **published** products are intended to appear on the live shop (your setup may vary for staging — ask your developer).

---

## Part B — **Advice articles** (WordPress Posts)

### Where to go

**Posts → All Posts** — list of articles.  
**Posts → Add New** — new article.

### For each article:

| Field | What to put |
|--------|-------------|
| **Title** | Headline readers will see. |
| **Content** | Full article (headings, paragraphs, lists as normal). |
| **Featured image** | Strong image for the article card and top of the page — **recommended**. |
| **Categories** | e.g. Wardrobes, Kitchens, Storage — helps readers and labels on the site. |
| **Slug** | Short URL ending (e.g. `kitchen-planning-checklist`) — becomes `/advice/your-slug`. |

**Publish** when ready.

---

## What **not** to change without your developer

To avoid breaking the connection between this WordPress site and the public website:

- **Settings → General** — **WordPress Address** and **Site Address** (these must stay correct for your hosting setup).
- **Permalink structure** — leave as your developer configured (usually “Post name”).
- **Deleting users** that own API connections or critical content.
- **Plugins** — don’t install random plugins without checking; some can block the site from reading content.
- **WooCommerce → Settings → Advanced → REST API** — keys here connect to the live site; don’t delete or regenerate keys unless your developer updates the hosting configuration.

If something “disappeared” from the live site after a change here, contact your developer.

---

## Good habits

- **Keep WordPress and WooCommerce updated** when your host or developer prompts you (security and stability).
- **Compress images** before upload if they’re huge (faster loading). Your developer can suggest a maximum size.
- **Backups** — confirm with your host or developer that the site is backed up regularly.

---

## When to contact your developer

- Live site doesn’t show new products or articles after a reasonable wait.
- You need a **new product category** structure or **shop behaviour** change.
- You want to **change the WordPress domain** or move host.
- Login problems, SSL/certificate warnings, or “white screen” errors.
- Anything involving **API keys**, **environment variables**, or **Netlify/hosting** — that’s not day-to-day content editing.

---

## Quick checklist — “Did I do it right?”

**Product**

- [ ] Published (not left as draft if it should be live)  
- [ ] Featured image set  
- [ ] Category chosen (first category = main filter)  
- [ ] Slug looks good — you’re happy for it to be permanent  

**Advice post**

- [ ] Published  
- [ ] Featured image set  
- [ ] Category chosen  

---

*Document version: content editing only — technical setup: see internal developer documentation.*
