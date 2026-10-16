import type { MetadataRoute } from "next";
import { absolute, contentUpdated, videoUrl } from "@/lib/seo";
import { serviceDetails } from "@/lib/services";
import { projects } from "@/lib/projects";
import { posts } from "@/lib/insights";

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
    ...projects.map((p) => ({
      url: absolute(`/work/${p.slug}`),
      lastModified: contentUpdated,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      // Image sitemap entries help the case-study screenshots rank in Google Images
      images: [absolute(p.cover.desktop.src)],
      ...(p.video.src && {
        videos: [
          {
            title: `${p.name}: ${p.kind} walkthrough`,
            thumbnail_loc: absolute(p.video.poster),
            description: p.summary,
            content_loc: videoUrl(p.video.src),
          },
        ],
      }),
    })),
    ...posts.map((p) => ({
      url: absolute(`/insights/${p.slug}`),
      lastModified: p.date,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
