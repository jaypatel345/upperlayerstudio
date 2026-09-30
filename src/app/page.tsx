import { Hero } from "@/components/sections/Hero";
import { LogoStrip } from "@/components/sections/LogoStrip";
import { Services } from "@/components/sections/Services";
import { TwoUp } from "@/components/sections/TwoUp";
import { Studio } from "@/components/sections/Studio";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <LogoStrip />
      <Services />
      <TwoUp />
      {/* Selected work + testimonials slot in here later */}
      <Studio />
      <FAQ />
      <CTA />
    </>
  );
}
