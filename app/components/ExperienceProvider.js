"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function ExperienceProvider({ children }) {
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 4),
    });

    let frameId = 0;
    let isPaused = false;
    const raf = (time) => {
      if (isPaused) return;
      lenis.raf(time);
      frameId = window.requestAnimationFrame(raf);
    };

    frameId = window.requestAnimationFrame(raf);

    const onVisibility = () => {
      if (document.visibilityState === "hidden") {
        isPaused = true;
        window.cancelAnimationFrame(frameId);
      } else {
        isPaused = false;
        frameId = window.requestAnimationFrame(raf);
      }
    };

    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.cancelAnimationFrame(frameId);
      lenis.destroy();
    };
  }, []);

  return children;
}
