import type { Metadata } from "next";
import { LegalBody } from "@/components/sections/LegalBody";
import { privacy } from "@/lib/legal";

export const metadata: Metadata = {
  title: privacy.title,
  description: "What this website collects: nothing. No cookies, no analytics, no tracking.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return <LegalBody doc={privacy} />;
}
