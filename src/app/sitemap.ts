import type { MetadataRoute } from "next";
import { absolute, contentUpdated, projectImages, videoFacts, videoUrl } from "@/lib/seo";
import { serviceDetails } from "@/lib/services";
import { projects } from "@/lib/projects";
import { posts } from "@/lib/insights";

/**
 * Next writes sitemap fields into the XML as-is, so free text (titles,
 * descriptions) is escaped here; an "&" in a summary would otherwise make the
 * whole sitemap invalid. URLs need it too for query strings.
 */
const xml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");

/** Google truncates video:description at 2048 chars; keep well under. */
const clip = (s: string, n = 1000) => (s.length > n ? `${s.slice(0, n - 1)}…` : s);

export default function sitemap(): MetadataRoute.Sitemap {
  const latestPost = posts.map((p) => p.date).sort().at(-1);

  const pages: MetadataRoute.Sitemap = [
    { url: absolute("/"), lastModified: contentUpdated, changeFrequency: "weekly", priority: 1 },
    { url: absolute("/services"), lastModified: contentUpdated, changeFrequency: "monthly", priority: 0.9 },
    { url: absolute("/work"), lastModified: contentUpdated, changeFrequency: "monthly", priority: 0.8 },
    { url: absolute("/studio"), lastModified: contentUpdated, changeFrequency: "monthly", priority: 0.7 },
    { url: absolute("/contact"), lastModified: contentUpdated, changeFrequency: "yearly", priority: 0.7 },
    { url: absolute("/insights"), lastModified: latestPost, changeFrequency: "weekly", priority: 0.7 },
    { url: absolute("/lab"), lastModified: contentUpdated, changeFrequency: "monthly", priority: 0.5 },
    { url: absolute("/privacy"), changeFrequency: "yearly", priority: 0.2 },
    { url: absolute("/terms"), changeFrequency: "yearly", priority: 0.2 },
  ];

  return [
    ...pages,
    ...serviceDetails.map((s) => ({
      url: absolute(`/services/${s.slug}`),
      lastModified: contentUpdated,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...projects.map((p) => {
      const facts = videoFacts(p.video);
      return {
        url: absolute(`/work/${p.slug}`),
        lastModified: p.lastUpdated ?? contentUpdated,
        changeFrequency: "monthly" as const,
        priority: 0.7,
        // Every screenshot on the case study, so each can rank in Google Images
        images: projectImages(p).map((src) => xml(absolute(src))),
        ...(p.video.src && {
          videos: [
            {
              title: xml(`${p.name}: ${p.kind} walkthrough`),
              thumbnail_loc: xml(absolute(p.video.poster)),
              description: xml(clip(p.video.note || p.seo?.description || p.summary)),
              content_loc: xml(videoUrl(p.video.src)),
              duration: facts.duration,
              publication_date: facts.uploaded,
              family_friendly: "yes" as const,
            },
          ],
        }),
      };
    }),
    ...posts.map((p) => ({
      url: absolute(`/insights/${p.slug}`),
      lastModified: p.lastUpdated ?? p.date,
      changeFrequency: "yearly" as const,
      priority: 0.6,
      images: [xml(absolute(p.cover.src))],
    })),
  ];
}
