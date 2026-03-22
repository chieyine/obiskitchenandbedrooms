const baseUrl = "https://obiskitchenbedrooms.co.uk";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: "obiskitchenbedrooms.co.uk",
  };
}

