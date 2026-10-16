import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { hero } from "@/lib/site";
import { MediaImage } from "@/components/ui/MediaImage";
import { HeroParallax } from "./HeroParallax";

// Photo behind the hero. null leaves the hero on the plain page background.
const HERO_PHOTO: string | null = "/hero/edgar-torabyan-KjMBQey6OiU-unsplash.jpg";

// A 24px copy of HERO_PHOTO, inlined so the sky paints with the HTML while the
// full photo is still on its way (and the white copy is never on bare white).
// Regenerate it whenever the photo changes; null skips the placeholder.
const HERO_BLUR: string | null =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCAAQABgDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/bAEMACQkJCQkJEAkJEBYQEBAWHhYWFhYeJh4eHh4eJi4mJiYmJiYuLi4uLi4uLjc3Nzc3N0BAQEBASEhISEhISEhISP/bAEMBCwwMEhESHxERH0szKjNLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS//dAAQAAv/aAAwDAQACEQMRAD8A6/ZmjyjWmRZMN6xbV5yQ/HFDtZkkKoI46Dn/AOxru9ujj9jIzNlFXAbcAZhLDJyWJ6fhRR7ZC9jI//9k=";

/** Server component — no JS on the critical path. */
export function Hero() {
  const delay = (s: number) => ({ "--rise-delay": `${s}s` }) as React.CSSProperties;

  return (
    <section className="relative isolate overflow-hidden pt-[60px]">
      {/* The photo stops ~48px under the stat card and masks out over its last 30%, like BrightStudios */}
      {HERO_PHOTO && (
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 bottom-0 -z-10 overflow-hidden [mask-image:linear-gradient(180deg,#000_0%,#000_70%,rgba(0,0,0,0.6)_82%,rgba(0,0,0,0.25)_91%,transparent_100%)]">
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
              className="object-cover object-top -scale-x-100"
            />
          </HeroParallax>
        </div>
      )}

      <Container className="relative flex flex-col items-center pt-14 pb-10 text-center sm:pt-20 sm:pb-14">
        <div className="rise select-none" style={delay(0)}>
          <Pill className="px-[14px]! py-1.5! text-[14px]! font-normal!">{hero.badge}</Pill>
        </div>

        {/* Two deliberate lines — text-wrap:balance is off here so the colour
            split always lands in the same place. */}
        <h1
          className="rise mt-5 max-w-[36ch] select-none text-[32px] leading-[1.12] tracking-[-0.025em] sm:text-[44px] sm:leading-[1.1] lg:text-[52px]"
          style={delay(0)}
        >
          <span className="block text-white">
            {hero.headline.lead}
          </span>
          <span className="block mt-1 sm:mt-1.5 text-[#c7e9f8]">
            {hero.headline.trail}
          </span>
        </h1>

        <p
          className="rise mt-6 max-w-[620px] select-none text-[16px] leading-[1.65] text-pretty text-white/70 sm:text-[17px]"
          style={delay(0.05)}
        >
          {hero.body}
        </p>

        <div className="rise mt-7 flex flex-wrap items-center justify-center gap-3" style={delay(0.1)}>
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
          style={delay(0.15)}
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
