import {
  History,
  MessageSquareMore,
  UserRound,
  ClipboardCheck,
  Sparkles,
} from "lucide-react";
import { Pill } from "@/components/brand/Pill";
import { FadeUp } from "@/components/motion/FadeUp";

/**
 * HandoverDashboard — "When the agent doesn't have it" section.
 *
 * Sits after AgentsExplainer. Left: copy + feature bullets. Right: a
 * simple chat mock of a *warm handover* — the AI tells the customer
 * it's bringing in a human, a "finding someone" pill bridges the gap,
 * then a named technical-support specialist picks up having already
 * read the whole thread. No dashboard chrome, no "why it stopped",
 * no action buttons — just the conversation the customer actually
 * sees.
 */

const FEATURES: Array<{
  icon: typeof History;
  title: string;
  body: string;
}> = [
  {
    icon: History,
    title: "No starting over.",
    body: "The specialist gets the full conversation, every system the agent touched, every result it got back. The customer never repeats themselves.",
  },
  {
    icon: MessageSquareMore,
    title: "A warm intro, not a queue ticket.",
    body: "The agent hands off inside the same conversation, on the same channel. Seconds, not “someone will get back to you”.",
  },
  {
    icon: UserRound,
    title: "Context travels with it.",
    body: "Account, history, and everything the agent already tried are on screen the moment your specialist picks up.",
  },
  {
    icon: ClipboardCheck,
    title: "Closed loop, every time.",
    body: "How it was resolved gets logged back to the agent. The next handover of this kind is rarer than the last one.",
  },
];

export function HandoverDashboard() {
  return (
    <section id="handover" className="bg-fl-surface scroll-mt-24">
      <div className="mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-32">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          {/* LEFT — copy + feature list */}
          <FadeUp>
            <div>
              <Pill tone="neutral" uppercase>
                Live handover
              </Pill>
              <h2 className="font-display mt-5 text-balance text-3xl font-semibold leading-[1.05] tracking-tight md:text-5xl">
                When it needs a human, the handover is seamless.
              </h2>
              <p className="mt-5 max-w-xl text-base text-fl-ink-soft md:text-lg">
                If the agent can&rsquo;t take it all the way, it doesn&rsquo;t
                bounce the customer back to a queue. It introduces a real person
                inside the same conversation, who&rsquo;s already read every
                word.
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

          {/* RIGHT — simple warm-handover conversation */}
          <FadeUp delay={0.05}>
            <div className="lg:sticky lg:top-24">
              <HandoverChat />
              <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-fl-muted">
                What the customer sees during a handover
              </p>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

/**
 * HandoverChat — a clean phone-style transcript: customer issue → AI
 * agent warm handover → "finding someone" bridge → named technical
 * support specialist picks up with full context.
 */
function HandoverChat() {
  return (
    <div className="overflow-hidden rounded-2xl border border-fl-line bg-white shadow-xl">
      <header className="flex items-center justify-between border-b border-fl-line bg-fl-surface-alt px-4 py-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-fl-muted">
          Technical support
        </p>
        <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-fl-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          live
        </span>
      </header>

      <div className="space-y-4 px-4 py-5 md:px-5">
        {/* Customer */}
        <div className="flex justify-end">
          <p className="max-w-[85%] rounded-2xl rounded-br-sm bg-fl-pastel-neutral px-3.5 py-2.5 text-sm leading-relaxed text-fl-ink">
            My broadband keeps dropping every evening, and rebooting the router
            doesn&rsquo;t fix it.
          </p>
        </div>

        {/* AI agent — warm handover */}
        <div>
          <p className="mb-1 ml-1 font-mono text-[10px] uppercase tracking-[0.16em] text-fl-muted">
            AI agent
          </p>
          <div className="flex">
            <p className="max-w-[88%] rounded-2xl rounded-bl-sm bg-fl-ink px-3.5 py-2.5 text-sm leading-relaxed text-white">
              This one deserves a hands-on look. I&rsquo;m bringing in one of
              our technical support specialists now. They&rsquo;ll have the
              whole conversation, so you won&rsquo;t need to repeat anything.
            </p>
          </div>
        </div>

        {/* AI summary — internal note generated for the specialist, so
            they can take over without re-reading the whole thread. Not
            a chat bubble; styled as an inset hand-off card. */}
        <div className="rounded-xl border border-fl-line bg-fl-surface-alt px-4 py-3.5">
          <p className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-fl-muted">
            <Sparkles className="h-3 w-3" />
            AI summary · handed to the specialist
          </p>
          <p className="mt-2.5 text-sm leading-relaxed text-fl-ink">
            18-month customer. Broadband drops every evening (~6&ndash;9pm),
            survives a router reboot and a factory reset. Standard
            troubleshooting exhausted; pattern points to line noise, not
            in-home kit.
          </p>
          <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-fl-muted">
            Next steps
          </p>
          <ul className="mt-1.5 space-y-1 text-sm text-fl-ink-soft">
            <li>1. Check the SNR margin / attenuation on the line profile.</li>
            <li>2. If noise is confirmed, raise an Openreach SI2 fault.</li>
            <li>3. Offer 4G backup if drops continue tonight.</li>
          </ul>
        </div>

        {/* Bridge pill */}
        <div className="flex justify-center py-1">
          <span className="inline-flex items-center gap-2 rounded-full bg-fl-surface-alt px-3.5 py-1.5 text-xs font-medium text-fl-ink-soft ring-1 ring-fl-line">
            <span className="flex gap-0.5">
              <span className="h-1 w-1 rounded-full bg-fl-muted" />
              <span className="h-1 w-1 rounded-full bg-fl-muted" />
              <span className="h-1 w-1 rounded-full bg-fl-muted" />
            </span>
            Finding someone
          </span>
        </div>

        {/* Human specialist */}
        <div>
          <p className="mb-1 ml-1 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-fl-muted">
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-fl-pastel-sage text-[8px] font-semibold text-fl-pastel-sage-ink">
              M
            </span>
            Maya · Technical support
          </p>
          <div className="flex">
            <p className="max-w-[90%] rounded-2xl rounded-bl-sm border border-fl-line bg-fl-surface-alt px-3.5 py-2.5 text-sm leading-relaxed text-fl-ink">
              Hi, I&rsquo;ve just read through the whole thread, so there&rsquo;s
              no need to go over it again. Evening drops that survive a router
              reboot usually point to line noise. Let&rsquo;s get this sorted,
              roughly what time do they start?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
