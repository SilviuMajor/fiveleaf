"use client";

import type { ReactNode } from "react";
import { Logo } from "@/components/brand/Logo";
import { Pill } from "@/components/brand/Pill";
import { WedgeV1 } from "@/components/sections/wedge-variants/WedgeV1";
import { WedgeV2 } from "@/components/sections/wedge-variants/WedgeV2";
import { WedgeV3 } from "@/components/sections/wedge-variants/WedgeV3";
import { WedgeV4 } from "@/components/sections/wedge-variants/WedgeV4";

const VARIANTS = [
  {
    id: "v1",
    title: "V1. Three-card row, Fiveleaf hero",
    subtitle:
      "The current backbone, but cut to one card per option. Each card carries a one-line tagline and three short bullets. Fiveleaf is the middle column on full-saturation sage with a subtle ring; DIY and Consultancies recede on /70 pastels. Reads top-to-bottom and left-to-right. Loses no information; cuts roughly half the body text.",
  },
  {
    id: "v2",
    title: "V2. 2×2 quadrant matrix",
    subtitle:
      "Plots the three options on a Cost × Effort matrix. DIY is bottom-left (cheap but you operate). Consultancies are top-right (expensive but done for you). Fiveleaf sits in the bottom-right corner — done for you AND affordable — visually distinct as the only option in that quadrant. The empty top-left is intentionally hollow with a 'NOBODY LIVES HERE' annotation. Most distinctive of the four, but takes a moment to read.",
  },
  {
    id: "v3",
    title: "V3. Stripped 3-row table",
    subtitle:
      "Same comparison-table backbone as the live version but cut from 5 rows to 3 (What you get / Cost / Run by). Verdict captions removed. Cleanest, fastest read of the four. Lowest cognitive load for a buyer who already knows the categories.",
  },
  {
    id: "v4",
    title: "V4. Editorial pull-quote + chips",
    subtitle:
      "Most concise — and most opinionated. A big editorial sentence carries the entire commercial argument: 'The first option needs a team. The second needs twelve months. We do it in eight weeks for the cost of one hire.' Three short labelled chips beneath name the options. No table, no comparison. Best for high-confidence buyers who don't need the comparison spelled out — most aggressive copy treatment.",
  },
];

export default function WedgePreview() {
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-fl-line bg-fl-surface/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4 md:px-10">
          <div className="flex items-center gap-3">
            <Logo />
            <Pill tone="neutral" uppercase>
              Preview · wedge
            </Pill>
          </div>
          <nav aria-label="Variants" className="flex items-center gap-1.5 text-xs">
            {VARIANTS.map((v) => (
              <a
                key={v.id}
                href={`#wedge-${v.id}`}
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
            Why we exist: four shapes.
          </h1>
          <p className="mt-5 max-w-2xl text-base text-fl-ink-soft md:text-lg">
            Same argument (DIY vs consultancies vs Fiveleaf) rendered four different
            ways. Goal: pick whichever shape carries the case in the fewest words while
            still planting the wedge clearly. All four are mobile-friendly.
          </p>
        </section>

        <Banner index={0} title={VARIANTS[0].title} subtitle={VARIANTS[0].subtitle} id="wedge-v1" />
        <Frame>
          <WedgeV1 />
        </Frame>

        <Banner index={1} title={VARIANTS[1].title} subtitle={VARIANTS[1].subtitle} id="wedge-v2" />
        <Frame>
          <WedgeV2 />
        </Frame>

        <Banner index={2} title={VARIANTS[2].title} subtitle={VARIANTS[2].subtitle} id="wedge-v3" />
        <Frame>
          <WedgeV3 />
        </Frame>

        <Banner index={3} title={VARIANTS[3].title} subtitle={VARIANTS[3].subtitle} id="wedge-v4" />
        <Frame>
          <WedgeV4 />
        </Frame>

        <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-fl-muted">
            Notes
          </p>
          <p className="mt-3 max-w-2xl text-sm text-fl-ink-soft">
            Once you pick one, the chosen variant replaces{" "}
            <code className="rounded bg-fl-surface-alt px-1.5 py-0.5 text-xs">
              components/sections/Wedge.tsx
            </code>{" "}
            in the live homepage. The other three stay around in the variants folder for
            future iteration.
          </p>
        </div>
      </main>
    </>
  );
}

function Banner({
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
    <section
      id={id}
      className="border-y border-fl-line bg-fl-bg text-white scroll-mt-24"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-10 md:flex-row md:items-end md:justify-between md:gap-10 md:px-10 md:py-14">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/55">
            Variant {String(index + 1).padStart(2, "0")} / {VARIANTS.length}
          </p>
          <h2 className="font-display mt-2 text-balance text-2xl font-semibold leading-tight tracking-tight md:text-4xl">
            {title}
          </h2>
        </div>
        <p className="max-w-xl text-sm text-white/70 md:text-base">{subtitle}</p>
      </div>
    </section>
  );
}

function Frame({ children }: { children: ReactNode }) {
  return (
    <div className="relative bg-fl-surface-alt py-10 md:py-14">
      <div className="mx-auto max-w-7xl px-3 md:px-6">
        <div className="overflow-hidden rounded-2xl border border-fl-line bg-fl-surface shadow-sm">
          {children}
        </div>
      </div>
    </div>
  );
}
