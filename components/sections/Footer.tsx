import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { SITE } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-fl-bg text-white/80">
      <div className="mx-auto max-w-6xl px-6 py-12 md:px-10 md:py-20">
        {/* Mobile: brand block on top, then 2-column nav grid (since each
            list has only ~3 items). Desktop: 3-column row with brand wider. */}
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr] md:gap-12">
          <div>
            <Logo className="text-white" />
            <p className="mt-4 max-w-xs text-sm text-white/60">{SITE.tagline}</p>
            <p className="mt-5 text-sm text-white/60">
              <a
                href={`mailto:${SITE.contactEmail}`}
                className="hover:text-white transition-colors"
              >
                {SITE.contactEmail}
              </a>
            </p>
            {SITE.linkedinUrl && (
              <p className="mt-2 text-sm text-white/60">
                <a
                  href={SITE.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
              </p>
            )}
          </div>

          {/* Three short link columns share a row on mobile so the footer
              doesn't stretch the page out. They re-flow into the wider grid
              at md and above. */}
          <div className="grid grid-cols-2 gap-6 md:contents">
            <div>
              <h3 className="text-sm font-semibold text-white">Company</h3>
              <ul className="mt-3 space-y-2 text-sm text-white/60 md:mt-4">
                <li>
                  <a href="#founder" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${SITE.contactEmail}`}
                    className="hover:text-white transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white">Legal</h3>
              <ul className="mt-3 space-y-2 text-sm text-white/60 md:mt-4">
                <li>
                  <Link href="/privacy" className="hover:text-white transition-colors">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white transition-colors">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="/dpa" className="hover:text-white transition-colors">
                    GDPR / DPA
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/50 md:mt-14 md:flex-row md:items-center md:justify-between">
          <p>
            &copy; {year} {SITE.registration.company} &middot; Registered in{" "}
            {SITE.registration.country} &middot; Company No. {SITE.registration.number}
          </p>
          <p>Built in London. AI agents, built for operators.</p>
        </div>
      </div>
    </footer>
  );
}
