import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type PillTone =
  | "neutral"
  | "sky"
  | "sand"
  | "sage"
  | "lavender"
  | "rose"
  | "ink"
  | "white";

const TONE_CLASSES: Record<PillTone, string> = {
  neutral: "bg-fl-pastel-neutral text-fl-pastel-neutral-ink",
  sky: "bg-fl-pastel-sky text-fl-pastel-sky-ink",
  sand: "bg-fl-pastel-sand text-fl-pastel-sand-ink",
  sage: "bg-fl-pastel-sage text-fl-pastel-sage-ink",
  lavender: "bg-fl-pastel-lavender text-fl-pastel-lavender-ink",
  rose: "bg-fl-pastel-rose text-fl-pastel-rose-ink",
  ink: "bg-fl-ink text-white",
  white: "bg-white/10 text-white border border-white/15",
};

type PillProps = {
  children: ReactNode;
  tone?: PillTone;
  className?: string;
  uppercase?: boolean;
};

export function Pill({
  children,
  tone = "neutral",
  className,
  uppercase = false,
}: PillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide",
        uppercase && "uppercase tracking-[0.12em]",
        TONE_CLASSES[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
