import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
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
