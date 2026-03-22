import { getProducts, getPosts } from "../lib/wordpress";

const baseUrl = "https://obiskitchenbedrooms.co.uk";

export default async function sitemap() {
  const staticNow = new Date();
  const staticRoutes = ["", "/shop", "/advice", "/process", "/contact", "/privacy", "/terms", "/start"].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: staticNow,
  }));

  const [products, posts] = await Promise.all([getProducts(), getPosts()]);

  const productRoutes =
    products?.map((product) => ({
      url: `${baseUrl}/product/${product.slug}`,
      lastModified: product.lastModified ? new Date(product.lastModified) : new Date(),
    })) || [];

  const adviceRoutes =
    posts?.map((post) => ({
      url: `${baseUrl}/advice/${post.slug}`,
      lastModified: post.date ? new Date(post.date) : new Date(),
    })) || [];

  return [...staticRoutes, ...productRoutes, ...adviceRoutes];
}

