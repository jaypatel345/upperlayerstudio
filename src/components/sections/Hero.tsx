"use client";

import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { hero } from "@/lib/site";
import { MediaImage } from "@/components/ui/MediaImage";
import { mediaUrl } from "@/lib/media";
import { HeroParallax } from "./HeroParallax";
import { useReducedMotion } from "@/lib/use-reduced-motion";

// Background assets: Option 3 - Tuscan Rolling Hills (Selected Best)
const HERO_PHOTO: string | null = "/hero/hero-option-3-rolling-hills.jpg";
const HERO_VIDEO: string | null = null;

// 24px inlined blur placeholder for hero-option-3-rolling-hills.jpg
const HERO_BLUR: string | null =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA0JCgsKCA0LCgsODg0PEyAVExISEyccHhcgLikxMC4pLSwzOko+MzZGNywtQFdBRkxOUlNSMj5aYVpQYEpRUk//2wBDAQ4ODhMREyYVFSZPNS01T09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0//wAARCAANABgDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwBf7HT/AJ7R/wDfQpy6PH/z2i/77FZ3Cg5y31x/hUbSKzgbNueu04pLOar+ycX1CmbsWkwDrPD/AN9iisiJ4owB5RIz0JH+FFJ5xU/lLWCpo//Z";

// Exact multi-stop fade mask from bybrightstudios.com:
// -webkit-mask: linear-gradient(#000 0% 70%, #0009 82%, #00000040 91%, #0000 100%);
// mask: linear-gradient(#000 0% 70%, #0009 82%, #00000040 91%, #0000 100%);
const HERO_MASK_STYLE: React.CSSProperties = {
  WebkitMaskImage:
    "linear-gradient(180deg, #000 0% 70%, rgba(0, 0, 0, 0.6) 82%, rgba(0, 0, 0, 0.25) 91%, transparent 100%)",
  maskImage:
    "linear-gradient(180deg, #000 0% 70%, rgba(0, 0, 0, 0.6) 82%, rgba(0, 0, 0, 0.25) 91%, transparent 100%)",
};

// Subtle text veil: transparent so deep alpine sky shines through with maximum contrast
const HERO_TEXT_VEIL_STYLE: React.CSSProperties = {
  background: "transparent",
};

// Bright Studios signature ease-out curve for visitor arrival entrance
const BRIGHT_EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden bg-white pt-[60px]">
      {/* Hero media background: Bright Studios video loop with high-res poster and multi-stop mask */}
      {HERO_PHOTO && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 bottom-0 -z-20 overflow-hidden"
          style={HERO_MASK_STYLE}
        >
          <HeroParallax>
            <MediaImage
              src={HERO_PHOTO}
              alt=""
              fill
              priority
              fetchPriority="high"
              placeholder={HERO_BLUR ? "blur" : "empty"}
              blurDataURL={HERO_BLUR ?? undefined}
              sizes="100vw"
              quality={90}
              className="object-cover object-center"
            />
            {HERO_VIDEO && (
              <video
                src={mediaUrl(HERO_VIDEO)}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
              />
            )}
          </HeroParallax>
        </div>
      )}

      {/* Hero text veil: radial illumination glow centered behind the headline */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={HERO_TEXT_VEIL_STYLE}
      />

      {/* Subtle bottom gradient to guarantee an imperceptible dissolve into the white page */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 -z-10 bg-gradient-to-b from-transparent via-white/40 to-white"
      />

      <Container className="relative flex flex-col items-center pt-10 pb-10 text-center sm:pt-14 sm:pb-14">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: BRIGHT_EASE, delay: 0.08 }}
          className="select-none"
        >
          <Pill tone="light" className="px-[14px]! py-1.5! text-[14px]! font-normal!">
            {hero.badge}
          </Pill>
        </motion.div>

        {/* Two deliberate lines — text-wrap:balance is off here so the colour
            split always lands in the same place. */}
        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 26, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.85, ease: BRIGHT_EASE, delay: 0.2 }}
          className="mt-5 max-w-[36ch] select-none text-[32px] leading-[1.1] tracking-[-0.035em] sm:text-[44px] sm:leading-[1.08] lg:text-[52px]"
        >
          <span className="block text-white">
            {hero.headline.lead}
          </span>
          <span className="block mt-1 sm:mt-1.5 text-[#bae6fd]">
            {hero.headline.trail}
          </span>
        </motion.h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: BRIGHT_EASE, delay: 0.34 }}
          className="mt-3.5 max-w-[620px] select-none text-[16px] leading-[1.65] text-pretty text-white/90 sm:mt-4 sm:text-[17px]"
        >
          {hero.body}
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: BRIGHT_EASE, delay: 0.48 }}
          className="mt-7 flex flex-wrap items-center justify-center gap-3"
        >
          <Button href={hero.primary.href} size="lg">
            {hero.primary.label}
          </Button>
          <Button href={hero.secondary.href} size="lg" variant="light">
            {hero.secondary.label}
          </Button>
        </motion.div>
      </Container>

      {/* Floating proof card, mirrors the reference's headline stat bar */}
      <Container className="relative pb-[95px]">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: BRIGHT_EASE, delay: 0.6 }}
          className="mx-auto flex max-w-[800px] flex-col gap-5 rounded-[var(--radius-card)] bg-white/94 px-6 py-5 shadow-[0_2px_12px_rgba(10,10,10,0.04)] border border-line/60 backdrop-blur-sm sm:flex-row sm:items-center sm:gap-5 sm:px-6"
        >
          <span className="text-[32px] leading-none font-medium tracking-[-0.035em] text-ink sm:text-[36px]">
            {hero.stat.value}
          </span>
          <div className="flex-1">
            <p className="text-[14px] font-medium text-ink">{hero.stat.title}</p>
            <p className="mt-0.5 text-[13px] text-muted">{hero.stat.sub}</p>
          </div>
          <ArrowLink href={hero.stat.link.href} className="shrink-0 text-[13px]">
            {hero.stat.link.label}
          </ArrowLink>
        </motion.div>
      </Container>
    </section>
  );
}
