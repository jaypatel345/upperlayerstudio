import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, pageMeta } from "@/lib/seo";
import { LegalBody } from "@/components/sections/LegalBody";
import { terms } from "@/lib/legal";

export const metadata: Metadata = pageMeta({
  title: terms.title,
  description: "The terms that apply to using the Upper Layer Studio website.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: terms.title, path: "/terms" }])} />
      <LegalBody doc={terms} />
    </>
  );
}
