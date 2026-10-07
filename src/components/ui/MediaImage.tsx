"use client";

import Image, { type ImageProps } from "next/image";
import { mediaLoader } from "@/lib/media";

/**
 * next/image for /work and /hero files, served pre-sized from the R2 media
 * bucket (see src/lib/media.ts). A client component because a loader is a
 * function, which a server component can't hand to next/image directly.
 */
export function MediaImage(props: Omit<ImageProps, "loader">) {
  // eslint-disable-next-line jsx-a11y/alt-text -- alt is passed through in props
  return <Image loader={mediaLoader} {...props} />;
}
