"use client";

import type { ReactNode } from "react";
import { Logo } from "@/components/brand/Logo";
import { Pill } from "@/components/brand/Pill";
import { AgentsV1 } from "@/components/sections/agents-variants/AgentsV1";
import { AgentsV2 } from "@/components/sections/agents-variants/AgentsV2";
import { AgentsV3 } from "@/components/sections/agents-variants/AgentsV3";
import { AgentsV4 } from "@/components/sections/agents-variants/AgentsV4";
import { AgentTrace } from "@/components/sections/agents-variants/AgentTrace";
import { AgentTraceCondensed } from "@/components/sections/agents-variants/AgentTraceCondensed";
import { AgentTraceInteractive } from "@/components/sections/agents-variants/AgentTraceInteractive";
import {
  billScenario,
  renewalScenario,
  salesScenario,
} from "@/components/sections/agents-variants/scenarios";

const VARIANTS = [
  {
    id: "v7",
    title: "V7. Condensed · single rich panel",
    subtitle:
      "The four-stage cards collapse into one chat-style panel. Inbound bubble at the top, an inline 'Inside the agent' trace in the middle (4 stage dots, branches as compact chips), outbound bubble below, then outcomes and resolution. A short paragraph + three benefit tiles sit underneath, plus an arrow CTA into the lanes. Same scenario data as V5/V6, much shorter section. Cross-fades on pill change.",
  },
  {
    id: "v5",
    title: "V5. Interactive · cross-fade swap",
    subtitle:
      "One trace, five category pills (Sales / Retentions / Renewal / Billing / Support). Closed on first paint — only the four step headers visible. Click a pill: message bubble + branches + reply panel fade in (~250ms). Click another: content cross-fades in place. Snappiest version, lets the reader compare cases by clicking through quickly.",
  },
  {
    id: "v6",
    title: "V6. Interactive · collapse → re-expand",
    subtitle:
      "Same component, same data, different transition. On every pill click the existing content fades out, then the trace rebuilds itself stage by stage (each step delayed ~100ms after the previous), with the reply panel appearing last. ~700-900ms total per swap. Reads like 'the agent is thinking through the case'.",
  },
  {
    id: "v1",
    title: "V1. Subway rail with branching arms",
    subtitle:
      "A vertical rail with four numbered stations. Each station extends a horizontal arm to the right showing the systems that stage actually talks to. Kept here for future reference.",
  },
  {
    id: "v2",
    title: "V2. Pseudocode in an editor frame",
    subtitle:
      "The pipeline rendered as a function, in a faux code editor. Brand glyphs render as inline coloured chips inside the source. Kept here for future reference.",
  },
  {
    id: "v3",
    title: "V3. Horizontal pipeline with stacked tech",
    subtitle:
      "Same four-stage backbone as the live version, but each card now carries a 'Talks to' grid of brand chips at the bottom. Kept here for future reference per Silv's request.",
  },
  {
    id: "v4",
    title: "V4. Live trace — cancellation → retention",
    subtitle:
      "The static V4. Single scenario rendered top-to-bottom: header, customer message hero on the right, vertical trace below. Same backbone the interactive V5/V6 are built on, kept here so you can compare static vs. interactive at a glance.",
  },
];

const SCENARIOS = [
  {
    id: "sales",
    title: "Scenario · sales lead",
    subtitle:
      "Anonymous prospect drops in on web chat asking about coverage. Agent confirms gigabit availability, leads with the current promo, hands a qualified lead to HubSpot and pings the on-duty rep in Slack. Doesn't quote a final price.",
    component: salesScenario,
  },
  {
    id: "renewal",
    title: "Scenario · renewal upsell",
    subtitle:
      "Existing customer messages two weeks before contract end. Agent lays out both options (stay flat vs upgrade at same price), queues a 7-day follow-up, never auto-renews.",
    component: renewalScenario,
  },
  {
    id: "billing",
    title: "Scenario · bill query",
    subtitle:
      "Customer emails asking why this month's bill is higher. Agent itemises the difference (install fee + pro-rata switch), sends an itemised receipt via Stripe, doesn't refund anything unilaterally.",
    component: billScenario,
  },
];

export default function AgentsPreview() {
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-fl-line bg-fl-surface/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4 md:px-10">
          <div className="flex items-center gap-3">
            <Logo />
            <Pill tone="neutral" uppercase>
              Preview · agents
            </Pill>
          </div>
          <nav
            aria-label="Variants"
            className="flex items-center gap-1.5 text-xs"
          >
            {VARIANTS.map((v) => (
              <a
                key={v.id}
                href={`#agents-${v.id}`}
                className="rounded-full border border-fl-line bg-fl-surface-alt px-3 py-1.5 font-mono uppercase tracking-[0.14em] text-fl-ink-soft hover:bg-fl-line"
              >
                {v.id}
              </a>
            ))}
            {SCENARIOS.map((s) => (
              <a
                key={s.id}
                href={`#scenario-${s.id}`}
                className="rounded-full border border-fl-line bg-fl-surface-alt px-3 py-1.5 font-mono uppercase tracking-[0.14em] text-fl-ink-soft hover:bg-fl-line"
              >
                {s.id}
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
            AI agents in plain English: shapes &amp; scenarios.
          </h1>
          <p className="mt-5 max-w-2xl text-base text-fl-ink-soft md:text-lg">
            Top of page: V7, the new condensed direction — the four stage cards
            collapse into one chat-style panel with the trace inline, plus a
            paragraph + benefit tiles below. Then V5 and V6 (the previous
            interactive direction with the trace as a separate flow). Then
            V1–V4 (the original shape mocks). Bottom: the same V4 backbone
            replayed across three more static scenarios for breadth.
          </p>
        </section>

        {/* New condensed variant — V7 */}
        <Banner
          index={0}
          title={VARIANTS[0].title}
          subtitle={VARIANTS[0].subtitle}
          id="agents-v7"
        />
        <Frame>
          <AgentTraceCondensed
            h2="Watch the agent run a real case."
            sub="Pick a case. The agent reads the message, pulls the context it needs, decides the next move, and closes the loop. Same backbone, different jobs."
          />
        </Frame>

        {/* Interactive variants — V5 (crossfade) and V6 (collapse) */}
        <Banner
          index={1}
          title={VARIANTS[1].title}
          subtitle={VARIANTS[1].subtitle}
          id="agents-v5"
        />
        <Frame>
          <AgentTraceInteractive
            mode="crossfade"
            h2="Watch the agent run a real case."
            sub="Pick a category. Same loop, different jobs. Cross-fade swap when you switch."
          />
        </Frame>

        <Banner
          index={2}
          title={VARIANTS[2].title}
          subtitle={VARIANTS[2].subtitle}
          id="agents-v6"
        />
        <Frame>
          <AgentTraceInteractive
            mode="collapse"
            h2="Watch the agent run a real case."
            sub="Pick a category. Same loop, different jobs. The trace rebuilds itself stage by stage."
          />
        </Frame>

        {/* Original variants */}
        <Banner
          index={3}
          title={VARIANTS[3].title}
          subtitle={VARIANTS[3].subtitle}
          id="agents-v1"
        />
        <Frame>
          <AgentsV1 />
        </Frame>

        <Banner
          index={4}
          title={VARIANTS[4].title}
          subtitle={VARIANTS[4].subtitle}
          id="agents-v2"
        />
        <Frame>
          <AgentsV2 />
        </Frame>

        <Banner
          index={5}
          title={VARIANTS[5].title}
          subtitle={VARIANTS[5].subtitle}
          id="agents-v3"
        />
        <Frame>
          <AgentsV3 />
        </Frame>

        <Banner
          index={6}
          title={VARIANTS[6].title}
          subtitle={VARIANTS[6].subtitle}
          id="agents-v4"
        />
        <Frame>
          <AgentsV4 />
        </Frame>

        {/* Section divider into scenario set */}
        <section className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-20">
          <Pill tone="neutral" uppercase>
            More scenarios
          </Pill>
          <h2 className="font-display mt-5 max-w-3xl text-balance text-3xl font-semibold leading-[1.05] tracking-tight md:text-5xl">
            Same pattern, four very different jobs.
          </h2>
          <p className="mt-5 max-w-2xl text-base text-fl-ink-soft md:text-lg">
            V4 above shows the cancellation/retention case. The three below
            replay the same trace pattern for an inbound sales lead, a renewal
            cycle, and a billing query. Together they cover most of the
            customer lifecycle without changing the visual backbone.
          </p>
        </section>

        {SCENARIOS.map((s, i) => (
          <ScenarioBlock key={s.id} index={i} scenario={s} />
        ))}

        <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-fl-muted">
            Notes
          </p>
          <p className="mt-3 max-w-2xl text-sm text-fl-ink-soft">
            All scenarios share the same{" "}
            <code className="rounded bg-fl-surface-alt px-1.5 py-0.5 text-xs">
              AgentTrace
            </code>{" "}
            component; only the data changes. Once V4 is locked in, swapping
            scenarios on the homepage is one prop change. Could even rotate
            scenarios in production with a small client-side cycler.
          </p>
        </div>
      </main>
    </>
  );
}

function ScenarioBlock({
  index,
  scenario,
}: {
  index: number;
  scenario: (typeof SCENARIOS)[number];
}) {
  return (
    <>
      <Banner
        index={VARIANTS.length + index}
        title={scenario.title}
        subtitle={scenario.subtitle}
        id={`scenario-${scenario.id}`}
      />
      <Frame>
        <AgentTrace scenario={scenario.component} />
      </Frame>
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
            Block {String(index + 1).padStart(2, "0")}
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
