import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "./site";

/** Shared social card: the hero sky with the wordmark and tagline over it. */
export const ogSize = { width: 1200, height: 630 };
export const ogAlt = `${site.name} — ${site.tagline}`;

export async function renderOgImage() {
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
            <img src={`data:image/png;base64,${logo}`} alt="" width={56} height={56} style={{ borderRadius: 14 }} />
            <span style={{ fontSize: 30, fontWeight: 600, letterSpacing: "-0.03em" }}>{site.wordmark}</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <span style={{ fontSize: 72, lineHeight: 1.04, letterSpacing: "-0.04em", maxWidth: 940 }}>
              {site.tagline}
            </span>
            <span style={{ fontSize: 28, color: "rgba(10,10,10,0.7)" }}>
              AI Automation · Voice AI · AI Agents · Product Build
            </span>
          </div>
        </div>
      </div>
    ),
    ogSize,
  );
}
