import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema, webPageSchema } from "@/lib/seo";
import { Hero } from "@/components/sections/Hero";
import { LogoStrip } from "@/components/sections/LogoStrip";
import { Services } from "@/components/sections/Services";
import { TwoUp } from "@/components/sections/TwoUp";
import { HomeWork } from "@/components/sections/HomeWork";
import { Studio } from "@/components/sections/Studio";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <JsonLd
        data={webPageSchema({
          path: "/",
          name: "AI Automation Services & AI Voice Agents",
          description:
            "AI automation agency building workflow automation, AI voice agents, AI receptionists and custom AI agents for businesses worldwide. Fixed-fee scope in 48h.",
          breadcrumb: false,
        })}
      />
      <JsonLd data={faqSchema()} />
      <Hero />
      <LogoStrip />
      <Services />
      <TwoUp />
      <HomeWork />
      {/* Testimonials slot in here later */}
      <Studio />
      <FAQ />
      <CTA after="tint" />
    </>
  );
}
