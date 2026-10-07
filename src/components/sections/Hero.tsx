import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { hero } from "@/lib/site";
import Image from "next/image";
import { HeroParallax } from "./HeroParallax";

// Photo behind the hero. null leaves the hero on the plain page background.
const HERO_PHOTO: string | null = "/hero/hero-clouds-4k.jpg";

// White copy with a soft shadow, for photos with dark ground under the text.
// Off by default: the glow below keeps dark copy readable on most photos.
// Dark copy over a photo uses sky-matched navies (#0b1626 / #0e3a5f / #102233),
// each at least 4.4:1 against the mid-blue sky behind the text.
const LIGHT_TEXT = true;

// A 24px copy of HERO_PHOTO, inlined so the sky paints with the HTML while the
// full photo is still on its way (and the white copy is never on bare white).
// Regenerate it whenever the photo changes; null skips the placeholder.
const HERO_BLUR: string | null =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QBMRXhpZgAATU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAGKADAAQAAAABAAAADQAAAAD/7QA4UGhvdG9zaG9wIDMuMAA4QklNBAQAAAAAAAA4QklNBCUAAAAAABDUHYzZjwCyBOmACZjs+EJ+/8AAEQgADQAYAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/bAEMACQkJCQkJEAkJEBYQEBAWHhYWFhYeJh4eHh4eJi4mJiYmJiYuLi4uLi4uLjc3Nzc3N0BAQEBASEhISEhISEhISP/bAEMBCwwMEhESHxERH0szKjNLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS//dAAQAAv/aAAwDAQACEQMRAD8AvXCXkuV2Iw7Gs46bcddgzV+CRYRG2CxYE8np2qafVJIZzAEGMdR1r01Va0SPN9lfVs52WwnXlzt+lQ/Y2/vfrV3VbpPOEKJtABGcnr1zWRuf1NUqgnSP/9k=";

/** Server component — no JS on the critical path. */
export function Hero() {
  const delay = (s: number) => ({ "--rise-delay": `${s}s` }) as React.CSSProperties;

  return (
    <section className="relative isolate overflow-hidden pt-[60px]">
      {/* The photo stops ~48px under the stat card and masks out over its last 30%, like BrightStudios */}
      {HERO_PHOTO && (
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 bottom-0 -z-10 overflow-hidden [mask-image:linear-gradient(180deg,#000_0%,#000_70%,rgba(0,0,0,0.6)_82%,rgba(0,0,0,0.25)_91%,transparent_100%)]">
          <HeroParallax>
            <Image
              src={HERO_PHOTO}
              alt=""
              fill
              preload
              fetchPriority="high"
              placeholder={HERO_BLUR ? "blur" : "empty"}
              blurDataURL={HERO_BLUR ?? undefined}
              sizes="100vw"
              quality={90}
              className="-scale-x-100 object-cover object-top"
            />
          </HeroParallax>
          {/* Soft white glow behind the copy (BrightStudios' recipe, a touch taller for our longer copy) */}
          {!LIGHT_TEXT && (
            <div className="absolute inset-0 bg-[radial-gradient(62%_60%_at_50%_50%,rgba(255,255,255,0.36)_0%,rgba(255,255,255,0.2)_48%,rgba(255,255,255,0)_78%)]" />
          )}
        </div>
      )}

      <Container className="relative flex flex-col items-center pt-14 pb-10 text-center sm:pt-[76px] sm:pb-12">
        <div className="rise select-none" style={delay(0)}>
          <Pill className="px-[14px]! py-1.5! text-[14px]! font-normal!">{hero.badge}</Pill>
        </div>

        {/* Two deliberate lines — text-wrap:balance is off here so the colour
            split always lands in the same place. */}
        <h1
          className={`rise mt-4 max-w-[22ch] select-none text-[32px] leading-[1.06] sm:text-[46px] sm:leading-[1.05] lg:text-[54px] ${
            LIGHT_TEXT
              ? "text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.45),0_2px_28px_rgba(0,0,0,0.45)]"
              : HERO_PHOTO
                ? "text-[#0b1626]"
                : ""
          }`}
          style={delay(0.08)}
        >
          <span className="block">{hero.headline.lead}</span>
          <span className={`block ${LIGHT_TEXT ? "text-white" : HERO_PHOTO ? "text-[#0e3a5f]" : "text-[rgba(10,10,10,0.45)]"}`}>{hero.headline.trail}</span>
        </h1>

        <p
          className={`rise mt-5 max-w-[700px] select-none text-[16px] leading-[1.5] text-pretty sm:text-[17px] ${
            LIGHT_TEXT
              ? "font-medium text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.75),0_0_20px_rgba(0,0,0,0.6)]"
              : HERO_PHOTO
                ? "text-[#102233]"
                : "text-ink-70"
          }`}
          style={delay(0.16)}
        >
          {hero.body}
        </p>

        <div className="rise mt-7 flex flex-wrap items-center justify-center gap-3" style={delay(0.24)}>
          <Button href={hero.primary.href} size="lg">
            {hero.primary.label}
          </Button>
          <Button href={hero.secondary.href} size="lg" variant="light">
            {hero.secondary.label}
          </Button>
        </div>
      </Container>

      {/* Floating proof card, mirrors the reference's headline stat bar */}
      <Container className="relative pb-[70px]">
        <div
          className="rise mx-auto flex max-w-[800px] flex-col gap-5 rounded-[var(--radius-card)] bg-white/94 px-6 py-5 shadow-[var(--shadow-float)] backdrop-blur-sm sm:flex-row sm:items-center sm:gap-5 sm:px-6"
          style={delay(0.34)}
        >
          <span className="text-[32px] leading-none font-medium tracking-[-0.035em] sm:text-[36px]">
            {hero.stat.value}
          </span>
          <div className="flex-1">
            <p className="text-[14px] font-medium text-ink">{hero.stat.title}</p>
            <p className="mt-0.5 text-[13px] text-muted">{hero.stat.sub}</p>
          </div>
          <ArrowLink href={hero.stat.link.href} className="shrink-0 text-[13px]">
            {hero.stat.link.label}
          </ArrowLink>
        </div>
      </Container>
    </section>
  );
}
