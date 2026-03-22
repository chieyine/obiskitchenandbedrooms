import GlobalNav from '../components/GlobalNav';
import RoomConfigurator from '../components/RoomConfigurator';

export const metadata = {
  title: "Get a Free Quote | Fitted Kitchens & Wardrobes | Obi's Kitchen & Bedrooms",
  description: "Find the right fitted kitchen, wardrobe, bedroom or wall media solution for your space with our interactive configurator.",
  alternates: { canonical: "/start" },
};

export default function StartPage() {
  return (
    <main className="min-h-screen relative bg-secondary/30 pt-32 pb-24 font-sans text-foreground">
      <div className="grain-overlay" />
      <GlobalNav />
      {/* 
        The RoomConfigurator component handles its own internal layout,
        we just drop it in here on its dedicated page.
      */}
      <RoomConfigurator />

      <section className="px-6 md:px-20 pt-6 pb-10">
        <div className="max-w-[900px] mx-auto brutal-panel border border-foreground/12 p-8 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="max-w-xl">
            <p className="label-upper text-foreground/45 mb-2">Prefer a quick message?</p>
            <p className="text-foreground/65 leading-[1.7] text-[14px] md:text-[15px] font-light">
              If you already know what you want, send a short note and we’ll reply within 48 hours.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="/contact"
              className="inline-flex items-center justify-center bg-foreground text-background px-7 py-3 text-[10px] uppercase tracking-[0.28em] hover:bg-foreground/90 transition-colors"
            >
              Contact us
            </a>
            <a
              href="mailto:obiskitchenandbedrooms@gmail.com"
              className="inline-flex items-center justify-center border border-foreground/20 px-7 py-3 text-[10px] uppercase tracking-[0.28em] hover:bg-foreground/5 transition-colors"
            >
              Email
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
