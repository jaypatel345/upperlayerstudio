/**
 * Search metadata and structured data, kept in one place so every page reports
 * the same canonical origin, social card and entity graph.
 *
 * Nothing here renders visibly. `pageMeta` builds a page's <head> tags and the
 * `*Schema` helpers return JSON-LD objects for the <JsonLd> component.
 */

import type { Metadata } from "next";
import { site, faqs, process } from "./site";
import { serviceDetails } from "./services";
import type { Project } from "./projects";
import type { Post } from "./insights";
import { ogAlt, ogSize } from "./og";

export const siteUrl: string = site.url;

/** The generated social card at app/opengraph-image.tsx */
const ogImage = { url: "/opengraph-image", ...ogSize, alt: ogAlt };

export const absolute = (path = "/") => new URL(path, siteUrl).toString();

/**
 * Last meaningful content edit, used as sitemap lastModified for pages that
 * don't carry their own date. Bump it when page copy changes; Google ignores
 * lastmod values that change on every build, so this is deliberately manual.
 */
export const contentUpdated = "2026-10-16";

/** Videos are served from the R2 media origin, not from the Vercel site. */
const MEDIA_ORIGIN = "https://media.upperlayerstudio.com";
export const videoUrl = (src: string) => (src.startsWith("http") ? src : MEDIA_ORIGIN + src);

/** Search phrases each service should be found for, used in its Service schema. */
const serviceKeywords: Record<string, { alternateName: string[]; serviceType: string; audience: string }> = {
  automation: {
    alternateName: ["AI automation services", "AI automation agency", "Workflow automation services", "n8n automation"],
    serviceType: "AI automation services",
    audience: "Operations teams and small to mid-sized businesses",
  },
  voice: {
    alternateName: ["AI voice agent", "Voice AI agent development", "AI receptionist", "AI phone answering service"],
    serviceType: "AI voice agent development",
    audience: "Service businesses that rely on inbound phone calls",
  },
  agents: {
    alternateName: ["Custom AI agent development", "AI agent development services", "RAG chatbot development"],
    serviceType: "AI agent development",
    audience: "Teams that need assistants grounded in their own data",
  },
  product: {
    alternateName: ["AI product development services", "AI software development", "AI MVP development"],
    serviceType: "AI product development",
    audience: "Founders and teams taking an AI product to market",
  },
};

/**
 * Per-page metadata. Each page needs its own openGraph block: Next merges
 * metadata shallowly, so a page without one inherits the layout's og:url and
 * every share card would point at the homepage.
 */
export function pageMeta({
  title,
  description,
  path,
  type = "website",
  publishedTime,
  ogCard = false,
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  publishedTime?: string;
  /** The route has its own opengraph-image/twitter-image files (per-page cards) */
  ogCard?: boolean;
}): Metadata {
  const social = `${title} | ${site.name}`;
  const og = ogCard ? { ...ogImage, url: `${path}/opengraph-image`, alt: social } : ogImage;
  const tw = ogCard ? { ...og, url: `${path}/twitter-image` } : ogImage;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: social,
      description,
      url: path,
      siteName: site.name,
      locale: "en_GB",
      type,
      images: [og],
      ...(publishedTime && { publishedTime, authors: [process.founder.name] }),
    },
    twitter: {
      card: "summary_large_image",
      title: social,
      description,
      creator: "@UpperLayerAI",
      images: [tw],
    },
  };
}

const orgId = `${siteUrl}/#organization`;
const founderId = `${siteUrl}/#founder`;
const websiteId = `${siteUrl}/#website`;

/** Sitewide graph: the studio, its founder and the website itself. */
export function siteSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": orgId,
        name: site.name,
        alternateName: ["Upper Layer", "Upper Layer AI"],
        url: siteUrl,
        // Schema.org requires logo to be an ImageObject for rich results
        logo: {
          "@type": "ImageObject",
          "@id": `${siteUrl}/#logo`,
          url: absolute("/icon.png"),
          contentUrl: absolute("/icon.png"),
          caption: site.name,
        },
        image: {
          "@type": "ImageObject",
          url: absolute("/opengraph-image"),
        },
        email: site.email,
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "sales",
          email: site.email,
          url: absolute(site.book),
          availableLanguage: ["English"],
          areaServed: "Worldwide",
        },
        slogan: site.tagline,
        description:
          "AI automation agency offering AI automation services, AI voice agents and AI receptionists, custom AI agents and AI product development for teams worldwide. Fixed-fee scope within 48 hours.",
        founder: { "@id": founderId },
        address: { "@type": "PostalAddress", addressCountry: "IN" },
        areaServed: "Worldwide",
        knowsAbout: [
          "AI automation",
          "AI automation services",
          "Workflow automation",
          "Business process automation",
          "Voice AI agents",
          "AI receptionist",
          "AI phone answering",
          "Conversational AI",
          "AI agents",
          "Retrieval-augmented generation",
          "Large language models",
          "AI product development",
          "n8n",
          "Vapi",
          "ElevenLabs",
          "OpenAI",
          "Anthropic Claude",
        ],
        sameAs: site.socials.map((s) => s.href),
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "AI automation and voice AI services",
          itemListElement: serviceDetails.map((s) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              "@id": `${absolute(`/services/${s.slug}`)}#service`,
              name: s.name,
              serviceType: serviceKeywords[s.slug]?.serviceType ?? s.name,
              url: absolute(`/services/${s.slug}`),
            },
          })),
        },
      },
      {
        "@type": "Person",
        "@id": founderId,
        name: process.founder.name,
        jobTitle: "Founder",
        url: process.founder.link.href,
        image: {
          "@type": "ImageObject",
          url: absolute(process.founder.photo.src),
        },
        worksFor: { "@id": orgId },
        knowsAbout: ["AI automation", "n8n", "Voice AI agents", "AI agents", "Next.js", "Full-stack development"],
        sameAs: [process.founder.link.href, "https://github.com/jaypatel345"],
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: siteUrl,
        name: site.name,
        inLanguage: "en",
        publisher: { "@id": orgId },
      },
    ],
  };
}

export function faqSchema(items: { q: string; a: string }[] = faqs.items) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  const last = trail.at(-1)?.path ?? "/";
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${absolute(last)}#breadcrumb`,
    itemListElement: [{ name: "Home", path: "/" }, ...trail].map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absolute(c.path),
    })),
  };
}

export function serviceSchema(s: { name: string; slug: string; description: string }) {
  const url = absolute(`/services/${s.slug}`);
  const k = serviceKeywords[s.slug];
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: s.name,
    ...(k && { alternateName: k.alternateName }),
    serviceType: k?.serviceType ?? s.name,
    description: s.description,
    url,
    mainEntityOfPage: url,
    image: absolute(`/services/${s.slug}/opengraph-image`),
    provider: { "@id": orgId },
    brand: { "@id": orgId },
    areaServed: "Worldwide",
    ...(k && { audience: { "@type": "BusinessAudience", audienceType: k.audience } }),
    // No published prices: the offer says how it's priced, not what it costs
    offers: {
      "@type": "Offer",
      url: absolute(site.book),
      availability: "https://schema.org/InStock",
      description: "Fixed fee against an agreed scope, quoted in writing within 48 hours of a discovery call.",
      seller: { "@id": orgId },
    },
  };
}

export const blogId = `${siteUrl}/insights#blog`;

const wordCount = (p: Post) =>
  p.sections
    .flatMap((x) => [x.heading ?? "", ...x.paragraphs, ...(x.list ?? [])])
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;

export function articleSchema(p: Post) {
  const url = absolute(`/insights/${p.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: p.title,
    description: p.summary,
    datePublished: p.date,
    dateModified: p.date,
    articleSection: p.topic,
    keywords: [p.topic, "AI automation", "AI agents", "voice AI"],
    wordCount: wordCount(p),
    timeRequired: `PT${parseInt(p.readingTime, 10) || 4}M`,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    isPartOf: { "@id": blogId },
    // The article's own social card first, then the case-study screenshot it uses as a cover
    image: [absolute(`/insights/${p.slug}/opengraph-image`), absolute(p.cover.src)],
    author: { "@type": "Person", "@id": founderId, name: process.founder.name, url: process.founder.link.href },
    publisher: { "@id": orgId },
    inLanguage: "en",
  };
}

/** /insights as a Blog listing its posts. */
export function blogSchema(list: Post[], meta: { title: string; description: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": blogId,
    name: `${meta.title} | ${site.name}`,
    description: meta.description,
    url: absolute("/insights"),
    publisher: { "@id": orgId },
    inLanguage: "en",
    blogPost: list.map((p) => ({
      "@type": "BlogPosting",
      "@id": `${absolute(`/insights/${p.slug}`)}#article`,
      headline: p.title,
      url: absolute(`/insights/${p.slug}`),
      datePublished: p.date,
    })),
  };
}

/**
 * A WebPage node of the right subtype (AboutPage, ContactPage,
 * CollectionPage...) tied to the site graph and the page's breadcrumb.
 */
export function webPageSchema({
  type = "WebPage",
  path,
  name,
  description,
  breadcrumb = true,
  extra,
}: {
  type?: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage";
  path: string;
  name: string;
  description: string;
  breadcrumb?: boolean;
  extra?: Record<string, unknown>;
}) {
  const url = absolute(path);
  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name: `${name} | ${site.name}`,
    description,
    inLanguage: "en",
    isPartOf: { "@id": websiteId },
    about: { "@id": orgId },
    publisher: { "@id": orgId },
    dateModified: contentUpdated,
    ...(breadcrumb && { breadcrumb: { "@id": `${url}#breadcrumb` } }),
    ...extra,
  };
}

/** An ItemList of internal URLs, for listing pages such as /work and /services. */
export function itemList(items: { name: string; path: string }[]) {
  return {
    "@type": "ItemList",
    numberOfItems: items.length,
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      url: absolute(it.path),
    })),
  };
}

/**
 * Walkthrough video facts for VideoObject and the video sitemap. Most clips
 * were published together on 6 Oct 2026 and run 60s (ffprobe); a project
 * that ships a different cut sets `video.uploaded` / `video.duration`.
 */
const videoDefaults = { uploaded: "2026-10-06T00:00:00+05:30", duration: 60 };

export const videoFacts = (v: Project["video"]) => ({
  uploaded: v.uploaded ?? videoDefaults.uploaded,
  duration: Math.round(v.duration ?? videoDefaults.duration),
});

/** ISO 8601 duration, e.g. 20 -> PT20S, 60 -> PT1M. */
const isoDuration = (sec: number) =>
  `PT${Math.floor(sec / 60) ? `${Math.floor(sec / 60)}M` : ""}${sec % 60 ? `${sec % 60}S` : ""}`;

/** Every screenshot on a case study, cover first, de-duplicated. */
export const projectImages = (p: Project) =>
  [...new Set([p.cover.desktop.src, p.cover.mobile?.src, ...p.screens.flatMap((g) => g.shots.map((x) => x.src))])]
    .filter((x): x is string => Boolean(x));

export function projectSchema(p: Project) {
  const url = absolute(`/work/${p.slug}`);
  const description = p.seo?.description ?? p.summary;
  const facts = videoFacts(p.video);
  const video = p.video.src
    ? {
        "@type": "VideoObject",
        "@id": `${url}#video`,
        name: `${p.name}: ${p.kind} walkthrough`,
        description: p.video.note || description,
        thumbnailUrl: [absolute(p.video.poster)],
        contentUrl: videoUrl(p.video.src),
        uploadDate: facts.uploaded,
        duration: isoDuration(facts.duration),
        isFamilyFriendly: true,
        inLanguage: "en",
        publisher: { "@id": orgId },
      }
    : undefined;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: `${p.seo?.title ?? `${p.name}: ${p.kind} case study`} | ${site.name}`,
        description,
        inLanguage: "en",
        isPartOf: { "@id": websiteId },
        breadcrumb: { "@id": `${url}#breadcrumb` },
        primaryImageOfPage: { "@type": "ImageObject", url: absolute(p.cover.desktop.src), caption: p.cover.desktop.alt },
        mainEntity: { "@id": `${url}#casestudy` },
        dateModified: contentUpdated,
      },
      {
        "@type": "CreativeWork",
        "@id": `${url}#casestudy`,
        name: `${p.name}: ${p.kind} case study`,
        headline: p.name,
        description,
        abstract: p.summary,
        genre: "Case study",
        url,
        inLanguage: "en",
        keywords: [p.kind, p.service, ...p.stack.flatMap((g) => g.items)].join(", "),
        about: {
          "@type": "SoftwareApplication",
          name: p.name,
          applicationCategory: p.kind,
          ...(p.live && { url: p.live }),
          ...(p.repo && { sameAs: p.repo }),
        },
        image: projectImages(p).map(absolute),
        creator: { "@id": founderId },
        author: { "@id": founderId },
        publisher: { "@id": orgId },
        isPartOf: { "@id": `${absolute("/work")}#webpage` },
        dateModified: contentUpdated,
        ...(video && { video: { "@id": video["@id"] } }),
      },
      ...(video ? [video] : []),
    ],
  };
}
