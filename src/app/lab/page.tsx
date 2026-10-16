import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, pageMeta, webPageSchema } from "@/lib/seo";
import { ListingHeader } from "@/components/sections/ListingHeader";
import { LabEntries } from "@/components/sections/LabEntries";
import { CTA } from "@/components/sections/CTA";
import { lab } from "@/lib/insights";

export const metadata: Metadata = pageMeta({ title: lab.meta.title, description: lab.meta.description, path: "/lab" });

export default function LabPage() {
  return (
    <>
      <JsonLd
        data={webPageSchema({
          type: "CollectionPage",
          path: "/lab",
          name: lab.meta.title,
          description: lab.meta.description,
        })}
      />
      <JsonLd data={breadcrumbSchema([{ name: "Lab", path: "/lab" }])} />
      <ListingHeader eyebrow={lab.hero.eyebrow} title={lab.hero.title} body={lab.hero.body} />
      <LabEntries />
      <CTA />
    </>
  );
}
