import type { ReactNode } from "react";

/**
 * Diagram — wrapper for the brand-styled SVG figures that sit inside
 * article bodies. Two responsibilities:
 *
 *  1. Consistent visual framing — a calm pastel surface, a thin
 *     border, generous breathing room — so every article diagram
 *     reads as belonging to Fiveleaf rather than being a random
 *     decoration.
 *  2. Accessibility — the `aria-label` is the alt-text equivalent,
 *     read aloud by screen readers in place of the visual. An
 *     optional caption renders below the image as visible context
 *     for sighted readers.
 *
 * Used inside MDX as <Diagram label="…" caption="…">…SVG…</Diagram>.
 */
export function Diagram({
  label,
  caption,
  tone = "sand",
  children,
}: {
  /** Accessibility label — what the figure means in words. */
  label: string;
  /** Optional caption rendered beneath the figure as visible body
   *  copy. Pairs well with a one-line summary of what the reader
   *  should take away. */
  caption?: string;
  /** Background tone for the figure card. Defaults to sand. */
  tone?: "sand" | "sky" | "sage" | "rose" | "neutral";
  children: ReactNode;
}) {
  const toneClass = TONE_BG[tone];
  return (
    <figure className="mt-8 mb-2">
      <div
        role="img"
        aria-label={label}
        className={`overflow-hidden rounded-2xl border border-fl-line ${toneClass} p-6 md:p-8`}
      >
        {children}
      </div>
      {caption && (
        <figcaption className="mt-3 px-1 text-sm leading-relaxed text-fl-muted">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

const TONE_BG: Record<string, string> = {
  sand: "bg-fl-pastel-sand/40",
  sky: "bg-fl-pastel-sky/40",
  sage: "bg-fl-pastel-sage/40",
  rose: "bg-fl-pastel-rose/40",
  neutral: "bg-fl-surface-alt",
};
