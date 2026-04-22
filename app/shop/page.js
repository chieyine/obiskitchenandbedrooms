import { getProductCategories, getProducts } from "../../lib/wordpress";
import ShopExperience from "../components/ShopExperience";
import GlobalNav from "../components/GlobalNav";

export const metadata = {
  title: "Shop & Our Work",
  description: "Browse fitted wardrobes, bedroom furniture, kitchen cabinets, wall media units and custom storage from Obi's Kitchen & Bedrooms.",
  alternates: { canonical: "/shop" },
};

export default async function ShopPage() {
  const [products, categories] = await Promise.all([getProducts(), getProductCategories()]);

  return (
    <main className="min-h-screen bg-background pt-32" data-cursor-label="Shop" data-cursor-tone="default">
      <GlobalNav />
      <ShopExperience products={products} categories={categories} />
    </main>
  );
}
