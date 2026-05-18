"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { NAV_LINKS, SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

type NavDProps = {
  inline?: boolean;
  /** Force the menu open state for previews. */
  forceOpen?: boolean;
};

/**
 * NavD — Minimal default + full-screen overlay menu.
 *
 * Default state: just the logo, a single "Menu" button, and the primary CTA.
 * Click Menu → a full-screen dark overlay slides in with the nav links set in
 * editorial type, plus contact + social. Most minimal default state, biggest
 * gesture when invoked.
 */
export function NavD({ inline, forceOpen }: NavDProps) {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(forceOpen ?? false);
  const isOpen = forceOpen ?? open;

  return (
    <>
      <header
        className={cn(
          "z-40 border-b border-fl-line bg-fl-surface/90 backdrop-blur-md",
          inline ? "relative" : "fixed inset-x-0 top-0",
        )}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 md:px-10">
          <Link href="/" aria-label="Fiveleaf home" className="text-fl-ink">
            <Logo />
          </Link>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={isOpen}
              className="inline-flex items-center gap-2 rounded-full border border-fl-line bg-fl-surface-alt px-4 py-2 text-sm font-medium text-fl-ink transition-colors hover:bg-fl-line"
            >
              <Menu className="h-3.5 w-3.5" />
              Menu
            </button>
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

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="overlay"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "z-50 bg-fl-bg text-white",
              inline ? "absolute inset-0" : "fixed inset-0",
            )}
            role="dialog"
            aria-modal="true"
          >
            <div className="mx-auto flex h-full max-w-6xl flex-col px-6 py-6 md:px-10 md:py-8">
              <div className="flex items-center justify-between">
                <Logo className="text-white" />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white hover:bg-white/10"
                >
                  <X className="h-3.5 w-3.5" />
                  Close
                </button>
              </div>

              <nav
                aria-label="Mobile"
                className="mt-12 flex flex-1 flex-col justify-center"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">
                  Sections
                </p>
                <ul className="mt-4 space-y-1">
                  {NAV_LINKS.map((link, i) => (
                    <motion.li
                      key={link.href}
                      initial={reduce ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.04 * i, duration: 0.25 }}
                    >
                      <a
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="font-display group flex items-baseline gap-4 py-2 text-3xl font-semibold tracking-tight text-white/90 transition-colors hover:text-white md:text-5xl"
                      >
                        <span className="font-mono text-xs text-white/40">
                          0{i + 1}
                        </span>
                        <span className="border-b border-transparent group-hover:border-white">
                          {link.label}
                        </span>
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <div className="mt-10 grid gap-6 border-t border-white/10 pt-6 md:grid-cols-3">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">
                    Contact
                  </p>
                  <a
                    href={`mailto:${SITE.contactEmail}`}
                    className="mt-2 block text-sm text-white/80 hover:text-white"
                  >
                    {SITE.contactEmail}
                  </a>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">
                    Existing client
                  </p>
                  <a
                    href={SITE.dashboardUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1 text-sm text-white/80 hover:text-white"
                  >
                    Sign in to dashboard
                    <ArrowRight className="h-3 w-3" />
                  </a>
                </div>
                <div className="md:text-right">
                  <a
                    href={SITE.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-fl-ink hover:bg-white/90"
                  >
                    Book a discovery call
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
