import type { Metadata } from "next";
import { LegalBody } from "@/components/sections/LegalBody";
import { terms } from "@/lib/legal";

export const metadata: Metadata = {
  title: terms.title,
  description: "The terms that apply to using the Upper Layer Studio website.",
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return <LegalBody doc={terms} />;
}
