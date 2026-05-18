"use client";

import { useEffect, useState, type RefObject } from "react";

/**
 * Drive a step index from a vertical scroll-locked sticky section.
 *
 * The wrapper element is expected to be `total * 100vh` tall with a sticky
 * child pinned at `top: 0`. As the user scrolls through the wrapper, the
 * page is effectively "locked" on the section until each step has been
 * passed. The returned step index advances 0 → 1 → ... → total - 1 in
 * lockstep with scroll progress, then the user is released to scroll past.
 *
 * Implementation note: scroll events and rAF can be throttled in hidden
 * iframes / inactive tabs, so we use rAF polling rather than scroll events
 * for reliability in real browser tabs. In a hidden iframe rAF runs at 0Hz
 * and the step won't update — but the layout (sticky pin) still works.
 */
export function useScrollLockedStep(
  total: number,
  ref: RefObject<HTMLElement | null>,
): { step: number; progress: number } {
  const [state, setState] = useState({ step: 0, progress: 0 });

  useEffect(() => {
    if (total <= 0) return;
    let raf = 0;
    let running = true;
    let lastStep = -1;

    const tick = () => {
      if (!running) return;
      const el = ref.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const range = el.offsetHeight - window.innerHeight;
        if (range > 0) {
          const scrolledInto = -rect.top;
          const p = Math.max(0, Math.min(1, scrolledInto / range));
          // Slightly inset so the user gets a settle moment at the start and
          // end of each step rather than the boundary being exactly on the line.
          const eased = Math.max(0, Math.min(0.9999, (p - 0.04) / 0.92));
          const step = Math.min(total - 1, Math.floor(eased * total));
          if (step !== lastStep) {
            lastStep = step;
            setState({ step, progress: p });
          } else {
            setState((prev) => (prev.progress === p ? prev : { step, progress: p }));
          }
        }
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      running = false;
      cancelAnimationFrame(raf);
    };
  }, [total, ref]);

  return state;
}
