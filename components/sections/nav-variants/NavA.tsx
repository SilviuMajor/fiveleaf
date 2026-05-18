"use client";

import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { NAV_LINKS, SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

type NavAProps = {
  /** Layout-only render for previews. Disables sticky positioning. */
  inline?: boolean;
};

/**
 * NavA — Floating centered pill.
 *
 * Logo on the left, primary nav contained inside a soft pastel pill in the
 * centre, secondary CTAs on the right. The nav reads as a single deliberate
 * object rather than a row of bare links. Linear / Vercel adjacent.
 */
export function NavA({ inline }: NavAProps) {
  return (
    <header
      className={cn(
        "z-40 border-b border-fl-line bg-fl-surface/85 backdrop-blur-md",
        inline ? "relative" : "fixed inset-x-0 top-0",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-6 md:px-10">
        <Link href="/" aria-label="Fiveleaf home" className="text-fl-ink">
          <Logo />
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center rounded-full border border-fl-line bg-fl-pastel-neutral p-1 md:flex"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3.5 py-1.5 text-[13px] font-medium text-fl-ink-soft transition-colors hover:bg-white hover:text-fl-ink"
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
            className="hidden text-sm text-fl-ink-soft hover:text-fl-ink md:inline"
          >
            Sign in
          </a>
          <a
            href={SITE.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full bg-fl-ink px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-fl-ink-soft"
          >
            Book a call
          </a>
        </div>
      </div>
    </header>
  );
}
