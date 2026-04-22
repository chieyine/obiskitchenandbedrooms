import ContactExperience from "../components/ContactExperience";
import GlobalNav from "../components/GlobalNav";

export const metadata = {
  title: "Contact",
  description:
    "Contact Obi's Kitchen & Bedrooms for fitted wardrobes, bedrooms, kitchens, media walls and custom storage. Free consultation and quote across Hertfordshire and the UK.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage({ searchParams }) {
  const sp = await searchParams;
  const raw = (v) => (typeof v === "string" ? v : Array.isArray(v) ? v[0] : "");

  const quoteProductSlug = raw(sp?.product);
  const quoteProductTitle = raw(sp?.title) || raw(sp?.interest);
  const quoteSubject = raw(sp?.subject);

  return (
    <main className="min-h-screen bg-background" data-cursor-label="Contact" data-cursor-tone="default">
      <GlobalNav theme="transparent" />

      <ContactExperience
        quoteProductSlug={quoteProductSlug}
        quoteProductTitle={quoteProductTitle}
        quoteSubject={quoteSubject}
      />
    </main>
  );
}
