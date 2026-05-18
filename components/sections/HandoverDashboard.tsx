import {
  ArrowRight,
  CircleAlert,
  ClipboardCheck,
  History,
  Sparkles,
  UserRound,
} from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { Pill } from "@/components/brand/Pill";
import { FadeUp } from "@/components/motion/FadeUp";

/**
 * HandoverDashboard — "When the agent doesn't have it" section.
 *
 * Sits directly after AgentsExplainer on the homepage. The narrative
 * arc:
 *   - V5 above shows what happens when the agent CAN handle a case.
 *   - This section shows what happens when it CAN'T: a live human
 *     handover, with the full story already loaded on the screen.
 *
 * Layout: split on lg+. Copy + 4 feature bullets on the left, a mocked
 * dashboard panel on the right showing a real handover (Sarah's
 * cancellation from V5, but escalated because she's moving abroad).
 *
 * The dashboard mock is intentionally not pixel-perfect product UI —
 * it's stylised to read as a clean editorial sketch of the real
 * thing. Same visual vocabulary as the rest of the site (rounded-2xl,
 * fl-line borders, mono labels, pastel accents).
 */

const FEATURES: Array<{
  icon: typeof History;
  title: string;
  body: string;
}> = [
  {
    icon: History,
    title: "Full transcript on takeover.",
    body: "The whole conversation. Every system the agent touched. Every result it got back. No “start from scratch” handovers.",
  },
  {
    icon: UserRound,
    title: "Customer context preloaded.",
    body: "Plan, tenure, payment status, recent tickets, last NPS. All on screen the moment the human picks up.",
  },
  {
    icon: Sparkles,
    title: "Suggested next step.",
    body: "What the agent was about to do, why it stopped, and what the playbook says comes next. The human decides; the agent has the prep work done.",
  },
  {
    icon: ClipboardCheck,
    title: "Closed loop, every time.",
    body: "Resolution gets logged back to the agent. The next handover of this kind is rarer than the last one.",
  },
];

export function HandoverDashboard() {
  return (
    <section
      id="handover"
      className="bg-fl-surface scroll-mt-24"
    >
      <div className="mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-32">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          {/* LEFT — copy + feature list */}
          <FadeUp>
            <div>
              <Pill tone="neutral" uppercase>
                Handover dashboard
              </Pill>
              <h2 className="font-display mt-5 text-balance text-3xl font-semibold leading-[1.05] tracking-tight md:text-5xl">
                When the agent doesn&rsquo;t have it, your team gets the whole
                story.
              </h2>
              <p className="mt-5 max-w-xl text-base text-fl-ink-soft md:text-lg">
                If the agent isn&rsquo;t sure, it doesn&rsquo;t bounce the
                customer back to a queue. It hands the conversation to your team
                with everything it learned, exactly where it got stuck, and what
                your playbook says comes next.
              </p>

              <ul className="mt-10 space-y-6">
                {FEATURES.map(({ icon: Icon, title, body }) => (
                  <li key={title} className="flex items-start gap-4">
                    <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-fl-pastel-neutral text-fl-ink ring-1 ring-fl-line">
                      <Icon className="h-4 w-4" />
                    </span>
                    <div>
                      <h3 className="text-base font-semibold leading-tight tracking-tight text-fl-ink md:text-lg">
                        {title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-fl-ink-soft">
                        {body}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </FadeUp>

          {/* RIGHT — mocked dashboard panel */}
          <FadeUp delay={0.05}>
            <div className="lg:sticky lg:top-24">
              <DashboardMock />
              <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-fl-muted">
                Mock of the live handover view
              </p>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

/**
 * DashboardMock — stylised internal-tool sketch. Continues the V5
 * cancellation scenario: Sarah's first reply was "I want to cancel",
 * the agent offered the same-price upgrade, and she came back with
 * "I'm moving to Oslo" — at which point the retention play isn't
 * viable and the agent escalates.
 */
function DashboardMock() {
  return (
    <div className="overflow-hidden rounded-2xl border border-fl-line bg-white shadow-xl">
      {/* Mac-style chrome bar so the panel reads as a product window */}
      <div className="flex items-center justify-between border-b border-fl-line bg-fl-surface-alt px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        </div>
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-fl-muted">
          fiveleaf · handover · live
        </p>
        <div className="w-9" aria-hidden="true" />
      </div>

      {/* Customer + status header */}
      <div className="border-b border-fl-line bg-white px-5 py-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="flex items-center gap-2 text-sm font-semibold text-fl-ink">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#25D366]/15 text-[#25D366]">
                <SiWhatsapp className="h-3 w-3" />
              </span>
              Sarah Patel
            </p>
            <p className="mt-1 text-xs text-fl-ink-soft">
              WhatsApp · 18-month customer · 450Mb · NPS 8 · 0 open tickets
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-fl-pastel-rose px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-fl-pastel-rose-ink">
            <CircleAlert className="h-3 w-3" />
            Agent requested human
          </span>
        </div>
      </div>

      {/* Conversation excerpt */}
      <div className="border-b border-fl-line px-5 py-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-fl-muted">
          Conversation
        </p>
        <ol className="mt-3 space-y-2.5">
          <li className="flex justify-end">
            <p className="max-w-[88%] rounded-2xl rounded-br-sm bg-fl-pastel-neutral px-3 py-2 text-sm text-fl-ink">
              I want to cancel.
            </p>
          </li>
          <li className="flex">
            <p className="max-w-[92%] rounded-2xl rounded-bl-sm bg-fl-ink px-3 py-2 text-sm leading-relaxed text-white">
              Sorry to hear that. There&rsquo;s a 900Mb plan available at your
              address for the price you pay now. Worth a look?
            </p>
          </li>
          <li className="flex justify-end">
            <p className="max-w-[88%] rounded-2xl rounded-br-sm bg-fl-pastel-neutral px-3 py-2 text-sm text-fl-ink">
              I&rsquo;m moving to Oslo, actually.
            </p>
          </li>
        </ol>
      </div>

      {/* Why the agent stopped */}
      <div className="border-b border-fl-line bg-fl-surface-alt px-5 py-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-fl-muted">
          Why the agent stopped
        </p>
        <p className="mt-2 text-sm leading-relaxed text-fl-ink">
          Out-of-area cancellation. Retention play not applicable; the customer
          is leaving the UK service area.
        </p>
      </div>

      {/* Suggested next step */}
      <div className="border-b border-fl-line bg-fl-pastel-sage/40 px-5 py-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-fl-pastel-sage-ink">
          Suggested next step · KB-RET-301
        </p>
        <p className="mt-2 text-sm leading-relaxed text-fl-ink">
          Process the cancellation, apply the 14-day notice, and offer{" "}
          <span className="font-semibold">pause-not-cancel</span> in case the
          move falls through. Sarah keeps her plan and price for 90 days if she
          comes back.
        </p>
      </div>

      {/* Action row */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-full bg-fl-ink px-4 py-2 text-xs font-semibold text-white"
          >
            Take over
            <ArrowRight className="h-3 w-3" />
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-full border border-fl-line bg-white px-4 py-2 text-xs font-semibold text-fl-ink-soft"
          >
            Mark resolved
          </button>
        </div>
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-fl-muted">
          escalated 14s ago
        </p>
      </div>
    </div>
  );
}
