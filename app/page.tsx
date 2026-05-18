import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { Wedge } from "@/components/sections/Wedge";
import { Problem } from "@/components/sections/Problem";
import { AgentsExplainer } from "@/components/sections/AgentsExplainer";
import { HandoverDashboard } from "@/components/sections/HandoverDashboard";
import { Departments } from "@/components/sections/Departments";
import { Partners } from "@/components/sections/Partners";
import { WhyFiveleaf } from "@/components/sections/WhyFiveleaf";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Founder } from "@/components/sections/Founder";
import { Faq } from "@/components/sections/Faq";
import { BookingEmbed } from "@/components/sections/BookingEmbed";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Wedge />
        <Problem />
        <AgentsExplainer />
        <HandoverDashboard />
        <Departments />
        <Partners />
        <WhyFiveleaf />
        <HowItWorks />
        <Founder />
        <Faq />
        <BookingEmbed />
      </main>
      <Footer />
    </>
  );
}
