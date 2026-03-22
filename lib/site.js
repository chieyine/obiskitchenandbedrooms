export const SITE_ORIGIN = "https://obiskitchenbedrooms.co.uk";

/** Absolute URL for JSON-LD / OG when you have a root-relative path */
export function absoluteUrl(path) {
  if (!path) return undefined;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_ORIGIN}${p}`;
}
