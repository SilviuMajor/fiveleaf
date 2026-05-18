import { Pill, type PillTone } from "@/components/brand/Pill";
import { cn } from "@/lib/utils";

/**
 * WedgeV3 — Stripped 3-row table.
 *
 * Same backbone as the live version but cut from 5 rows to 3. Each
 * row carries one piece of meaningful information; nothing else.
 * Fast read-through, all the comparison still lands.
 */

type ColumnId = "diy" | "consult" | "fiveleaf";

type Column = {
  id: ColumnId;
  name: string;
  tone: PillTone;
  values: { get: string; cost: string; runs: string };
};

const COLS: Column[] = [
  {
    id: "diy",
    name: "DIY platforms",
    tone: "sand",
    values: {
      get: "A toolkit",
      cost: "Internal AI team",
      runs: "You",
    },
  },
  {
    id: "consult",
    name: "Big consultancies",
    tone: "rose",
    values: {
      get: "A deck and a build",
      cost: "Six figures, 12 months",
      runs: "You (after handover)",
    },
  },
  {
    id: "fiveleaf",
    name: "Fiveleaf",
    tone: "sage",
    values: {
      get: "A working AI agent",
      cost: "Cost of one hire",
      runs: "We do",
    },
  },
];

const HEADER_BG: Record<ColumnId, string> = {
  diy: "bg-fl-pastel-sand/70",
  consult: "bg-fl-pastel-rose/70",
  fiveleaf: "bg-fl-pastel-sage",
};

const BODY_BG: Record<ColumnId, string> = {
  diy: "",
  consult: "",
  fiveleaf: "bg-fl-pastel-sage/15",
};

const ROWS = [
  { label: "What you get", key: "get" as const },
  { label: "Cost", key: "cost" as const },
  { label: "Run by", key: "runs" as const },
];

export function WedgeV3() {
  return (
    <section className="bg-fl-surface">
      <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-24">
        <div className="max-w-3xl">
          <Pill tone="neutral" uppercase>
            Why we exist
          </Pill>
          <h2 className="font-display mt-5 text-balance text-3xl font-semibold leading-[1.1] tracking-tight md:text-5xl">
            Two ways to do it. Both have a catch.
          </h2>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-fl-line bg-white">
          {/* Header */}
          <div className="grid grid-cols-[140px_1fr_1fr_1.1fr]">
            <div className="px-5 py-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-fl-muted">
                Approach
              </p>
            </div>
            {COLS.map((c) => (
              <div key={c.id} className={cn("px-5 py-4", HEADER_BG[c.id])}>
                <Pill
                  tone={c.tone}
                  uppercase
                  className={cn(
                    "bg-white/65",
                    c.id === "fiveleaf" && "px-3.5 py-1.5 text-sm tracking-[0.14em]",
                  )}
                >
                  {c.name}
                </Pill>
              </div>
            ))}
          </div>

          {/* Body — 3 rows */}
          {ROWS.map((row, i) => (
            <div
              key={row.key}
              className={cn(
                "grid grid-cols-[140px_1fr_1fr_1.1fr] border-t border-fl-line",
                i === ROWS.length - 1 && "border-b-0",
              )}
            >
              <div className="bg-fl-surface-alt px-5 py-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-fl-muted">
                  {row.label}
                </p>
              </div>
              {COLS.map((c) => (
                <div
                  key={c.id}
                  className={cn(
                    "px-5 py-6",
                    BODY_BG[c.id],
                  )}
                >
                  <p
                    className={cn(
                      "font-display text-base font-semibold leading-snug tracking-tight md:text-lg",
                      c.id === "fiveleaf" ? "text-fl-ink" : "text-fl-ink-soft",
                    )}
                  >
                    {c.values[row.key]}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>

        <p className="mt-10 max-w-3xl text-balance font-display text-xl font-semibold leading-snug tracking-tight text-fl-ink md:text-2xl">
          You don&apos;t build it with us. You don&apos;t build it on us. We build it for you.
        </p>
      </div>
    </section>
  );
}
