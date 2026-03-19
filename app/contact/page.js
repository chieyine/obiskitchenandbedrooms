import ContactExperience from "../components/ContactExperience";
import GlobalNav from "../components/GlobalNav";

export const metadata = {
  title: "Contact | Obi's Kitchen & Bedrooms",
  description:
    "Contact Obi's Kitchen & Bedrooms for fitted wardrobes, bedrooms, kitchens, media walls and custom storage. Free consultation and quote across Hertfordshire and the UK.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background" data-cursor-label="Contact" data-cursor-tone="default">
      <GlobalNav theme="transparent" />

      <ContactExperience />
    </main>
  );
}
