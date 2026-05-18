"use client";

import type { ReactNode } from "react";
import { Logo } from "@/components/brand/Logo";
import { Pill } from "@/components/brand/Pill";
import { ProblemV1 } from "@/components/sections/problem-variants/ProblemV1";
import { ProblemV2 } from "@/components/sections/problem-variants/ProblemV2";
import { ProblemV3 } from "@/components/sections/problem-variants/ProblemV3";
import { ProblemV4 } from "@/components/sections/problem-variants/ProblemV4";
import { ProblemV5 } from "@/components/sections/problem-variants/ProblemV5";
import { PROBLEMS, PROBLEM_HEADER } from "@/components/sections/problem-variants/problems-data";

const VARIANTS = [
  {
    id: "v5",
    title: "V5. Dashed card with H2 + iconed 2×2",
    subtitle:
      "The shape Silv liked from the preview summary, brought up to a real section. Eyebrow pill outside; one dashed-bordered card carrying the H2 and the four problems together as one cohesive block. Each problem now has an icon tile to the left. Tighter than separate cards, but the outer dashed border still gives it presence.",
  },
  {
    id: "v1",
    title: "V1. 2×2 typographic grid",
    subtitle:
      "No cards, no boxes, no icons — just a 2×2 grid of bold display headlines with a body line each, separated by hairline dividers (vertical between columns, horizontal between rows). Most editorial of the four. Reads like a one-page list of facts.",
  },
  {
    id: "v2",
    title: "V2. 2×2 pastel-tinted cards",
    subtitle:
      "Each problem gets its own card with a subtle pastel wash and a small icon in the top-left. The four pastels rotate sand → sky → rose → sage so the four problems feel categorically distinct without using numbers. Softest, warmest of the four.",
  },
  {
    id: "v3",
    title: "V3. Editorial split rows",
    subtitle:
      "Four full-width rows. Bold display headline takes the left column (~40%), body takes the right column (~60%). Hairline dividers between rows. Reads as a magazine spread rather than a grid. Headlines feel large.",
  },
  {
    id: "v4",
    title: "V4. Symptom → consequence table",
    subtitle:
      "Two-column layout inside a single bordered card. Left column carries the short “what you’re seeing” symptom in mono-style, right column carries the consequence in prose. Lets the reader scan the four symptoms in three seconds, then linger on the prose if any of them land.",
  },
];

export default function ProblemPreview() {
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-fl-line bg-fl-surface/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4 md:px-10">
          <div className="flex items-center gap-3">
            <Logo />
            <Pill tone="neutral" uppercase>
              Preview · problem
            </Pill>
          </div>
          <nav aria-label="Variants" className="flex items-center gap-1.5 text-xs">
            {VARIANTS.map((v) => (
              <a
                key={v.id}
                href={`#problem-${v.id}`}
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
            The problem: four shapes, fresh copy.
          </h1>
          <p className="mt-5 max-w-2xl text-base text-fl-ink-soft md:text-lg">
            Four format options for the &ldquo;The problem&rdquo; section. All four use{" "}
            <strong>the same fresh copy</strong>, four problems each, no numbered
            markers, leaning toward 2&rsquo;s in the layout per Silv&rsquo;s
            preference. The shared copy is shown in the panel below so we can talk
            about format and copy independently.
          </p>

          {/* The shared copy on display, separate from any variant */}
          <div className="mt-10 rounded-2xl border border-dashed border-fl-line bg-fl-surface-alt p-6 md:p-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-fl-muted">
              Shared copy across all four variants
            </p>
            <p className="font-display mt-3 text-balance text-2xl font-semibold leading-tight tracking-tight text-fl-ink md:text-3xl">
              {PROBLEM_HEADER.h2}
            </p>
            <ul className="mt-6 grid gap-4 md:grid-cols-2 md:gap-x-10 md:gap-y-5">
              {PROBLEMS.map((p) => (
                <li key={p.title}>
                  <p className="font-display text-base font-semibold tracking-tight text-fl-ink md:text-lg">
                    {p.title}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-fl-ink-soft">
                    {p.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <Banner index={0} title={VARIANTS[0].title} subtitle={VARIANTS[0].subtitle} id="problem-v5" />
        <Frame>
          <ProblemV5 />
        </Frame>

        <Banner index={1} title={VARIANTS[1].title} subtitle={VARIANTS[1].subtitle} id="problem-v1" />
        <Frame>
          <ProblemV1 />
        </Frame>

        <Banner index={2} title={VARIANTS[2].title} subtitle={VARIANTS[2].subtitle} id="problem-v2" />
        <Frame>
          <ProblemV2 />
        </Frame>

        <Banner index={3} title={VARIANTS[3].title} subtitle={VARIANTS[3].subtitle} id="problem-v3" />
        <Frame>
          <ProblemV3 />
        </Frame>

        <Banner index={4} title={VARIANTS[4].title} subtitle={VARIANTS[4].subtitle} id="problem-v4" />
        <Frame>
          <ProblemV4 />
        </Frame>

        <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-fl-muted">
            Notes
          </p>
          <p className="mt-3 max-w-2xl text-sm text-fl-ink-soft">
            Once you pick a format (and tweak the copy if needed), the chosen
            variant replaces{" "}
            <code className="rounded bg-fl-surface-alt px-1.5 py-0.5 text-xs">
              components/sections/Problem.tsx
            </code>{" "}
            on the live homepage and the new copy gets folded into{" "}
            <code className="rounded bg-fl-surface-alt px-1.5 py-0.5 text-xs">
              content/sections.ts
            </code>{" "}
            (or kept inline, depending on the variant).
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
    <section id={id} className="border-y border-fl-line bg-fl-bg text-white scroll-mt-24">
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
