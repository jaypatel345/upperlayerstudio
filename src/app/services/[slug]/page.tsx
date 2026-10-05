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
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, faqSchema, pageMeta, serviceSchema } from "@/lib/seo";

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

  return pageMeta({
    title: service.meta.title,
    description: service.meta.description,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({ params }: Params) {
  const { slug } = await params;
  const service = serviceBySlug(slug);
  if (!service) notFound();

  return (
    <>
      <JsonLd
        data={serviceSchema({ name: service.name, slug: service.slug, description: service.meta.description })}
      />
      <JsonLd data={faqSchema(service.faqs)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Services", path: "/services" },
          { name: service.name, path: `/services/${service.slug}` },
        ])}
      />
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
