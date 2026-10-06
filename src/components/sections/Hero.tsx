import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { SkyBackdrop } from "./SkyBackdrop";
import { hero } from "@/lib/site";
import Image from "next/image";

// Photo in public/hero behind the hero. null falls back to the CSS sky.
const HERO_PHOTO: number | null = 1;

// A 24px copy of sky-1.jpg, inlined so the sky paints with the HTML while the
// full photo is still on its way. Regenerate it if the photo changes.
const HERO_BLUR =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QCARXhpZgAATU0AKgAAAAgABAEaAAUAAAABAAAAPgEbAAUAAAABAAAARgEoAAMAAAABAAIAAIdpAAQAAAABAAAATgAAAAAAAABIAAAAAQAAAEgAAAABAAOgAQADAAAAAQABAACgAgAEAAAAAQAAABigAwAEAAAAAQAAABAAAAAA/8IAEQgAEAAYAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAMCBAEFAAYHCAkKC//EAMMQAAEDAwIEAwQGBAcGBAgGcwECAAMRBBIhBTETIhAGQVEyFGFxIweBIJFCFaFSM7EkYjAWwXLRQ5I0ggjhU0AlYxc18JNzolBEsoPxJlQ2ZJR0wmDShKMYcOInRTdls1V1pJXDhfLTRnaA40dWZrQJChkaKCkqODk6SElKV1hZWmdoaWp3eHl6hoeIiYqQlpeYmZqgpaanqKmqsLW2t7i5usDExcbHyMnK0NTV1tfY2drg5OXm5+jp6vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAQIAAwQFBgcICQoL/8QAwxEAAgIBAwMDAgMFAgUCBASHAQACEQMQEiEEIDFBEwUwIjJRFEAGMyNhQhVxUjSBUCSRoUOxFgdiNVPw0SVgwUThcvEXgmM2cCZFVJInotIICQoYGRooKSo3ODk6RkdISUpVVldYWVpkZWZnaGlqc3R1dnd4eXqAg4SFhoeIiYqQk5SVlpeYmZqgo6SlpqeoqaqwsrO0tba3uLm6wMLDxMXGx8jJytDT1NXW19jZ2uDi4+Tl5ufo6ery8/T19vf4+fr/2wBDAAQEBAQEBAYEBAYJBgYGCQwJCQkJDA8MDAwMDA8SDw8PDw8PEhISEhISEhIVFRUVFRUZGRkZGRwcHBwcHBwcHBz/2wBDAQQFBQcHBwwHBwwdFBAUHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR3/2gAMAwEAAhEDEQAAAa5t7XV+3855gr1gqa//2gAIAQEAAQUCMZrixCtpxS5EWGUUpw//2gAIAQMRAT8Bl8afIkj48f4z/9oACAECEQE/AY9aP8VPWH/Ff//aAAgBAQAGPwLQdq46OiKJDylR1PSiUjh8n//EADMQAQADAAICAgICAwEBAAACCwERACExQVFhcYGRobHB8NEQ4fEgMEBQYHCAkKCwwNDg/9oACAEBAAE/IWKZOssrF3Rteb61NBC3Mn5i8p+lQv8A/9oADAMBAAIRAxEAABBeL//EADMRAQEBAAMAAQIFBQEBAAEBCQEAESExEEFRYSBx8JGBobHRweHxMEBQYHCAkKCwwNDg/9oACAEDEQE/ECmHfuYf7sR/qf5v/9oACAECEQE/EFOK/i1P+3/L/9oACAEBAAE/EGCavwHx4Oa9RUKDRYmPfmkrH2AFcYI5Q9U24PC1iEG93haiBCfZ69s3/9k=";

/** Server component — no JS on the critical path. */
export function Hero() {
  const delay = (s: number) => ({ "--rise-delay": `${s}s` }) as React.CSSProperties;

  return (
    <section className="relative isolate overflow-hidden pt-[60px]">
      {HERO_PHOTO ? (
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <Image
            src={`/hero/sky-${HERO_PHOTO}.jpg`}
            alt=""
            fill
            preload
            fetchPriority="high"
            placeholder={HERO_PHOTO === 1 ? "blur" : "empty"}
            blurDataURL={HERO_PHOTO === 1 ? HERO_BLUR : undefined}
            sizes="100vw"
            className="object-cover object-top"
          />
          {/* Same horizon fade as the CSS sky so the photo melts into the page */}
          <div className="absolute inset-x-0 bottom-0 h-[32%] bg-[linear-gradient(180deg,transparent_0%,rgba(255,255,255,0.55)_42%,rgba(255,255,255,0.92)_76%,#ffffff_100%)]" />
        </div>
      ) : (
        <SkyBackdrop />
      )}

      <Container className="relative flex flex-col items-center pt-14 pb-10 text-center sm:pt-20 sm:pb-12">
        <div className="rise select-none" style={delay(0)}>
          <Pill>{hero.badge}</Pill>
        </div>

        {/* Two deliberate lines — text-wrap:balance is off here so the colour
            split always lands in the same place. */}
        <h1
          className="rise mt-7 max-w-[22ch] select-none text-[34px] leading-[1.06] sm:text-[50px] sm:leading-[1.03] lg:text-[62px]"
          style={delay(0.08)}
        >
          <span className="block">{hero.headline.lead}</span>
          <span className="block text-[rgba(10,10,10,0.45)]">{hero.headline.trail}</span>
        </h1>

        <p
          className="rise mt-6 max-w-[600px] select-none text-[16px] leading-[1.6] text-ink-70 text-pretty sm:text-[17px]"
          style={delay(0.16)}
        >
          {hero.body}
        </p>

        <div className="rise mt-8 flex flex-wrap items-center justify-center gap-3" style={delay(0.24)}>
          <Button href={hero.primary.href} size="lg">
            {hero.primary.label}
          </Button>
          <Button href={hero.secondary.href} size="lg" variant="light">
            {hero.secondary.label}
          </Button>
        </div>
      </Container>

      {/* Floating proof card, mirrors the reference's headline stat bar */}
      <Container className="relative pb-16 sm:pb-24">
        <div
          className="rise mx-auto flex max-w-[1080px] flex-col gap-5 rounded-[var(--radius-card)] bg-white/94 px-6 py-6 shadow-[var(--shadow-float)] backdrop-blur-sm sm:flex-row sm:items-center sm:gap-8 sm:px-8"
          style={delay(0.34)}
        >
          <span className="text-[38px] leading-none font-medium tracking-[-0.045em] sm:text-[44px]">
            {hero.stat.value}
          </span>
          <div className="flex-1">
            <p className="text-[15px] font-medium text-ink">{hero.stat.title}</p>
            <p className="mt-0.5 text-[14px] text-muted">{hero.stat.sub}</p>
          </div>
          <ArrowLink href={hero.stat.link.href} className="shrink-0 text-[14px]">
            {hero.stat.link.label}
          </ArrowLink>
        </div>
      </Container>
    </section>
  );
}
