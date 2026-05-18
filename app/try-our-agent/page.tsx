import type { Metadata } from "next";
import { Nav } from "@/components/sections/Nav";
import { AgentEmbed } from "@/components/sections/AgentEmbed";
import { Footer } from "@/components/sections/Footer";

/**
 * Standalone, unlinked "try our agent" page. Parked here so the live
 * agent embed is preserved as-is but kept off the homepage until
 * launch. noindex/nofollow until it's ready to go public.
 */
export const metadata: Metadata = {
  title: "Try our AI agent",
  robots: { index: false, follow: false, nocache: true },
};

export default function TryOurAgentPage() {
  return (
    <>
      <Nav />
      <main id="main" className="pt-14">
        <AgentEmbed />
      </main>
      <Footer />
    </>
  );
}
