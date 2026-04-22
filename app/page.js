import Link from 'next/link';
import Image from 'next/image';
import { getProducts } from '../lib/wordpress';

/** Homepage only — root layout must not set a global canonical (would hurt other routes). */
export const metadata = {
  alternates: { canonical: '/' },
};
import ProductCard from './components/ProductCard';
import { Reveal } from './components/Animations';
import MagneticButton from './components/MagneticButton';
import GlobalNav from './components/GlobalNav';
import StickySceneFlow from './components/StickySceneFlow';
import Testimonials from './components/Testimonials';
import BeforeAfterSlider from './components/BeforeAfterSlider';
import HomeHeroSlider from './components/HomeHeroSlider';
import { brand } from '@/lib/brand-images';

/** Homepage featured grid: lead with kitchen, wardrobe & media wall offers */
const FEATURED_HOME_ORDER = [
  'shaker-kitchen-cabinets',
  'sliding-door-wardrobe',
  'tv-media-wall-unit',
  'handleless-modern-kitchen',
];

function orderFeaturedProducts(products) {
  const bySlug = new Map(products.map((p) => [p.slug, p]));
  const ordered = FEATURED_HOME_ORDER.map((slug) => bySlug.get(slug)).filter(Boolean);
  const rest = products.filter((p) => !FEATURED_HOME_ORDER.includes(p.slug));
  return [...ordered, ...rest].slice(0, 4);
}

const SERVICE_PILLARS = [
  {
    title: 'Kitchen cabinets',
    blurb: 'Fitted units, islands & storage',
    href: '/product/shaker-kitchen-cabinets',
    image: brand.kitchen,
    alt: 'Modern fitted kitchen with cabinetry and island',
  },
  {
    title: 'Wardrobes',
    blurb: 'Sliding, hinged & walk-in designs',
    href: '/product/sliding-door-wardrobe',
    image: brand.wardrobe,
    alt: 'Floor-to-ceiling fitted wardrobe doors',
  },
  {
    title: 'Media walls',
    blurb: 'TV walls with storage & cable-free look',
    href: '/product/tv-media-wall-unit',
    image: brand.media,
    alt: 'Living room with wall-mounted TV and media storage',
  },
];

export default async function Home() {
  const products = await getProducts();
  const featuredProducts = orderFeaturedProducts(products);

  return (
    <main className="min-h-screen relative bg-background">
      <div className="grain-overlay" />
      <GlobalNav theme="transparent" />

      {/* Full-viewport hero slider (fills area below fixed nav) */}
      <section
        className="relative flex min-h-[100svh] flex-col pt-20 md:pt-24"
        data-cursor-label="Hero"
        data-cursor-tone="default"
      >
        <div className="relative min-h-0 flex-1 w-full">
          <HomeHeroSlider className="absolute inset-0 h-full min-h-[420px] w-full" />
        </div>
      </section>

      {/* Text + featured products hero band */}
      <section className="px-6 md:px-20 pt-12 md:pt-24 pb-16 md:pb-32 flex items-end relative" data-cursor-label="Intro" data-cursor-tone="default">
        <div className="max-w-[1400px] w-full mx-auto grid md:grid-cols-[1.4fr_0.6fr] gap-12 md:gap-20 items-end">
          <div>
            <Reveal delay={0.1}>
              <p className="text-[10px] uppercase tracking-[0.4em] text-foreground/75 mb-6">
                Obi&apos;s Kitchen &amp; Bedrooms · Serving the UK
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <h1 className="text-[12vw] md:text-[7.5vw] lg:text-[90px] brutal-title font-serif uppercase max-w-4xl opacity-90 leading-[0.85] md:leading-[0.85]">
                Bespoke Fitted Kitchens,
                <br />
                Wardrobes &amp;
                <br />
                Media Walls
              </h1>
            </Reveal>
            <Reveal delay={0.35}>
              <p className="mt-6 md:mt-10 max-w-xl text-foreground/70 leading-[1.7] text-[15px] md:text-[17px] font-sans font-light">
                Bespoke custom-built wardrobes, fitted bedrooms, media walls and kitchen cabinets—designed around your space, style and budget. From design to installation, we keep it simple, reliable and finished to a professional high standard.
              </p>
            </Reveal>
            <Reveal delay={0.45}>
              <div className="mt-8 md:mt-10 flex flex-wrap items-center gap-4">
                <MagneticButton className="inline-block">
                  <Link href="/start" className="inline-flex items-center gap-3 border border-foreground/20 px-8 py-4 text-[10px] uppercase tracking-[0.3em] hover:bg-accent/20 transition-colors duration-500 font-medium">
                    Get a free quote
                  </Link>
                </MagneticButton>
                <MagneticButton className="inline-block">
                  <Link href="/shop" className="inline-flex items-center gap-3 border border-foreground/10 px-8 py-4 text-[10px] uppercase tracking-[0.3em] hover:bg-foreground/5 transition-colors duration-500 font-medium">
                    See what we build
                  </Link>
                </MagneticButton>

                <div className="w-full mt-4 flex flex-wrap items-center gap-3 md:gap-4 text-foreground/70 justify-start">
                  <div className="flex gap-1 bg-accent/10 px-2 py-1 rounded-[2px] border border-accent/20">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 fill-accent" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-foreground/80">5-Star Rated Service</span>
                  <span className="text-foreground/30 hidden md:inline">•</span>
                  <a href="tel:+447733689409" className="text-[11px] uppercase tracking-[0.1em] hover:text-accent transition-colors font-medium border-b border-accent/30 hover:border-accent">
                    Call directly: 07733 689409
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.55}>
              <div className="mt-10 md:mt-12 max-w-xl brutal-panel px-6 py-5 border border-foreground/12">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-[10px] uppercase tracking-[0.22em] text-foreground/65 font-sans font-medium">
                  <span>Free survey</span>
                  <span>Made to measure</span>
                  <span>48h reply</span>
                  <span>UK-wide</span>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="flex flex-col gap-4 md:gap-5">
            {SERVICE_PILLARS.map((pillar, index) => (
              <Reveal key={pillar.href} delay={0.3 + index * 0.1}>
                <Link href={pillar.href} className="group block brutal-panel p-3 hover:border-foreground/25 transition-colors">
                  <div className="aspect-4/3 relative overflow-hidden">
                    <Image
                      src={pillar.image}
                      alt={pillar.alt}
                      fill
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, 36vw"
                      priority={index === 0}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-foreground/55 via-foreground/10 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 text-[10px] uppercase tracking-[0.28em] text-white/95 space-y-1">
                      <span className="block font-semibold tracking-[0.2em]">{pillar.title}</span>
                      <span className="block text-[9px] normal-case tracking-normal text-white/75 font-light leading-snug">{pillar.blurb}</span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <StickySceneFlow />

      <section id="collection" className="py-16 md:py-48 px-6 md:px-20" data-cursor-label="Collect" data-cursor-tone="accent">
        <div className="max-w-[1400px] mx-auto">
          <Reveal>
            <div className="mb-12 md:mb-40 flex flex-col md:flex-row md:items-end md:justify-between gap-8 md:gap-12">
              <div className="space-y-4">
                <span className="label-upper text-foreground/75">Featured Work</span>
                <h2 className="text-[3rem] md:text-[6rem] font-serif max-w-3xl brutal-title opacity-95">Kitchens, Wardrobes & Media Walls</h2>
              </div>
              <p className="max-w-md text-[15px] md:text-[17px] text-foreground/65 leading-[1.7] font-light">
                Real builds across kitchens, wardrobes and media walls—fitted to your space with clean installation and practical storage.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
            <div className="space-y-12 md:space-y-32 md:mt-28">
              {featuredProducts.slice(0, 2).map((product, idx) => (
                <Reveal key={product.id} delay={idx * 0.2}>
                  <ProductCard product={product} />
                </Reveal>
              ))}
            </div>
            <div className="space-y-12 md:space-y-40">
              {featuredProducts.slice(2, 4).map((product, idx) => (
                <Reveal key={product.id} delay={idx * 0.2}>
                  <ProductCard product={product} />
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal>
            <div className="mt-12 md:mt-32 flex justify-center">
              <Link href="/shop" className="inline-flex items-center gap-3 border border-foreground/20 px-10 py-5 text-[11px] uppercase tracking-[0.3em] hover:bg-accent/10 transition-colors hover:-translate-y-1 font-medium bg-background">
                View All Services &amp; Projects
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <BeforeAfterSlider />

      <Testimonials />

      <section className="px-6 md:px-20 py-16 md:py-56" data-cursor-label="Read" data-cursor-tone="default">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-14 md:mb-20">
            <p className="label-upper text-foreground/45 mb-3">Why people choose us</p>
            <h2 className="text-3xl md:text-5xl font-serif brutal-title max-w-3xl">Simple process. Clean finish. Solid value.</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12 md:gap-20">
          {[
            { index: "01", title: "Skilled local craftsmen", copy: "Careful measuring, clean joins, solid fittings—done properly and built to last." },
            { index: "02", title: "Mid-range prices, high standards", copy: "We focus on value: a great finish without the premium price tag." },
            { index: "03", title: "From design to installation", copy: "Straight answers, clear quotes, tidy work and a final check before we leave." },
          ].map((item) => (
            <Reveal key={item.index} width="100%">
              <article className="brutal-panel p-10 md:p-14 hover:border-foreground/20 transition-all duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2">
                <p className="text-[10px] uppercase tracking-[0.4em] text-foreground/60 mb-10">{item.index}</p>
                <h3 className="text-[2rem] leading-[1.1] font-serif mb-6 opacity-90">{item.title}</h3>
                <p className="text-foreground/65 leading-[1.7] text-[15px] font-light">{item.copy}</p>
              </article>
            </Reveal>
          ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-20 py-14 md:py-32 border-t border-foreground/10 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-secondary/30 pointer-events-none" />
        <div className="max-w-[1400px] mx-auto brutal-panel border border-foreground/12 p-10 md:p-14 flex flex-col md:flex-row md:items-center md:justify-between gap-8 relative z-10 bg-background">
          <div className="max-w-2xl">
            <p className="label-upper text-foreground/45 mb-3">Next step</p>
            <h2 className="text-3xl md:text-5xl font-serif brutal-title mb-4">Ready to start your project?</h2>
            <p className="text-foreground/65 leading-[1.7] text-[15px] md:text-base font-light">
              Tell us what you’re building and your rough budget. We’ll reply within 48 hours to arrange a free survey and a clear written quote.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <a
              href="tel:+447733689409"
              className="inline-flex items-center justify-center border border-foreground/20 bg-background px-8 py-4 text-[10px] uppercase tracking-[0.28em] hover:bg-foreground/5 transition-colors font-medium"
            >
              Call 07733 689409
            </a>
            <a
              href="/start"
              className="inline-flex items-center justify-center bg-foreground text-background px-8 py-4 text-[10px] uppercase tracking-[0.28em] hover:bg-foreground/90 transition-colors font-medium"
            >
              Get a free quote
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
