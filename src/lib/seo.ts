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
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  publishedTime?: string;
}): Metadata {
  const social = `${title} | ${site.name}`;
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
      images: [ogImage],
      ...(publishedTime && { publishedTime, authors: [process.founder.name] }),
    },
    twitter: {
      card: "summary_large_image",
      title: social,
      description,
      creator: "@UpperLayerAI",
      images: [ogImage],
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
        sameAs: [process.founder.link.href],
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
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
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

export function articleSchema(p: { slug: string; title: string; summary: string; date: string; topic: string }) {
  const url = absolute(`/insights/${p.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: p.title,
    description: p.summary,
    datePublished: p.date,
    dateModified: p.date,
    articleSection: p.topic,
    url,
    mainEntityOfPage: url,
    image: absolute("/opengraph-image"),
    author: { "@id": founderId, "@type": "Person", name: process.founder.name },
    publisher: { "@id": orgId },
    inLanguage: "en",
  };
}

/** Date the case-study walkthrough videos were published (git history of public/work). */
const videoUploadDate = "2026-10-06T00:00:00+05:30";

export function projectSchema(p: {
  slug: string;
  name: string;
  kind: string;
  summary: string;
  live: string;
  video?: { src: string; poster: string; note: string };
}) {
  const url = absolute(`/work/${p.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: `${p.name}: ${p.kind} case study`,
    about: {
      "@type": "SoftwareApplication",
      name: p.name,
      applicationCategory: p.kind,
      ...(p.live && { url: p.live }),
    },
    description: p.summary,
    url,
    creator: { "@id": founderId },
    publisher: { "@id": orgId },
    // Lets the walkthrough appear in Google's video results and video carousels
    ...(p.video?.src && {
      video: {
        "@type": "VideoObject",
        name: `${p.name}: ${p.kind} walkthrough`,
        description: p.video.note || p.summary,
        thumbnailUrl: absolute(p.video.poster),
        contentUrl: videoUrl(p.video.src),
        uploadDate: videoUploadDate,
        embedUrl: url,
        publisher: { "@id": orgId },
      },
    }),
  };
}
