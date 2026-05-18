"use client";

import type { ReactNode } from "react";
import { Logo } from "@/components/brand/Logo";
import { Pill } from "@/components/brand/Pill";
import { NavA } from "@/components/sections/nav-variants/NavA";
import { NavB } from "@/components/sections/nav-variants/NavB";
import { NavC } from "@/components/sections/nav-variants/NavC";
import { NavD } from "@/components/sections/nav-variants/NavD";

const VARIANTS = [
  {
    id: "a",
    title: "Nav A. Floating centered pill",
    subtitle:
      "Logo on the left, primary nav contained in a soft pastel pill in the centre, CTAs on the right. The nav reads as one deliberate object rather than a row of bare links. Most refined of the bunch — Linear / Vercel adjacent.",
  },
  {
    id: "b",
    title: "Nav B. Scroll-morph capsule",
    subtitle:
      "Transparent full-width header at the top of the page sitting over the dark hero. After ~120px of scroll it morphs into a compact floating capsule centred under the top edge — logo, three key links, the CTA, all packed tight. Apple / Stripe adjacent.",
  },
  {
    id: "c",
    title: "Nav C. Animated active-section indicator",
    subtitle:
      "Wide nav like the current one, but a soft pastel pill glides under the link of the section currently in view (driven by IntersectionObserver). User always knows where they are without scanning. Pill morphs with a spring — feels alive without being noisy.",
  },
  {
    id: "d",
    title: "Nav D. Minimal + full-screen overlay menu",
    subtitle:
      "Default state strips down to logo + Menu + CTA. Tapping Menu drops a full-screen dark overlay with the section list set in editorial display type, plus contact and the CTA. Most minimal default, biggest gesture when invoked.",
  },
];

export default function NavPreview() {
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-fl-line bg-fl-surface/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4 md:px-10">
          <div className="flex items-center gap-3">
            <Logo />
            <Pill tone="neutral" uppercase>
              Preview · nav
            </Pill>
          </div>
          <nav aria-label="Variants" className="flex items-center gap-1.5 text-xs">
            {VARIANTS.map((v) => (
              <a
                key={v.id}
                href={`#nav-${v.id}`}
                className="rounded-full border border-fl-line bg-fl-surface-alt px-3 py-1.5 font-mono uppercase tracking-[0.14em] text-fl-ink-soft hover:bg-fl-line"
              >
                {v.id}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main className="bg-fl-surface">
        <section className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-20">
          <Pill tone="neutral" uppercase>
            Internal review
          </Pill>
          <h1 className="font-display mt-5 max-w-3xl text-balance text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
            Nav: four directions.
          </h1>
          <p className="mt-5 max-w-2xl text-base text-fl-ink-soft md:text-lg">
            Four refinements of the current navbar. Each one is shown in a fake browser frame
            so you can see the layout in context without actually replacing the live nav. Where
            the variant has a scroll state or an interactive overlay, both states are shown
            (or interactive in place).
          </p>
        </section>

        <SectionBanner index={0} title={VARIANTS[0].title} subtitle={VARIANTS[0].subtitle} id="nav-a" />
        <FrameSection>
          <Frame label="At rest" tone="dark">
            <NavA inline />
            <FrameContent variant="dark" />
          </Frame>
        </FrameSection>

        <SectionBanner index={1} title={VARIANTS[1].title} subtitle={VARIANTS[1].subtitle} id="nav-b" />
        <FrameSection>
          <div className="grid gap-6 lg:grid-cols-2">
            <Frame label="At top of page" tone="dark">
              <NavB inline forceState="top" />
              <FrameContent variant="dark" />
            </Frame>
            <Frame label="After scroll · capsule" tone="dark">
              <NavB inline forceState="compact" />
              <FrameContent variant="dark" />
            </Frame>
          </div>
        </FrameSection>

        <SectionBanner index={2} title={VARIANTS[2].title} subtitle={VARIANTS[2].subtitle} id="nav-c" />
        <FrameSection>
          <div className="grid gap-6 lg:grid-cols-3">
            <Frame label="Active: Services" tone="light">
              <NavC inline forceActive={0} />
              <FrameContent variant="light" />
            </Frame>
            <Frame label="Active: Departments" tone="light">
              <NavC inline forceActive={1} />
              <FrameContent variant="light" />
            </Frame>
            <Frame label="Active: How it works" tone="light">
              <NavC inline forceActive={3} />
              <FrameContent variant="light" />
            </Frame>
          </div>
          <p className="mt-6 max-w-2xl text-sm text-fl-ink-soft">
            On the live site the active link is driven by an IntersectionObserver tracking the
            section in view. The pill animates between positions with a spring.
          </p>
        </FrameSection>

        <SectionBanner index={3} title={VARIANTS[3].title} subtitle={VARIANTS[3].subtitle} id="nav-d" />
        <FrameSection>
          <div className="grid gap-6 lg:grid-cols-2">
            <Frame label="Default" tone="light">
              <NavD inline />
              <FrameContent variant="light" />
            </Frame>
            <Frame label="Menu open" tone="light" overlay>
              <NavD inline forceOpen />
            </Frame>
          </div>
          <p className="mt-6 max-w-2xl text-sm text-fl-ink-soft">
            Click the Menu button in the &ldquo;Default&rdquo; frame to open it inline. The
            right frame is forced open so you can see the full overlay treatment.
          </p>
        </FrameSection>

        <section className="border-t border-fl-line bg-fl-bg py-16 text-white">
          <div className="mx-auto max-w-3xl px-6 text-center md:px-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/60">
              Pick one
            </p>
            <p className="mt-3 text-lg text-white/85 md:text-xl">
              Reply with Nav A, B, C or D, or describe a hybrid.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}

function SectionBanner({
  index,
  title,
  subtitle,
  id,
}: {
  index: number;
  title: string;
  subtitle: string;
  id: string;
}) {
  return (
    <div id={id} className="scroll-mt-20 border-y border-white/10 bg-fl-bg text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-10 md:flex-row md:items-center md:justify-between md:gap-10 md:px-10">
        <div className="flex items-center gap-4">
          <span className="font-mono text-3xl font-semibold tracking-tight text-white/40">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h2 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
            {title}
          </h2>
        </div>
        <p className="max-w-xl text-sm text-white/65 md:text-base">{subtitle}</p>
      </div>
    </div>
  );
}

function FrameSection({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12 md:px-10 md:py-16">{children}</div>
  );
}

function Frame({
  label,
  tone,
  overlay,
  children,
}: {
  label: string;
  tone: "light" | "dark";
  overlay?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-fl-line bg-fl-surface shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
      {/* Browser chrome */}
      <div className="flex items-center justify-between gap-3 border-b border-fl-line bg-fl-pastel-neutral px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="block h-2.5 w-2.5 rounded-full bg-fl-pastel-rose" />
          <span className="block h-2.5 w-2.5 rounded-full bg-fl-pastel-sand" />
          <span className="block h-2.5 w-2.5 rounded-full bg-fl-pastel-sage" />
        </div>
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-fl-muted">
          fiveleaf.co.uk &middot; {label}
        </p>
        <span className="block h-2.5 w-12" aria-hidden="true" />
      </div>

      <div
        className={`relative h-[420px] overflow-hidden ${tone === "dark" ? "bg-fl-bg" : "bg-fl-surface"}`}
      >
        {overlay ? (
          <div className="absolute inset-0">{children}</div>
        ) : (
          children
        )}
      </div>
    </div>
  );
}

function FrameContent({ variant }: { variant: "dark" | "light" }) {
  if (variant === "dark") {
    return (
      <div className="px-6 pt-12 md:px-10 md:pt-14">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">
          Hero placeholder
        </p>
        <p className="font-display mt-3 max-w-md text-3xl font-semibold leading-[1.05] tracking-tight text-white/85">
          We build AI agents that run inside your business.
        </p>
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>
    );
  }
  return (
    <div className="px-6 pt-12 md:px-10 md:pt-14">
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-fl-muted">
        Hero placeholder
      </p>
      <p className="font-display mt-3 max-w-md text-3xl font-semibold leading-[1.05] tracking-tight text-fl-ink">
        We build AI agents that run inside your business.
      </p>
    </div>
  );
}
