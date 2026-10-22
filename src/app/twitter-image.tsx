import { ogAlt, ogSize, renderOgImage } from "@/lib/og";

// Cache-bust v2: rolling hills visual refresh
export const id = "rolling-hills-v2";
export const alt = ogAlt;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage();
}
