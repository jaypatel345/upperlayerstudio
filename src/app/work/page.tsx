import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { BuiltWork } from "@/components/sections/BuiltWork";
import { CopyGrid } from "@/components/sections/CopyGrid";
import { CTA } from "@/components/sections/CTA";
import { work } from "@/lib/pages";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: work.meta.title,
  description: work.meta.description,
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow={work.hero.eyebrow}
        headline={work.hero.headline}
        body={work.hero.body}
        tags={work.hero.tags}
        primary={{ label: "Book a call", href: site.book }}
        secondary={{ label: "See what I build", href: "/services" }}
      />
      <SelectedWork showAll={false} eyebrow="Products" title="Built and shipped" />
      <BuiltWork />
      <CopyGrid
        eyebrow={work.standIn.eyebrow}
        title={work.standIn.title}
        body={work.standIn.body}
        items={work.standIn.items}
        tone="dark"
        cols={2}
        align="center"
      />
      <CopyGrid
        eyebrow={work.derisk.eyebrow}
        title={work.derisk.title}
        body={work.derisk.body}
        items={work.derisk.items}
        cols={2}
      />
      <CTA />
    </>
  );
}
