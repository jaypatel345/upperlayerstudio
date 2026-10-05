import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceShowcase } from "@/components/sections/ServiceShowcase";
import { LogoStrip } from "@/components/sections/LogoStrip";
import { Studio } from "@/components/sections/Studio";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";
import { servicesIndex } from "@/lib/services";
import { site } from "@/lib/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, faqSchema, pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "AI Automation, Voice AI & AI Agent Services",
  description:
    "AI automation, voice agents, custom agents and product build. Start with the problem you need to solve — scope and fixed fee in writing within 48 hours.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={faqSchema()} />
      <JsonLd data={breadcrumbSchema([{ name: "Services", path: "/services" }])} />
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
