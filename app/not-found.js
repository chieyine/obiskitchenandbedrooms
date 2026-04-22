import Link from "next/link";
import GlobalNav from "./components/GlobalNav";

export const metadata = {
  title: "Page Not Found | Obi's Kitchen & Bedrooms",
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col" data-cursor-label="Lost?" data-cursor-tone="default">
      <GlobalNav theme="default" />
      
      <section className="flex-1 flex flex-col items-center justify-center px-6 py-32 text-center">
        <div className="max-w-2xl">
          <p className="label-upper text-foreground/45 mb-6">Error 404</p>
          <h1 className="text-5xl md:text-8xl font-serif brutal-title mb-8 leading-[0.85]">
            Page Not Found
          </h1>
          <p className="text-foreground/60 leading-relaxed text-[16px] md:text-lg mb-12 max-w-md mx-auto font-light">
            We can&apos;t seem to find the page you&apos;re looking for. It might have been moved, or the link might be broken.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/" 
              className="inline-flex items-center justify-center bg-foreground text-background px-10 py-5 text-[11px] uppercase tracking-[0.3em] hover:bg-foreground/90 transition-all font-medium min-w-[200px]"
            >
              Back to Home
            </Link>
            <Link 
              href="/shop" 
              className="inline-flex items-center justify-center border border-foreground/20 bg-background px-10 py-5 text-[11px] uppercase tracking-[0.3em] hover:bg-foreground/5 transition-all font-medium min-w-[200px]"
            >
              Browse Services
            </Link>
          </div>
          
          <div className="mt-16 pt-16 border-t border-foreground/5">
            <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/40 mb-4">Or get in touch</p>
            <Link href="/contact" className="luxury-link text-[11px] uppercase tracking-[0.25em]">
              Contact our team
            </Link>
          </div>
        </div>
      </section>
      
      <div className="grain-overlay opacity-[0.015]" />
    </main>
  );
}
