"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Logo } from "@/components/brand/Logo";
import { NAV_LINKS, SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

type NavCProps = {
  inline?: boolean;
  /** Force an active link index for previews. */
  forceActive?: number;
};

/**
 * NavC — Wide nav with an animated active-section indicator.
 *
 * Looks like the current nav, but a soft pastel pill highlight glides under
 * the link of the section currently in view. The user always knows where they
 * are without scanning. The pill morphs between positions with a spring, which
 * makes the nav feel alive without being noisy.
 */
export function NavC({ inline, forceActive }: NavCProps) {
  const reduce = useReducedMotion();
  const [activeIdx, setActiveIdx] = useState<number>(forceActive ?? 0);
  const linkRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const [pillRect, setPillRect] = useState<{ left: number; width: number } | null>(
    null,
  );

  // Track which section is in view via IntersectionObserver.
  useEffect(() => {
    if (forceActive !== undefined) return;
    if (inline) return;
    const sectionIds = NAV_LINKS.map((l) => l.href.replace(/^#/, ""));
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = sectionIds.indexOf(entry.target.id);
            if (idx >= 0) setActiveIdx(idx);
          }
        }
      },
      { rootMargin: "-30% 0% -60% 0%", threshold: 0 },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [inline, forceActive]);

  // Re-measure the active link's position to size the pill.
  useEffect(() => {
    const link = linkRefs.current[activeIdx];
    if (!link) return;
    const parent = link.parentElement;
    if (!parent) return;
    const linkRect = link.getBoundingClientRect();
    const parentRect = parent.getBoundingClientRect();
    setPillRect({
      left: linkRect.left - parentRect.left,
      width: linkRect.width,
    });
  }, [activeIdx]);

  return (
    <header
      className={cn(
        "z-40 border-b border-fl-line bg-fl-surface/90 backdrop-blur-md",
        inline ? "relative" : "fixed inset-x-0 top-0",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-6 md:px-10">
        <Link href="/" aria-label="Fiveleaf home" className="text-fl-ink">
          <Logo />
        </Link>

        <nav
          aria-label="Primary"
          className="relative hidden items-center md:flex"
        >
          <AnimatePresence>
            {pillRect && (
              <motion.span
                aria-hidden="true"
                className="absolute top-1/2 -mt-3.5 h-7 rounded-full bg-fl-pastel-neutral"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  left: pillRect.left,
                  width: pillRect.width,
                }}
                exit={{ opacity: 0 }}
                transition={
                  reduce
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 400, damping: 32, mass: 0.6 }
                }
              />
            )}
          </AnimatePresence>
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              ref={(el) => {
                linkRefs.current[i] = el;
              }}
              onClick={() => setActiveIdx(i)}
              className={cn(
                "relative px-3.5 py-1.5 text-sm font-medium transition-colors",
                i === activeIdx ? "text-fl-ink" : "text-fl-ink-soft hover:text-fl-ink",
              )}
            >
              <span className="relative">{link.label}</span>
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={SITE.dashboardUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden text-sm text-fl-ink-soft hover:text-fl-ink md:inline"
          >
            Sign in
          </a>
          <a
            href={SITE.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full bg-fl-ink px-4 py-2 text-sm font-medium text-white hover:bg-fl-ink-soft"
          >
            Book a call
          </a>
        </div>
      </div>
    </header>
  );
}
