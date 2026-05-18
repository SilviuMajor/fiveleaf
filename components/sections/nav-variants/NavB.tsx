"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Logo } from "@/components/brand/Logo";
import { NAV_LINKS, SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

type NavBProps = {
  inline?: boolean;
  /** Force a state for previews. */
  forceState?: "top" | "compact";
};

/**
 * NavB — Scroll-morph capsule.
 *
 * At the top of the page: a transparent full-width header that sits over the
 * dark hero. After ~120px of scroll, it morphs into a compact floating capsule
 * centred under the top edge of the viewport — logo + a few key links + the
 * CTA, all packed tight. Apple / Stripe adjacent.
 */
export function NavB({ inline, forceState }: NavBProps) {
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(forceState === "compact");

  useEffect(() => {
    if (forceState !== undefined) {
      setScrolled(forceState === "compact");
      return;
    }
    if (inline) return;
    const onScroll = () => setScrolled(window.scrollY > 120);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [inline, forceState]);

  return (
    <div
      className={cn(
        "z-40",
        inline ? "relative" : "fixed inset-x-0 top-0",
      )}
    >
      <motion.header
        layout={reduce ? false : true}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className={cn(
          "mx-auto flex items-center gap-3 transition-colors",
          scrolled
            ? "mt-3 w-fit rounded-full border border-fl-line bg-fl-surface/95 px-3 py-1.5 shadow-[0_8px_30px_-12px_rgba(15,17,21,0.25)] backdrop-blur-md"
            : "h-16 max-w-6xl justify-between bg-transparent px-6 md:px-10",
        )}
      >
        {scrolled ? (
          <>
            <Link href="/" aria-label="Fiveleaf home" className="text-fl-ink">
              <Logo />
            </Link>
            <span aria-hidden="true" className="h-4 w-px bg-fl-line" />
            <nav aria-label="Primary" className="hidden items-center md:flex">
              {NAV_LINKS.slice(0, 3).map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-full px-3 py-1 text-[12px] font-medium text-fl-ink-soft hover:text-fl-ink"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <a
              href={SITE.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full bg-fl-ink px-3.5 py-1 text-[12px] font-medium text-white"
            >
              Book a call
            </a>
          </>
        ) : (
          <>
            <Link href="/" aria-label="Fiveleaf home" className="text-white">
              <Logo />
            </Link>
            <nav
              aria-label="Primary"
              className="hidden items-center gap-7 md:flex"
            >
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/80 hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="flex items-center gap-3">
              <a
                href={SITE.dashboardUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden text-sm text-white/70 hover:text-white md:inline"
              >
                Sign in
              </a>
              <a
                href={SITE.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-medium text-fl-ink hover:bg-white/90"
              >
                Book a call
              </a>
            </div>
          </>
        )}
      </motion.header>
    </div>
  );
}
