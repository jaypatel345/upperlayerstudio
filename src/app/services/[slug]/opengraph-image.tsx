import { ogSize, renderOgImage } from "@/lib/og";
import { serviceBySlug, serviceDetails } from "@/lib/services";

export const alt = "Service by Upper Layer Studio";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return serviceDetails.map((s) => ({ slug: s.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = serviceBySlug(slug);
  return renderOgImage(s && { eyebrow: `Service · ${s.name}`, title: s.meta.title });
}
