import Image from "next/image";
import { cn } from "@/lib/cn";
import type { Shot } from "@/lib/projects";

/**
 * Product screenshots, shown as captured.
 *
 * The desktop shots already include the real browser bar, so Screenshot adds
 * no chrome of its own: just a soft radius and shadow so the capture sits on
 * the page like a window. Quality is 90 (allowlisted in next.config.ts); the
 * sources are 2× retina captures, so the optimiser has real pixels to keep.
 */
export function Screenshot({
  shot,
  className,
  priority,
  sizes = "(min-width: 1024px) 640px, 90vw",
}: {
  shot: Shot;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <Image
      src={shot.src}
      alt={shot.alt}
      width={shot.w}
      height={shot.h}
      sizes={sizes}
      quality={90}
      priority={priority}
      className={cn(
        "block h-auto w-full rounded-[12px] shadow-[var(--shadow-float)]",
        className,
      )}
    />
  );
}

/**
 * Phone captures keep a bezel, since the shots are bare screens. It uses the
 * same cream-yellow as the border baked into the desktop screenshots (#f6e9d0),
 * so every capture on a case study reads as one set.
 */
export function PhoneFrame({
  shot,
  className,
  priority,
  sizes = "(min-width: 1024px) 220px, 40vw",
}: {
  shot: Shot;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[28px] border-[5px] border-[#f6e9d0] bg-[#f6e9d0] shadow-[var(--shadow-float)]",
        className,
      )}
    >
      <Image
        src={shot.src}
        alt={shot.alt}
        width={shot.w}
        height={shot.h}
        sizes={sizes}
        quality={90}
        priority={priority}
        className="block h-auto w-full rounded-[22px]"
      />
    </div>
  );
}
