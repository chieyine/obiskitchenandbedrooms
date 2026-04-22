"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal, SmoothScroll } from "./Animations";
import Image from "next/image";
import { Search } from "lucide-react";
import { adviceImageForCategory } from "@/lib/brand-images";

export default function JournalExperience({ posts }) {
  const container = useRef(null);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = useMemo(() => {
    const set = new Set(posts.map((p) => p.category).filter(Boolean));
    return ["All", ...Array.from(set)];
  }, [posts]);

  const filteredPosts = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return posts.filter((post) => {
      const categoryMatch = activeCategory === "All" || post.category === activeCategory;
      const queryMatch =
        normalized.length === 0 ||
        `${post.title || ""} ${post.excerpt || ""}`.toLowerCase().includes(normalized);
      return categoryMatch && queryMatch;
    });
  }, [posts, query, activeCategory]);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"]
  });

  return (
    <SmoothScroll>
      <div ref={container} className="relative pb-16 md:pb-32">
        <header className="px-6 md:px-20 pt-24 md:pt-32 pb-12 md:pb-20 border-b border-foreground/12">
          <div className="max-w-[1400px] mx-auto">
            <Reveal>
              <h1 className="text-[12vw] md:text-[8vw] brutal-title font-serif uppercase leading-none tracking-tighter">
                Advice &<br />
                <span className="italic text-foreground/40">Guides</span>
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-8 md:mt-24 grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
                <div className="max-w-xl">
                  <p className="text-foreground/60 leading-[1.6] text-[15px] md:text-base font-sans">
                    Practical tips on fitted wardrobes, kitchens, and custom storage—everything you need to know before you build.
                  </p>
                  <div className="mt-6 flex flex-wrap items-center gap-4">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-foreground/50 font-sans font-medium">
                      {filteredPosts.length} article{filteredPosts.length === 1 ? "" : "s"}
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setQuery("");
                        setActiveCategory("All");
                      }}
                      className={`text-[10px] uppercase tracking-[0.2em] luxury-link ${
                        query.trim() || activeCategory !== "All" ? "opacity-100" : "opacity-40 pointer-events-none"
                      }`}
                      aria-disabled={!(query.trim() || activeCategory !== "All")}
                    >
                      Clear filters
                    </button>
                  </div>
                </div>

                <div className="brutal-panel px-4 py-3 flex items-center gap-3 min-w-[260px]">
                  <Search size={16} className="text-foreground/45" />
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search advice..."
                    aria-label="Search advice articles"
                    className="bg-transparent outline-none border-none text-sm flex-1 placeholder:text-foreground/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </header>

        <section className="px-6 md:px-20 pt-10 md:pt-20">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex flex-wrap gap-3 mb-10 md:mb-14">
              {categories.map((category) => {
                const isActive = category === activeCategory;
                return (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 text-[10px] uppercase tracking-[0.24em] border transition-colors duration-300 ${
                      isActive
                        ? "bg-foreground text-background border-foreground"
                        : "bg-transparent text-foreground/60 border-foreground/25 hover:text-foreground"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
            {filteredPosts.map((post, i) => {
              const coverImage = post.image || adviceImageForCategory(post.category);
              // Creating an asymmetric grid pattern
              const isLarge = i % 4 === 0 || i % 4 === 3;
              const gridClass = isLarge 
                ? "md:col-span-8 md:col-start-3" 
                : (i % 2 === 0 ? "md:col-span-5 md:col-start-1" : "md:col-span-5 md:col-start-8 mt-0 md:mt-32");

              return (
                <article key={post.id} className={`${gridClass} group cursor-pointer`}>
                  <Link href={`/advice/${post.slug}`} className="block">
                    <Reveal delay={0.1}>
                      <div className={`relative overflow-hidden ${isLarge ? 'aspect-video' : 'aspect-4/5'}`}>
                        <Image
                          src={coverImage}
                          alt={post.title || "Journal article image"}
                          fill
                          className="object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 66vw"
                          quality={90}
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-700 pointer-events-none" />
                        
                        <div className="absolute top-4 left-4 right-4 flex justify-between text-[10px] uppercase tracking-[0.2em] text-white/90 drop-shadow-md pointer-events-none">
                          <span>{post.category}</span>
                          <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                        </div>
                      </div>
                    </Reveal>
                    
                    <div className="mt-6 md:mt-8 space-y-3">
                      <Reveal delay={0.2}>
                        <h2 className={`font-serif leading-tight tracking-tight ${isLarge ? 'text-4xl md:text-5xl' : 'text-3xl'}`}>
                          {post.title}
                        </h2>
                      </Reveal>
                      <Reveal delay={0.3}>
                        <div className="text-foreground/60 leading-relaxed text-sm max-w-lg font-sans line-clamp-2">
                          {post.excerpt}
                        </div>
                      </Reveal>
                    </div>
                  </Link>
                </article>
              );
            })}
            </div>

            {posts.length === 0 ? (
              <div className="py-24 text-center border border-dashed border-foreground/20 mt-16 brutal-panel">
                <p className="text-foreground/60 mb-3">We are currently writing our first advice guides.</p>
                <Link href="/" className="text-[12px] uppercase tracking-widest text-accent hover:opacity-80">
                  Return to homepage
                </Link>
              </div>
            ) : filteredPosts.length === 0 ? (
              <div className="py-24 text-center border border-dashed border-foreground/20 mt-16 brutal-panel">
                <p className="text-foreground/60 mb-3">No articles match this filter.</p>
                <p className="text-[12px] text-foreground/55 font-sans">Try another category or clear your search.</p>
              </div>
            ) : null}
          </div>
        </section>
      </div>
    </SmoothScroll>
  );
}
