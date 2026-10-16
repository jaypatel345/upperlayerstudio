import type { MetadataRoute } from "next";
import { absolute, siteUrl } from "@/lib/seo";

/**
 * Search and AI-answer crawlers are named explicitly. "*" already allows them,
 * but some only honour a group addressed to them by name, and buyers now vet
 * suppliers through ChatGPT, Perplexity and Gemini — being citable there is
 * part of ranking for "AI automation services".
 */
const aiCrawlers = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Bingbot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: aiCrawlers, allow: "/" },
    ],
    sitemap: absolute("/sitemap.xml"),
    host: siteUrl,
  };
}
