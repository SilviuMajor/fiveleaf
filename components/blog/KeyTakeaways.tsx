/**
 * KeyTakeaways — the AI-quotable bullet box that sits near the top of
 * every article.
 *
 * Why it exists: Google AI Overviews, Perplexity, ChatGPT and Claude
 * preferentially lift dense, list-shaped summaries when answering
 * search queries. A 3-5 bullet box at 40-80 words total is what they
 * pull. Engineered for that pull, not for decoration.
 *
 * Visually: a calm pastel card with a clear "Key takeaways" label.
 * Markup: ordered semantic list inside an aside, so screen readers
 * announce it as a digest before the main body.
 */
export function KeyTakeaways({ items }: { items: string[] }) {
  return (
    <aside
      aria-label="Key takeaways"
      className="mx-auto mt-12 max-w-3xl rounded-2xl border border-fl-line bg-fl-pastel-sand/40 px-6 py-6 md:px-8 md:py-7"
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-fl-pastel-sand-ink">
        Key takeaways
      </p>
      <ul className="mt-3 grid gap-2 text-base leading-relaxed text-fl-ink">
        {items.map((item, i) => (
          <li
            key={i}
            className="grid grid-cols-[1.25rem_1fr] items-start gap-3"
          >
            <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-fl-pastel-sand-ink" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
