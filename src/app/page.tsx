import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/seo";
import { Hero } from "@/components/sections/Hero";
import { LogoStrip } from "@/components/sections/LogoStrip";
import { Services } from "@/components/sections/Services";
import { TwoUp } from "@/components/sections/TwoUp";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { Studio } from "@/components/sections/Studio";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <JsonLd data={faqSchema()} />
      <Hero />
      <LogoStrip />
      <Services />
      <TwoUp />
      <SelectedWork />
      {/* Testimonials slot in here later */}
      <Studio />
      <FAQ />
      <CTA after="tint" />
    </>
  );
}
