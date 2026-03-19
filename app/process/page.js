import AboutExperience from "../components/AboutExperience";
import FAQSection from "../components/FAQSection";
import NarrativeBeats from "../components/NarrativeBeats";
import Testimonials from "../components/Testimonials";
import GlobalNav from "../components/GlobalNav";

export const metadata = {
  title: "Our Process | Obi's Kitchen & Bedrooms",
  description: "How we work: free consultation, design & quote, manufacture and installation, final check. Serving Hertfordshire and the UK.",
};

export default function ProcessPage() {
  return (
    <main className="min-h-screen bg-background" data-cursor-label="Process" data-cursor-tone="light">
      <GlobalNav theme="transparent" />

      <AboutExperience />
      <NarrativeBeats />
      <Testimonials />
      <FAQSection />

      <section className="px-6 md:px-20 py-24 md:py-32 border-t border-foreground/10 bg-background">
        <div className="max-w-[1400px] mx-auto brutal-panel border border-foreground/12 p-10 md:p-14 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div className="max-w-2xl">
            <p className="label-upper text-foreground/45 mb-3">Next step</p>
            <h2 className="text-3xl md:text-5xl font-serif brutal-title mb-4">Get a clear quote, fast.</h2>
            <p className="text-foreground/65 leading-[1.7] text-[15px] md:text-base font-light">
              Tell us what you’re building and your rough budget. We’ll reply within 48 hours to arrange a free survey and a clear written quote.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="tel:+447733689409"
              className="inline-flex items-center justify-center border border-foreground/20 px-8 py-4 text-[10px] uppercase tracking-[0.28em] hover:bg-foreground/5 transition-colors"
            >
              Call 07733 689409
            </a>
            <a
              href="mailto:obiskitchenandbedrooms@gmail.com"
              className="inline-flex items-center justify-center bg-foreground text-background px-8 py-4 text-[10px] uppercase tracking-[0.28em] hover:bg-foreground/90 transition-colors"
            >
              Email us
            </a>
            <a
              href="/start"
              className="inline-flex items-center justify-center border border-foreground/10 px-8 py-4 text-[10px] uppercase tracking-[0.28em] hover:bg-accent/15 transition-colors"
            >
              Start a quote
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

