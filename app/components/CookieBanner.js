"use client";

import { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const bannerRef = useRef(null);
  const acceptButtonRef = useRef(null);
  const declineButtonRef = useRef(null);
  const previouslyFocusedElementRef = useRef(null);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = Cookies.get("obi_cookie_consent");
    if (!consent) {
      // Small delay so it doesn't immediately flash on screen
      const timer = setTimeout(() => setShowBanner(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (!showBanner) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [showBanner]);

  const handleAccept = () => {
    // Set cookie for 1 year
    Cookies.set("obi_cookie_consent", "accepted", {
      expires: 365,
      sameSite: "strict",
      secure: window.location.protocol === "https:",
      path: "/",
    });

    setShowBanner(false);
    window.location.reload();
  };

  const handleDecline = () => {
    // Save decline choice so we don't bother them again for a few weeks
    Cookies.set("obi_cookie_consent", "declined", {
      expires: 30,
      sameSite: "strict",
      secure: window.location.protocol === "https:",
      path: "/",
    });

    setShowBanner(false);
  };

  useEffect(() => {
    if (!showBanner) return;

    previouslyFocusedElementRef.current = document.activeElement;
    acceptButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        handleDecline();
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = [acceptButtonRef.current, declineButtonRef.current].filter(Boolean);
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocusedElementRef.current?.focus?.();
    };
  }, [showBanner]);

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          ref={bannerRef}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 left-6 right-6 md:right-auto md:left-10 md:bottom-10 md:max-w-[420px] bg-foreground text-background z-120 p-6 md:p-8 flex flex-col shadow-2xl"
          role="dialog"
          aria-modal="true"
          aria-live="polite"
          aria-labelledby="cookie-consent-title"
        >
          <div className="mb-6">
            <h3 id="cookie-consent-title" className="font-serif text-xl mb-3 text-background">
              Your Privacy
            </h3>
            <p className="font-sans text-[13px] leading-relaxed text-background/80 font-light">
              We use cookies to improve your experience and measure how our site is used.
              By clicking &quot;Accept All&quot;, you consent to our use of analytics cookies. You can choose &quot;Necessary Only&quot; if you prefer a minimal setup.
            </p>
            <p className="font-sans text-[12px] leading-relaxed text-background/70 font-light mt-3">
              Read more in our{" "}
              <Link href="/privacy" className="underline hover:text-background">
                privacy policy
              </Link>
              .
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              ref={acceptButtonRef}
              onClick={handleAccept}
              className="flex-1 bg-background text-foreground py-3 text-[10px] uppercase tracking-[0.25em] font-medium hover:bg-background/90 transition-colors"
            >
              Accept All
            </button>
            <button
              ref={declineButtonRef}
              onClick={handleDecline}
              className="flex-1 border border-background/30 text-background py-3 text-[10px] uppercase tracking-[0.25em] font-medium hover:bg-background/10 transition-colors"
            >
              Necessary Only
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
