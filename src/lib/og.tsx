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
  const headline = card?.title ?? site.tagline;
  const sub = card?.eyebrow ?? "AI Automation · Voice AI · AI Agents · Product Build";
  // Long headlines step down so they still fit in three lines
  const fontSize = headline.length > 60 ? 56 : headline.length > 36 ? 64 : 72;
  const [sky, logo] = await Promise.all([
    readFile(join(process.cwd(), "src/assets/og-sky.jpg"), "base64"),
    readFile(join(process.cwd(), "public/brand/upper_layer_studio_logo_badge.png"), "base64"),
  ]);

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", color: "#0a0a0a" }}>
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
            background: "linear-gradient(180deg, rgba(255,255,255,0) 30%, rgba(255,255,255,0.85) 100%)",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`data:image/png;base64,${logo}`} alt="Upper Layer Studio logo" width={56} height={56} style={{ borderRadius: 14 }} />
            <span style={{ fontSize: 30, fontWeight: 600, letterSpacing: "-0.03em" }}>{site.wordmark}</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <span style={{ fontSize, lineHeight: 1.04, letterSpacing: "-0.04em", maxWidth: 1000 }}>
              {headline}
            </span>
            <span style={{ fontSize: 28, color: "rgba(10,10,10,0.7)" }}>{sub}</span>
          </div>
        </div>
      </div>
    ),
    ogSize,
  );
}
