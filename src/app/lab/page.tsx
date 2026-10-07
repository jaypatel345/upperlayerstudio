import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { ListingHeader } from "@/components/sections/ListingHeader";
import { LabEntries } from "@/components/sections/LabEntries";
import { CTA } from "@/components/sections/CTA";
import { lab } from "@/lib/insights";

export const metadata: Metadata = pageMeta({ title: lab.meta.title, description: lab.meta.description, path: "/lab" });

export default function LabPage() {
  return (
    <>
      <ListingHeader eyebrow={lab.hero.eyebrow} title={lab.hero.title} body={lab.hero.body} />
      <LabEntries />
      <CTA />
    </>
  );
}
