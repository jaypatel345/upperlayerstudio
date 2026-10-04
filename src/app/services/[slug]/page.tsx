import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceProblem } from "@/components/sections/ServiceProblem";
import { ServiceDeliverables } from "@/components/sections/ServiceDeliverables";
import { ServiceProcess } from "@/components/sections/ServiceProcess";
import { ServiceFAQ } from "@/components/sections/ServiceFAQ";
import { RelatedServices } from "@/components/sections/RelatedServices";
import { CTA } from "@/components/sections/CTA";
import { serviceBySlug, serviceDetails } from "@/lib/services";
import { site } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

/** Four known services, so every page is prerendered and anything else 404s. */
export function generateStaticParams() {
  return serviceDetails.map((s) => ({ slug: s.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const service = serviceBySlug(slug);
  if (!service) return {};

  return {
    title: service.meta.title,
    description: service.meta.description,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${service.meta.title} | ${site.name}`,
      description: service.meta.description,
      url: `/services/${service.slug}`,
    },
  };
}

export default async function ServicePage({ params }: Params) {
  const { slug } = await params;
  const service = serviceBySlug(slug);
  if (!service) notFound();

  return (
    <>
      <PageHero
        eyebrow={service.name}
        headline={service.hero.headline}
        body={service.hero.body}
        tags={service.hero.tags}
        primary={{ label: "Book a call", href: site.book }}
        secondary={{ label: "See all services", href: "/services" }}
      />
      <ServiceProblem problem={service.problem} />
      <ServiceDeliverables deliverables={service.deliverables} art={service.art} />
      <ServiceProcess />
      <ServiceFAQ items={service.faqs} />
      <RelatedServices
        slugs={service.related}
        title={`Clients who start with ${service.name} usually go here next`}
      />
      <CTA after="tint" />
    </>
  );
}
