import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "./site";

/**
 * Social card: the hero sky with the wordmark over it. With no options it is
 * the sitewide card (tagline + services line). Case studies, services and
 * articles pass their own headline so a shared link shows what it points at,
 * which lifts click-through from LinkedIn, X and Slack previews.
 */
export const ogSize = { width: 1200, height: 630 };
export const ogAlt = `${site.name} — ${site.tagline}`;

export async function renderOgImage(card?: { eyebrow: string; title: string }) {
  if (!card) {
    const png = await readFile(join(process.cwd(), "public/og-image.png"));
    return new Response(png, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  }

  const headline = card.title;
  const sub = card.eyebrow;
  // Long headlines step down so they still fit in three lines
  const fontSize = headline.length > 60 ? 54 : headline.length > 36 ? 62 : 70;
  const [sky, logo] = await Promise.all([
    readFile(join(process.cwd(), "src/assets/og-sky.jpg"), "base64"),
    readFile(join(process.cwd(), "public/brand/upper_layer_studio_logo_badge.png"), "base64"),
  ]);

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", color: "#ffffff" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`data:image/jpeg;base64,${sky}`}
          alt=""
          width={1200}
          height={630}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(10,15,22,0.35) 0%, rgba(10,15,22,0.8) 100%)",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, width: "100%", position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`data:image/png;base64,${logo}`} alt="Upper Layer Studio logo" width={56} height={56} style={{ borderRadius: 28 }} />
            <span style={{ fontSize: 30, fontWeight: 700, letterSpacing: "-0.03em", color: "#ffffff" }}>{site.wordmark}</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <span style={{ fontSize, fontWeight: 700, lineHeight: 1.08, letterSpacing: "-0.04em", maxWidth: 1050, color: "#ffffff" }}>
              {headline}
            </span>
            <span style={{ fontSize: 26, fontWeight: 500, color: "#bae6fd", letterSpacing: "-0.02em" }}>{sub}</span>
          </div>
        </div>
      </div>
    ),
    ogSize,
  );
}
