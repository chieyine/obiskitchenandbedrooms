"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { brand } from "@/lib/brand-images";

/** Service tiles: imagery matches each heading (same stock set as homepage hero pillars). */
const beats = [
  {
    id: "01",
    title: "Fitted Bedrooms & Wardrobes",
    copy: "Made-to-measure wardrobes that maximise space—sliding, hinged, mirrored or walk-in, with custom shelving, drawers and rails.",
    image: brand.wardrobe,
    imageAlt: "Floor-to-ceiling fitted wardrobe doors in a neutral finish",
  },
  {
    id: "02",
    title: "Kitchen Cabinets & Fitted Kitchens",
    copy: "Durable, practical units with modern or classic finishes—base and wall units, pantries, soft-close drawers and worktops.",
    image: brand.kitchen,
    imageAlt: "Modern fitted kitchen with cabinetry, island and appliances",
  },
  {
    id: "03",
    title: "Media Walls & Bespoke Storage",
    copy: "Media walls, under-stairs storage, home office cabinets, bathroom units and floating shelves—if you can imagine it, we can build it.",
    image: brand.media,
    imageAlt: "Living room with wall-mounted TV and built-in media storage",
  },
];

export default function NarrativeBeats() {
  return (
    <section className="px-6 md:px-20 py-4 lg:py-28">
      <div className="section-shell">
        <div className="mb-6 md:mb-8">
          <p className="label-upper text-foreground/45 mb-2">What we do</p>
          <h2 className="text-3xl md:text-5xl font-serif brutal-title">
            Services at a Glance
          </h2>
        </div>

        <div className="flex flex-col gap-4 md:gap-8">
          {beats.map((beat) => (
            <article
              key={beat.id}
              className="brutal-panel border border-foreground/14 p-6 md:p-14 grid md:grid-cols-[0.7fr_1.3fr] gap-10 md:gap-16 items-center"
            >
              <div className="order-2 md:order-1">
                <p className="label-upper text-foreground/45 mb-4">{beat.id}</p>
                <h3 className="text-3xl md:text-5xl font-serif brutal-title mb-5">{beat.title}</h3>
                <p className="text-foreground/70 leading-[1.6] max-w-md text-[15px] md:text-base font-light">{beat.copy}</p>
              </div>
              <motion.div
                className="order-1 md:order-2 aspect-16/9 md:aspect-4/3 rounded-[2px] border border-foreground/12 relative overflow-hidden"
                whileInView={{ scale: [0.96, 1], opacity: [0.75, 1] }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src={beat.image}
                  alt={beat.imageAlt}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 60vw"
                  quality={88}
                />
                <div className="absolute inset-0 bg-linear-to-t from-foreground/30 via-transparent to-transparent pointer-events-none" />
              </motion.div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
