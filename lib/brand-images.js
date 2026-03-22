/**
 * Canonical on-brand photography (kitchens, wardrobes, media walls).
 * Used by WooCommerce mock data, advice fallbacks, and UI when a post has no featured image.
 */
export const brand = {
  kitchen: "/images/hero-stock/kitchen.jpg",
  wardrobe: "/images/hero-stock/wardrobe.jpg",
  media: "/images/hero-stock/media-wall.jpg",
};

/**
 * Pick a hero/card image from a WordPress-style category name (advice posts).
 */
export function adviceImageForCategory(category) {
  const c = (category || "").toLowerCase();
  if (c.includes("kitchen")) return brand.kitchen;
  if (c.includes("wardrobe") || c.includes("bedroom")) return brand.wardrobe;
  if (c.includes("storage") || c.includes("media")) return brand.media;
  return brand.kitchen;
}
