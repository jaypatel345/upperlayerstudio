import type { MetadataRoute } from "next";
import { absolute } from "@/lib/seo";
import { serviceDetails } from "@/lib/services";
import { projects } from "@/lib/projects";
import { posts } from "@/lib/insights";

export default function sitemap(): MetadataRoute.Sitemap {
  const latestPost = posts.map((p) => p.date).sort().at(-1);

  const pages: MetadataRoute.Sitemap = [
    { url: absolute("/"), changeFrequency: "weekly", priority: 1 },
    { url: absolute("/services"), changeFrequency: "monthly", priority: 0.9 },
    { url: absolute("/work"), changeFrequency: "monthly", priority: 0.8 },
    { url: absolute("/studio"), changeFrequency: "monthly", priority: 0.7 },
    { url: absolute("/contact"), changeFrequency: "yearly", priority: 0.7 },
    { url: absolute("/insights"), lastModified: latestPost, changeFrequency: "weekly", priority: 0.7 },
    { url: absolute("/lab"), changeFrequency: "monthly", priority: 0.5 },
    { url: absolute("/privacy"), changeFrequency: "yearly", priority: 0.2 },
    { url: absolute("/terms"), changeFrequency: "yearly", priority: 0.2 },
  ];

  return [
    ...pages,
    ...serviceDetails.map((s) => ({
      url: absolute(`/services/${s.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...projects.map((p) => ({
      url: absolute(`/work/${p.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...posts.map((p) => ({
      url: absolute(`/insights/${p.slug}`),
      lastModified: p.date,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
