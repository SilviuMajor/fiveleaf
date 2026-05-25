"use client";

import { useEffect, useState } from "react";

/**
 * Sticky table of contents on lg+. Builds itself from the H2s on the
 * article page. Highlights the section currently in view via an
 * IntersectionObserver so the reader always knows where they are.
 *
 * Reasoning: long-read articles rank better when readers stick
 * around, and a sticky TOC measurably reduces bounce on 2000+ word
 * pieces. Also signals to Google that the page has a structured
 * hierarchy.
 */

type Heading = { id: string; text: string };

export function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const found: Heading[] = Array.from(
      document.querySelectorAll<HTMLHeadingElement>("article h2[id]"),
    ).map((h) => ({ id: h.id, text: h.textContent ?? "" }));
    setHeadings(found);

    if (found.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the heading closest to the top that's currently
        // intersecting. If none intersect, leave the previous active.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              a.target.getBoundingClientRect().top -
              b.target.getBoundingClientRect().top,
          );
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 },
    );

    found.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  if (headings.length === 0) return null;

  return (
    <nav
      aria-label="On this page"
      className="hidden lg:sticky lg:top-24 lg:block"
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-fl-muted">
        On this page
      </p>
      <ul className="mt-4 space-y-2 text-sm">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={
                "block border-l-2 py-1 pl-3 leading-snug transition-colors " +
                (activeId === h.id
                  ? "border-fl-ink text-fl-ink font-medium"
                  : "border-fl-line text-fl-ink-soft hover:text-fl-ink")
              }
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
