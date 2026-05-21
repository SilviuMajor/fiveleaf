import type { CSSProperties, ReactNode } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Newsreader } from "next/font/google";
import { Logo } from "@/components/brand/Logo";
import { Pill } from "@/components/brand/Pill";

/**
 * /preview/type — type-system preview.
 *
 * Loads Newsreader via next/font scoped to this page only, so the live
 * homepage keeps its current Inter / Inter Tight setup until Silv signs
 * off the swap. Each sample shows a real live headline:
 *
 *   TOP:    current — Inter 600, "font-display" utility kerning.
 *   BOTTOM: proposed — Newsreader 400, italic on the suggested emphasis
 *           word. Per the brand note: never bold, weight 500 max for
 *           sub-heads, italic carries emphasis.
 *
 * If Silv approves: roll out by swapping the next/font import in
 * app/layout.tsx, repointing the .font-display utility, and stripping
 * `font-semibold` from the ~51 headlines that currently use it.
 */

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-display-preview",
});

export const metadata: Metadata = {
  title: "Type system preview",
  robots: { index: false, follow: false, nocache: true },
};

// Style tokens for the proposed system. Inline rather than in the
// global stylesheet so they stay scoped to this preview page.
const NEW_DISPLAY: CSSProperties = {
  fontFamily:
    'var(--font-display-preview), Georgia, "Times New Roman", serif',
  fontWeight: 400,
  letterSpacing: "-0.015em",
  lineHeight: 1.02,
};
const NEW_SUBHEAD: CSSProperties = { ...NEW_DISPLAY, fontWeight: 500 };
const NEW_BODY: CSSProperties = {
  fontFamily: "var(--font-sans), system-ui, sans-serif",
  fontFeatureSettings: "'cv11', 'ss01'",
  letterSpacing: "-0.005em",
  lineHeight: 1.55,
};

export default function TypePreviewPage() {
  return (
    <main className={`${newsreader.variable} bg-fl-surface text-fl-ink`}>
      <header className="sticky top-0 z-50 border-b border-fl-line bg-fl-surface/92">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4 md:px-10">
          <div className="flex items-center gap-3">
            <Logo />
            <Pill tone="neutral" uppercase>
              Preview · type
            </Pill>
          </div>
          <Link
            href="/"
            className="font-mono text-xs uppercase tracking-[0.18em] text-fl-ink-soft hover:text-fl-ink"
          >
            &larr; Live site
          </Link>
        </div>
      </header>

      {/* Intro */}
      <section className="mx-auto max-w-5xl px-6 py-16 md:px-10 md:py-24">
        <Pill tone="neutral" uppercase>
          Type system preview
        </Pill>
        <h1
          className="mt-5 text-balance text-5xl md:text-7xl"
          style={NEW_DISPLAY}
        >
          The new headline <em>voice</em>.
        </h1>
        <p
          className="mt-7 max-w-2xl text-base md:text-lg text-fl-ink-soft"
          style={NEW_BODY}
        >
          Newsreader for display, Inter for body. Four-hundred weight, italic
          for emphasis, never bold. Each block below shows a live headline
          rendered both ways: current Inter 600 on top, proposed Newsreader
          400 underneath, with one word italicised as a suggestion. Tell me
          which italic choices to keep, which to move, and which to drop.
        </p>
      </section>

      {/* Hero H1 — dark band */}
      <SampleBlock id="01" label="Hero · H1" dark>
        <Old className="text-4xl md:text-6xl">
          We build AI agents that run inside your business. Not tools you have
          to learn.
        </Old>
        <New className="text-4xl md:text-6xl">
          We build AI agents that run <em>inside</em> your business. Not tools
          you have to learn.
        </New>
        <Note dark>
          Italic on <em>inside</em>. Alternative: italicise the whole second
          sentence as a punchline (&ldquo;Not tools you have to learn&rdquo;).
          Show me which lands and I&rsquo;ll lock it in.
        </Note>
      </SampleBlock>

      {/* Agents H2 */}
      <SampleBlock id="02" label="Agents explainer · H2">
        <Old className="text-3xl md:text-5xl">
          Watch the agent run a real case.
        </Old>
        <New className="text-3xl md:text-5xl">
          Watch the agent run a <em>real</em> case.
        </New>
        <Note>
          Italic on <em>real</em>. Reads as the editorial pull-quote it&rsquo;s
          meant to be.
        </Note>
      </SampleBlock>

      {/* Handover H2 */}
      <SampleBlock id="03" label="Handover · H2">
        <Old className="text-3xl md:text-5xl">
          Handover any conversation, fully briefed.
        </Old>
        <New className="text-3xl md:text-5xl">
          Handover any conversation, <em>fully briefed</em>.
        </New>
        <Note>
          Italic on the post-comma clause. Italic phrases (rather than single
          words) suit promise/credential type lines.
        </Note>
      </SampleBlock>

      {/* Departments H2 */}
      <SampleBlock id="04" label="Departments · H2">
        <Old className="text-3xl md:text-5xl">
          Providing AI enhancements for every team that touches the customer.
        </Old>
        <New className="text-3xl md:text-5xl">
          Providing AI enhancements for <em>every</em> team that touches the
          customer.
        </New>
        <Note>
          Italic on <em>every</em>, the universality claim. Could also do
          &ldquo;touches&rdquo; if you want the human-contact angle to lead.
        </Note>
      </SampleBlock>

      {/* WhyFiveleaf H2 — dark band */}
      <SampleBlock id="05" label="Why Fiveleaf · H2" dark>
        <Old className="text-3xl md:text-5xl">
          Built like an in-house team. Without the hiring.
        </Old>
        <New className="text-3xl md:text-5xl">
          Built like an in-house team. <em>Without the hiring.</em>
        </New>
        <Note dark>Italic on the second-sentence punchline.</Note>
      </SampleBlock>

      {/* HowItWorks H2 */}
      <SampleBlock id="06" label="How it works · H2">
        <Old className="text-3xl md:text-5xl">
          Five steps from first call to live agent.
        </Old>
        <New className="text-3xl md:text-5xl">
          Five steps from first call to <em>live</em> agent.
        </New>
        <Note>
          Italic on <em>live</em>. That&rsquo;s the section&rsquo;s whole
          promise.
        </Note>
      </SampleBlock>

      {/* BookingEmbed H2 — dark */}
      <SampleBlock id="07" label="Book a call · H2" dark>
        <Old className="text-3xl md:text-5xl">
          Stop adding seats. Start adding capacity.
        </Old>
        <New className="text-3xl md:text-5xl">
          Stop adding seats. Start adding <em>capacity</em>.
        </New>
        <Note dark>
          Italic on the substitute. Pairs the parallel sentences without
          shouting.
        </Note>
      </SampleBlock>

      {/* Body / Inter cv11 + ss01 sample */}
      <section className="border-y border-fl-line bg-fl-surface-alt">
        <div className="mx-auto max-w-5xl px-6 py-16 md:px-10 md:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-fl-muted">
            Sample 08 · Body paragraph &middot; Inter with cv11 + ss01
          </p>
          <h2 className="mt-3 text-2xl md:text-3xl" style={NEW_SUBHEAD}>
            What body copy looks like at <em>reading scale</em>.
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2 md:gap-10">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-fl-muted">
                Current &middot; Inter default
              </p>
              <p className="mt-3 text-base md:text-lg text-fl-ink-soft">
                Fiveleaf builds and operates bespoke AI agents for mid-market
                operators in customer service, sales and operations. Fully
                integrated into your stack, continuously optimised by us. Every
                agent is shaped to the team that owns the metric, not bolted on
                as a side-tool.
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-fl-muted">
                Proposed &middot; Inter cv11 + ss01 + tracking
              </p>
              <p
                className="mt-3 text-base md:text-lg text-fl-ink-soft"
                style={NEW_BODY}
              >
                Fiveleaf builds and operates bespoke AI agents for mid-market
                operators in customer service, sales and operations. Fully
                integrated into your stack, continuously optimised by us.
                Every agent is shaped to the team that owns the metric, not
                bolted on as a side-tool.
              </p>
            </div>
          </div>
          <p className="mt-4 max-w-3xl text-xs text-fl-muted">
            Visible deltas: the single-storey <code>a</code> (cv11), the
            double-storey <code>g</code> (ss01), and slightly tighter tracking.
            Subtle but reads as more deliberate.
          </p>
        </div>
      </section>

      {/* Numbers / tabular */}
      <section className="border-b border-fl-line">
        <div className="mx-auto max-w-5xl px-6 py-16 md:px-10 md:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-fl-muted">
            Sample 09 &middot; Numbers &middot; tabular-nums
          </p>
          <h2 className="mt-3 text-2xl md:text-3xl" style={NEW_SUBHEAD}>
            Numbers line up like a <em>ledger</em>.
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-fl-line bg-white p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-fl-muted">
                Current &middot; proportional
              </p>
              <div className="mt-4 grid gap-1 text-2xl md:text-3xl text-fl-ink">
                <p>£28.00 &middot; 100Mb plan</p>
                <p>£39.92 &middot; 450Mb plan</p>
                <p>£55.00 &middot; gigabit fibre</p>
                <p>2.4s &middot; resolution time</p>
                <p>5:1 &middot; monthly return</p>
              </div>
            </div>
            <div className="rounded-2xl border border-fl-line bg-white p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-fl-muted">
                Proposed &middot; tabular
              </p>
              <div
                className="mt-4 grid gap-1 text-2xl md:text-3xl text-fl-ink"
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                <p>£28.00 &middot; 100Mb plan</p>
                <p>£39.92 &middot; 450Mb plan</p>
                <p>£55.00 &middot; gigabit fibre</p>
                <p>2.4s &middot; resolution time</p>
                <p>5:1 &middot; monthly return</p>
              </div>
            </div>
          </div>
          <p className="mt-4 max-w-3xl text-xs text-fl-muted">
            Notice the digits all sit on the same column rails on the right.
            Worth applying everywhere prices, percentages, times or ratios
            appear.
          </p>
        </div>
      </section>

      {/* Complete section preview — full restyle in context */}
      <section className="bg-fl-surface">
        <div className="mx-auto max-w-5xl px-6 py-16 md:px-10 md:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-fl-muted">
            Sample 10 &middot; Complete section in context
          </p>
          <h2 className="mt-3 text-2xl" style={NEW_SUBHEAD}>
            A whole section, restyled.
          </h2>
          <p className="mt-3 text-sm text-fl-muted">
            Eyebrow + H2 + sub + body + outcome line, all using the new stack.
          </p>

          <article className="mt-10 rounded-3xl border border-fl-line bg-white px-6 py-10 shadow-sm md:px-12 md:py-14">
            <Pill tone="neutral" uppercase>
              Customer operations at scale
            </Pill>
            <h3
              className="mt-5 text-balance text-4xl md:text-5xl"
              style={NEW_DISPLAY}
            >
              Handover any conversation, <em>fully briefed</em>.
            </h3>
            <p
              className="mt-6 max-w-2xl text-base md:text-lg text-fl-ink-soft"
              style={NEW_BODY}
            >
              Our AI agents are extremely competent, but we know the importance
              of connecting customers with your team. So every Fiveleaf build
              ships with a bespoke dashboard. Not just to monitor
              conversations, but to take over with full context and give that
              <em> extra level of support</em>.
            </p>
            <p
              className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-fl-muted"
              style={{ fontVariantNumeric: "tabular-nums" }}
            >
              resolution: 2.4s &middot; agents online: 14 &middot; monthly
              return: 5:1
            </p>
          </article>
        </div>
      </section>

      {/* Notes / next steps */}
      <section className="border-t border-fl-line bg-fl-surface-alt">
        <div className="mx-auto max-w-5xl px-6 py-16 md:px-10 md:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-fl-muted">
            What I want from you
          </p>
          <h2 className="mt-3 text-2xl md:text-3xl" style={NEW_SUBHEAD}>
            Three things to call.
          </h2>
          <ol
            className="mt-6 grid gap-4 text-base md:text-lg text-fl-ink-soft"
            style={NEW_BODY}
          >
            <li>
              <strong className="text-fl-ink">1. Direction.</strong> Does the
              Newsreader 400 + italic-for-emphasis voice land? Yes / no / a
              tweak.
            </li>
            <li>
              <strong className="text-fl-ink">2. Italic word choices.</strong>{" "}
              Walk Samples 01-07 and tell me which italic words to keep, move,
              or drop. I&rsquo;d rather get them right than ship and
              redecorate later.
            </li>
            <li>
              <strong className="text-fl-ink">3. Rollout scope.</strong>{" "}
              Everywhere at once (51 headlines, one commit), or staged
              section-by-section so you can sanity-check each as it lands.
            </li>
          </ol>
        </div>
      </section>
    </main>
  );
}

/* ────────────────────────────────────────────────────────────────── */
/*  Helpers                                                            */
/* ────────────────────────────────────────────────────────────────── */

function SampleBlock({
  id,
  label,
  dark,
  children,
}: {
  id: string;
  label: string;
  dark?: boolean;
  children: ReactNode;
}) {
  return (
    <section
      className={
        dark
          ? "border-y border-white/10 bg-fl-bg text-white"
          : "border-y border-fl-line bg-fl-surface"
      }
    >
      <div className="mx-auto max-w-5xl px-6 py-14 md:px-10 md:py-20">
        <p
          className={`font-mono text-[10px] uppercase tracking-[0.2em] ${dark ? "text-white/55" : "text-fl-muted"}`}
        >
          Sample {id} &middot; {label}
        </p>
        <div className="mt-6 grid gap-6">{children}</div>
      </div>
    </section>
  );
}

function Old({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-55">
        Current &middot; Inter 600
      </p>
      <p
        className={`mt-2 font-semibold leading-[1.05] tracking-tight ${className ?? ""}`}
      >
        {children}
      </p>
    </div>
  );
}

function New({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const newDisplay: CSSProperties = {
    fontFamily:
      'var(--font-display-preview), Georgia, "Times New Roman", serif',
    fontWeight: 400,
    letterSpacing: "-0.015em",
    lineHeight: 1.02,
  };
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-55">
        Proposed &middot; Newsreader 400 + italic
      </p>
      <p className={`mt-2 text-balance ${className ?? ""}`} style={newDisplay}>
        {children}
      </p>
    </div>
  );
}

function Note({
  children,
  dark,
}: {
  children: ReactNode;
  dark?: boolean;
}) {
  return (
    <p
      className={`mt-1 max-w-2xl text-xs ${dark ? "text-white/55" : "text-fl-muted"}`}
    >
      {children}
    </p>
  );
}
