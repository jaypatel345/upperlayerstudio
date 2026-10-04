import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceShowcase } from "@/components/sections/ServiceShowcase";
import { LogoStrip } from "@/components/sections/LogoStrip";
import { Studio } from "@/components/sections/Studio";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";
import { servicesIndex } from "@/lib/services";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "AI automation, voice agents, custom agents and product build. Start with the problem you need to solve — scope and fixed fee in writing within 48 hours.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow={servicesIndex.hero.eyebrow}
        headline={servicesIndex.hero.headline}
        body={servicesIndex.hero.body}
        tags={servicesIndex.hero.tags}
        primary={{ label: "Book a call", href: site.book }}
        secondary={{ label: "See how I work", href: "#process" }}
      />
      <ServiceShowcase />
      <LogoStrip />
      <Studio />
      <FAQ />
      <CTA after="tint" />
    </>
  );
}
