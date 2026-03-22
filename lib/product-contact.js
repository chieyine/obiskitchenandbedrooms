/** Map WooCommerce / mock category to contact form `subject` values */
export function contactSubjectFromCategory(category) {
  const c = (category || "").toLowerCase();
  if (c.includes("kitchen")) return "kitchen";
  if (c.includes("wardrobe")) return "wardrobe";
  if (c.includes("storage") || c.includes("media")) return "storage";
  return "general";
}

/** Build `/contact` query for a product quote (slug + title + subject) */
export function buildProductQuoteContactHref(product) {
  const params = new URLSearchParams();
  params.set("product", product.slug);
  params.set("title", product.title);
  params.set("subject", contactSubjectFromCategory(product.category));
  return `/contact?${params.toString()}`;
}
