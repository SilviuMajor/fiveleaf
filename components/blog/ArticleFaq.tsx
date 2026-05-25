/**
 * ArticleFaq — the question/answer block at the bottom of an article.
 *
 * Two jobs:
 *  1. Captures long-tail "people-also-ask" queries the main body
 *     might not cover head-on.
 *  2. Powers the per-article FAQPage JSON-LD schema, which is what
 *     surfaces the article as a rich-result accordion in Google.
 *
 * The same `faq` array on the article's frontmatter drives both
 * this visible block and the JSON-LD blob on the page. One source
 * of truth, no drift.
 */
export function ArticleFaq({
  items,
}: {
  items: { q: string; a: string }[];
}) {
  if (!items || items.length === 0) return null;
  return (
    <section
      aria-labelledby="article-faq-heading"
      className="mx-auto mt-16 max-w-3xl"
    >
      <h2
        id="article-faq-heading"
        className="font-display text-balance text-2xl font-semibold leading-tight tracking-tight md:text-3xl"
      >
        Frequently asked
      </h2>
      <dl className="mt-6 divide-y divide-fl-line border-y border-fl-line">
        {items.map((item, i) => (
          <div key={i} className="py-5">
            <dt className="text-base font-semibold text-fl-ink md:text-lg">
              {item.q}
            </dt>
            <dd className="mt-2 text-base leading-relaxed text-fl-ink-soft">
              {item.a}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
