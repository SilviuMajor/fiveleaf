import type { Metadata } from "next";
import { Nav } from "@/components/sections/Nav";
import { CaseStudy } from "@/components/sections/CaseStudy";
import { Footer } from "@/components/sections/Footer";

/**
 * Standalone, unlinked case-study page. Parked here so the section is
 * preserved exactly as-is but kept off the homepage until launch.
 * noindex/nofollow so search engines don't surface it early — flip
 * the robots metadata when it's ready to go public.
 */
export const metadata: Metadata = {
  title: "Case study",
  robots: { index: false, follow: false, nocache: true },
};

export default function CaseStudyPage() {
  return (
    <>
      <Nav />
      <main id="main" className="pt-14">
        <CaseStudy />
      </main>
      <Footer />
    </>
  );
}
