import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { LegalBody } from "@/components/sections/LegalBody";
import { privacy } from "@/lib/legal";

export const metadata: Metadata = pageMeta({
  title: privacy.title,
  description: "What this website collects: nothing. No cookies, no analytics, no tracking.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return <LegalBody doc={privacy} />;
}
