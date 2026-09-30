import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { SkyBackdrop } from "./SkyBackdrop";
import { hero } from "@/lib/site";

/** Server component — no JS on the critical path. */
export function Hero() {
  const delay = (s: number) => ({ "--rise-delay": `${s}s` }) as React.CSSProperties;

  return (
    <section className="relative isolate overflow-hidden pt-[60px]">
      <SkyBackdrop />

      <Container className="relative flex flex-col items-center pt-14 pb-10 text-center sm:pt-20 sm:pb-12">
        <div className="rise" style={delay(0)}>
          <Pill>{hero.badge}</Pill>
        </div>

        {/* Two deliberate lines — text-wrap:balance is off here so the colour
            split always lands in the same place. */}
        <h1
          className="rise mt-7 max-w-[20ch] text-[38px] leading-[1.04] sm:text-[58px] sm:leading-[1.02] lg:text-[72px]"
          style={delay(0.08)}
        >
          <span className="block">{hero.headline.lead}</span>
          <span className="block text-[rgba(10,10,10,0.45)]">{hero.headline.trail}</span>
        </h1>

        <p
          className="rise mt-6 max-w-[600px] text-[16px] leading-[1.6] text-ink-70 text-pretty sm:text-[17px]"
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
