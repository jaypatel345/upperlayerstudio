import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { LogoMark } from "@/components/ui/LogoMark";
import { Button } from "@/components/ui/Button";
import { SkyBackdrop } from "@/components/sections/SkyBackdrop";
import { LocalTime } from "./LocalTime";
import { site, footer } from "@/lib/site";

/**
 * Full-height footer, in five bands: brand statement, the booking panel, the
 * AI-engine row, the link columns, and the baseline.
 *
 * The sky band at the top is the same component used for every art plate on the
 * site — it stops the dark block starting abruptly against a white section, and
 * it is the one place the imagery runs the full width of the page.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative isolate overflow-hidden bg-dark text-white">
      {/* Sky band — the hero's own backdrop, cropped.
          The inner box is rendered tall and the band clips it, so what shows is
          the top of the same sky that opens the page: saturated blue and the
          cloud mass, rather than a second sky that merely resembles it. */}
      <div aria-hidden className="relative h-[180px] w-full overflow-hidden sm:h-[240px]">
        <div className="absolute inset-x-0 top-0 h-[460px]">
          <SkyBackdrop horizon={false} />
        </div>
        {/* Dissolve into the footer, the way the hero dissolves into the page.
            Held back until just past halfway so the band shows actual sky
            rather than a blue haze under a scrim. */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(23,23,23,0.06)_52%,rgba(23,23,23,0.58)_80%,#171717_100%)]" />
      </div>

      <Container size="wide" className="pt-14 pb-10 sm:pt-16">
        {/* Band 1 — brand statement */}
        <div className="grid gap-12 border-b border-line-light pb-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
          <div>
            <div className="flex items-center gap-2.5">
              <LogoMark className="h-7 w-7" />
              <span className="text-[19px] font-medium tracking-[-0.035em]">
                {site.wordmark}
                <sup className="relative top-[-0.5em] ml-px text-[9px]">{site.wordmarkSuffix}</sup>
              </span>
            </div>
            <p className="mt-6 max-w-[34ch] text-[22px] leading-[1.3] tracking-[-0.035em] text-white/90 sm:text-[27px]">
              {site.tagline}
            </p>
            <p className="mt-5 text-[14px] text-white/50">
              AI automation, voice agents and product build
            </p>
            <p className="mt-1.5 text-[14px] text-white/50">{site.location}</p>
          </div>

          <div className="lg:justify-self-end lg:text-right">
            <p className="text-[14px] text-white/50">Automation + Build</p>
            <p className="mt-3 max-w-[18ch] text-[26px] leading-[1.18] tracking-[-0.035em] text-pretty sm:text-[32px] lg:ml-auto">
              Make your operation easier to run
            </p>
            <div className="mt-8 flex flex-wrap gap-3 lg:justify-end">
              <Button href={site.book} variant="light" size="lg">
                Book a call
              </Button>
              <Button
                href={`mailto:${site.email}`}
                size="lg"
                className="border border-white/20 bg-white/5 text-white hover:bg-white/10"
              >
                {site.email}
              </Button>
            </div>
          </div>
        </div>

        {/* Band 2 — look us up on AI engines */}
        <div className="flex flex-col gap-5 border-b border-line-light py-10 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[15px] font-medium text-white/90">Look the studio up on AI engines</p>
            <p className="mt-1 text-[14px] text-white/45">
              Opens a research prompt — including the parts I&apos;d rather you checked.
            </p>
          </div>
          <ul className="flex flex-wrap gap-2">
            {footer.aiEngines.map((engine) => (
              <li key={engine.label}>
                <a
                  href={`${engine.base}${encodeURIComponent(footer.aiPrompt)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex rounded-full border border-white/14 bg-white/5 px-4 py-1.5 text-[13px] font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {engine.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Band 3 — link columns */}
        <div className="grid gap-10 border-b border-line-light py-14 sm:grid-cols-2 lg:grid-cols-5">
          {footer.columns.map((col) => (
            <div key={col.title}>
              <p className="text-[13px] font-medium text-white/45">{col.title}</p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-[15px] text-white/80 transition-colors hover:text-white"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <p className="text-[13px] font-medium text-white/45">Social</p>
            <ul className="mt-4 space-y-2.5">
              {site.socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="me noreferrer"
                    className="text-[15px] text-white/80 transition-colors hover:text-white"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[13px] font-medium text-white/45">Studio</p>
            <p className="mt-4 text-[15px] text-white/80">{site.location}</p>
            <LocalTime className="mt-1 text-[15px] text-white/45" />
            <p className="mt-4 max-w-[24ch] text-[14px] text-white/45 text-pretty">
              One person, start to finish. You talk to whoever writes the code.
            </p>
          </div>
        </div>

        {/* Band 4 — baseline */}
        <div className="flex flex-col gap-4 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13px] text-white/40">
            © {site.name} {year}
          </p>
          <div className="flex flex-wrap gap-6">
            <Link
              href="/privacy"
              className="text-[13px] text-white/40 transition-colors hover:text-white/70"
            >
              Privacy policy
            </Link>
            <Link
              href="/terms"
              className="text-[13px] text-white/40 transition-colors hover:text-white/70"
            >
              Terms of use
            </Link>
          </div>
        </div>
      </Container>

      {/* Oversized wordmark, clipped by the page edge */}
      <div aria-hidden className="pointer-events-none select-none overflow-hidden px-5 sm:px-8">
        <p className="-mb-[0.22em] w-full text-center text-[18vw] leading-[0.8] font-medium tracking-[-0.055em] text-white/[0.055]">
          {site.wordmark}
        </p>
      </div>
    </footer>
  );
}
