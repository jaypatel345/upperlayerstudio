import { ogSize, renderOgImage } from "@/lib/og";
import { postBySlug, posts } from "@/lib/insights";

export const id = "rolling-hills-v2";
export const alt = "Article by Upper Layer Studio";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = postBySlug(slug);
  return renderOgImage(p && { eyebrow: `Insights · ${p.topic} · ${p.readingTime}`, title: p.title });
}
