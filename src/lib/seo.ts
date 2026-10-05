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
        url: siteUrl,
        // The brand logo Google shows in the Knowledge Panel and results
        logo: absolute("/icon.png"),
        image: absolute("/opengraph-image"),
        email: site.email,
        slogan: site.tagline,
        description:
          "AI automation, voice AI agents, custom AI agents and product build for teams that need software running, not another prototype.",
        founder: { "@id": founderId },
        address: { "@type": "PostalAddress", addressCountry: "IN" },
        areaServed: "Worldwide",
        knowsAbout: [
          "AI automation",
          "Workflow automation",
          "Voice AI agents",
          "AI agents",
          "Retrieval-augmented generation",
          "AI product development",
          "n8n",
        ],
        sameAs: site.socials.map((s) => s.href),
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Services",
          itemListElement: serviceDetails.map((s) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: s.name, url: absolute(`/services/${s.slug}`) },
          })),
        },
      },
      {
        "@type": "Person",
        "@id": founderId,
        name: process.founder.name,
        jobTitle: "Founder",
        image: absolute(process.founder.photo.src),
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
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.name,
    serviceType: s.name,
    description: s.description,
    url: absolute(`/services/${s.slug}`),
    provider: { "@id": orgId },
    areaServed: "Worldwide",
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

export function projectSchema(p: { slug: string; name: string; kind: string; summary: string; live: string }) {
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
    url: absolute(`/work/${p.slug}`),
    creator: { "@id": founderId },
    publisher: { "@id": orgId },
  };
}
