"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { NAV_LINKS, SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Nav — production header.
 *
 * Desktop (md+): wide nav with the Fiveleaf full lockup on the left, links in
 * the centre/right, "Sign in" + "Book a call" CTAs on the right. Sticky to
 * the top of the page. On scroll past the hero, gains a translucent surface
 * with light shadow.
 *
 * Mobile (<md): minimal — full lockup + a single "Menu" button + Book a call.
 * Tapping Menu drops a full-screen dark overlay (NavD-style) with the section
 * list set in editorial display type, plus contact + dashboard sign-in.
 *
 * Compact h-14 (was h-16) so the nav doesn't dominate the hero.
 */
export function Nav() {
  const reduce = useReducedMotion();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // The transparent-over-hero treatment (white logo + links on no
  // background) only reads on the dark Hero section. On non-homepage
  // routes the page background is light (bg-fl-surface), so a
  // transparent nav with white text becomes invisible against the
  // page. Force the solid/dark variant from the first render whenever
  // we're not on '/' so the logo and links are visible immediately.
  const isHome = pathname === "/";
  const solid = !isHome || scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock background scroll while the mobile overlay is open.
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-all duration-200",
          solid
            ? "bg-fl-surface/92 shadow-[0_1px_0_rgba(15,17,21,0.06)]"
            : "bg-transparent",
        )}
      >
        <div
          className={cn(
            "mx-auto flex h-14 max-w-6xl items-center justify-between gap-6 px-6 transition-colors md:px-10",
            solid ? "text-fl-ink" : "text-white",
          )}
        >
          <Link href="/" aria-label="Fiveleaf home" className="flex items-center">
            <Logo size="sm" />
          </Link>

          {/* Desktop: full inline nav + Sign in + Book a call */}
          <nav
            aria-label="Primary"
            className="hidden lg:flex items-center gap-5"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm opacity-80 hover:opacity-100 transition-opacity"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <a
              href={SITE.dashboardUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                solid
                  ? "border-fl-line text-fl-ink hover:bg-fl-surface-alt"
                  : "border-white/30 text-white hover:bg-white/10",
              )}
            >
              Sign in
            </a>
            <a
              href={SITE.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                solid
                  ? "bg-fl-ink text-white hover:bg-fl-ink-soft"
                  : "bg-white text-fl-ink hover:bg-white/90",
              )}
            >
              Book a call
            </a>
          </div>

          {/* Mobile: Menu + Book a call */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={SITE.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex items-center rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                solid
                  ? "bg-fl-ink text-white"
                  : "bg-white text-fl-ink",
              )}
            >
              Book a call
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className={cn(
                "inline-flex h-9 items-center gap-1.5 rounded-full border px-3 text-xs font-medium transition-colors",
                solid
                  ? "border-fl-line bg-fl-surface-alt text-fl-ink hover:bg-fl-line"
                  : "border-white/20 bg-white/10 text-white hover:bg-white/15",
              )}
            >
              <Menu className="h-3.5 w-3.5" />
              Menu
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay (D-style) */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="overlay"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-fl-bg text-white lg:hidden"
            role="dialog"
            aria-modal="true"
          >
            <div className="mx-auto flex h-full max-w-6xl flex-col px-6 py-5">
              <div className="flex items-center justify-between">
                <Logo className="text-white" />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="inline-flex h-9 items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 text-xs font-medium text-white hover:bg-white/10"
                >
                  <X className="h-3.5 w-3.5" />
                  Close
                </button>
              </div>

              <nav
                aria-label="Mobile"
                className="mt-10 flex flex-1 flex-col justify-center"
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
                        className="font-display group flex items-baseline gap-4 py-2 text-3xl font-semibold tracking-tight text-white/90 transition-colors hover:text-white"
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

              <div className="mt-8 grid gap-5 border-t border-white/10 pt-5">
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
                <a
                  href={SITE.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-fl-ink hover:bg-white/90"
                >
                  Book a discovery call
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
