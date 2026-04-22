"use client";

import { useEffect, useId, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

function clampIndex(index, length) {
  if (length <= 0) return 0;
  return ((index % length) + length) % length;
}

export default function HomeHeroSlider({ className = "" }) {
  const prefersReducedMotion = useReducedMotion();
  const carouselId = useId();

  const slides = useMemo(
    () => [
      {
        eyebrow: "Kitchen cabinets",
        title: "Fitted cabinetry, measured and installed properly.",
        copy: "Handleless or classic styles, smart storage and clean lines—kitchen cabinets designed around how you cook and move.",
        ctaLabel: "Explore kitchens",
        ctaHref: "/shop",
        image: {
          src: "/images/hero-stock/kitchen.jpg",
          alt: "Modern fitted kitchen with white cabinets, island and integrated appliances",
        },
      },
      {
        eyebrow: "Wardrobes",
        title: "Floor-to-ceiling wardrobes, built to your space.",
        copy: "Sliding or hinged doors, internals that suit your routine—no dead corners, no awkward gaps.",
        ctaLabel: "See wardrobe ideas",
        ctaHref: "/shop",
        image: {
          src: "/images/hero-stock/wardrobe.jpg",
          alt: "Row of floor-to-ceiling fitted wardrobe doors in a light neutral finish",
        },
      },
      {
        eyebrow: "Media walls",
        title: "TV on the wall. Storage built in. Cables hidden.",
        copy: "A clean media wall with the screen, soundbar and storage working together—finished to look intentional, not cluttered.",
        ctaLabel: "View media wall options",
        ctaHref: "/shop",
        image: {
          src: "/images/hero-stock/media-wall.jpg",
          alt: "Living room with wall-mounted TV, floating shelf and soundbar on a light wood media wall",
        },
      },
    ],
    []
  );

  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) return;
    if (isPaused) return;

    const id = window.setInterval(() => {
      setActive((v) => clampIndex(v + 1, slides.length));
    }, 4000);

    return () => window.clearInterval(id);
  }, [isPaused, prefersReducedMotion, slides.length]);

  const current = slides[clampIndex(active, slides.length)];

  const goPrev = () => setActive((v) => clampIndex(v - 1, slides.length));
  const goNext = () => setActive((v) => clampIndex(v + 1, slides.length));

  const onKeyDown = (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goPrev();
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goNext();
    }
  };

  return (
    <section
      className={`relative h-full min-h-full overflow-hidden bg-secondary/35 ${className}`}
      aria-roledescription="carousel"
      aria-label="Featured services"
      onKeyDown={onKeyDown}
      tabIndex={0}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className="relative h-full min-h-[420px] w-full">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={current.image.src}
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 1.02 }}
            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.995 }}
            transition={{ duration: prefersReducedMotion ? 0.2 : 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={current.image.src}
              alt={current.image.alt}
              fill
              priority
              quality={92}
              sizes="100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/15" />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 p-6 md:p-20 flex flex-col justify-center">
          <div className="max-w-[600px] bg-black/60 backdrop-blur-md border border-white/10 p-8 md:p-12 text-left">
            <p className="text-[10px] uppercase tracking-[0.35em] text-white/70 mb-4 font-bold">
              {current.eyebrow}
            </p>
            <h2 className="text-3xl md:text-5xl lg:text-[3.5rem] font-serif leading-[1.05] text-white brutal-title">
              {current.title}
            </h2>
            <p className="mt-5 text-[14px] md:text-[16px] leading-[1.65] text-white/80 font-light max-w-md">
              {current.copy}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href={current.ctaHref}
                className="inline-flex items-center gap-3 bg-white text-black px-7 py-4 text-[10px] uppercase tracking-[0.28em] hover:bg-white/80 transition-colors font-bold"
              >
                {current.ctaLabel}
              </Link>
              <Link
                href="/start"
                className="inline-flex items-center gap-3 border border-white/40 text-white px-7 py-4 text-[10px] uppercase tracking-[0.28em] hover:bg-white/10 transition-colors font-medium"
              >
                Get a quote
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute top-4 right-4 md:top-6 md:right-6 flex items-center gap-2">
          <button
            type="button"
            onClick={goPrev}
            className="h-10 w-10 grid place-items-center border border-background/30 bg-background/10 text-background backdrop-blur-sm hover:bg-background/15 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background focus-visible:ring-offset-2 focus-visible:ring-offset-foreground/20"
            aria-label="Previous slide"
            aria-controls={carouselId}
          >
            <span aria-hidden="true">‹</span>
          </button>
          <button
            type="button"
            onClick={goNext}
            className="h-10 w-10 grid place-items-center border border-background/30 bg-background/10 text-background backdrop-blur-sm hover:bg-background/15 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background focus-visible:ring-offset-2 focus-visible:ring-offset-foreground/20"
            aria-label="Next slide"
            aria-controls={carouselId}
          >
            <span aria-hidden="true">›</span>
          </button>
        </div>

        <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 flex items-center gap-2">
          <div className="sr-only" aria-live="polite">
            Slide {clampIndex(active, slides.length) + 1} of {slides.length}
          </div>
          <div id={carouselId} className="flex items-center gap-2">
            {slides.map((_, idx) => {
              const selected = idx === clampIndex(active, slides.length);
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActive(idx)}
                  className={`h-2.5 w-2.5 rounded-full transition-all ${
                    selected ? "bg-background w-7" : "bg-background/35 hover:bg-background/55"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                  aria-pressed={selected}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

