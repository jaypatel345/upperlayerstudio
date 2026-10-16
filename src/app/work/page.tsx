import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, itemList, pageMeta, webPageSchema } from "@/lib/seo";
import { ListingHeader } from "@/components/sections/ListingHeader";
import { ProjectRows } from "@/components/sections/ProjectRows";
import { CopyGrid } from "@/components/sections/CopyGrid";
import { CTA } from "@/components/sections/CTA";
import { work } from "@/lib/pages";
import { projects } from "@/lib/projects";

export const metadata: Metadata = pageMeta({ title: work.meta.title, description: work.meta.description, path: "/work" });

export default function WorkPage() {
  return (
    <>
      <JsonLd
        data={webPageSchema({
          type: "CollectionPage",
          path: "/work",
          name: work.meta.title,
          description: work.meta.description,
          extra: { mainEntity: itemList(projects.map((p) => ({ name: p.name, path: `/work/${p.slug}` }))) },
        })}
      />
      <JsonLd data={breadcrumbSchema([{ name: "Work", path: "/work" }])} />
      <section className="overflow-x-clip pb-20 sm:pb-[88px]">
        <ListingHeader eyebrow={work.hero.eyebrow} title={work.hero.title} body={work.hero.body} />
        <ProjectRows projects={projects} />
      </section>
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
