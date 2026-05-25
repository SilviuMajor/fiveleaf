import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

/**
 * ArticleCta — the soft conversion block at the foot of every article.
 *
 * Editorial line: be the most useful, least-salesy resource on the
 * topic. Single paragraph, one link. Anything more aggressive hurts
 * both SEO (Google's helpful-content update penalises self-promotion)
 * and reader trust. Counter-intuitively, the article that converts
 * best is the one that almost talks the reader out of hiring you.
 */
export function ArticleCta() {
  return (
    <section className="mx-auto mt-16 max-w-3xl rounded-2xl border border-fl-line bg-fl-ink px-6 py-8 text-white md:px-8 md:py-10">
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/55">
        If you want help building this
      </p>
      <h2 className="font-display mt-3 text-balance text-2xl font-semibold leading-tight tracking-tight md:text-3xl">
        Building AI agents into a mid-market business is what Fiveleaf does.
      </h2>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/75">
        Bespoke build, fully integrated, continuously optimised. A
        30-minute discovery call is enough to tell you honestly whether AI
        agents fit your team right now, or whether you&rsquo;re better off
        waiting six months. No pitch.
      </p>
      <div className="mt-6 flex flex-wrap items-center gap-4">
        {/* Point at the homepage #book anchor (not the external cal.com URL
            directly) so a future calendar-provider swap is a one-line change
            in BookingEmbed instead of an edit across every article + CTA. */}
        <Link
          href="/#book"
          className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-fl-ink transition hover:bg-white/90"
        >
          Book a 30-min call
          <ArrowUpRight className="h-4 w-4" />
        </Link>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white"
        >
          Or read more from the blog
        </Link>
      </div>
    </section>
  );
}
