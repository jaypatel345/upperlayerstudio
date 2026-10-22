import { ogSize, renderOgImage } from "@/lib/og";
import { projectBySlug, projects } from "@/lib/projects";

export const id = "rolling-hills-v2";
export const alt = "Case study by Upper Layer Studio";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = projectBySlug(slug);
  return renderOgImage(p && { eyebrow: `Case study · ${p.kind}`, title: p.name });
}
