import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { LogoMark } from "@/components/ui/LogoMark";
import { Button } from "@/components/ui/Button";
import { LocalTime } from "./LocalTime";
import { site, footer } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-dark text-white">
      <Container size="wide" className="pt-20 pb-10 sm:pt-24">
        {/* Top: brand statement + CTA */}
        <div className="grid gap-12 border-b border-line-light pb-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
          <div>
            <div className="flex items-center gap-2.5">
              <LogoMark className="h-7 w-7" />
              <span className="text-[19px] font-medium tracking-[-0.035em]">
                {site.wordmark}
                <sup className="ml-px text-[9px] top-[-0.5em] relative">{site.wordmarkSuffix}</sup>
              </span>
            </div>
            <p className="mt-6 max-w-[34ch] text-[19px] leading-[1.35] tracking-[-0.03em] text-white/90 sm:text-[22px]">
              {site.tagline}
            </p>
            <p className="mt-4 text-[14px] text-white/50">For teams building with AI</p>
          </div>

          <div className="lg:justify-self-end lg:text-right">
            <p className="text-[14px] text-white/50">Design + Build</p>
            <p className="mt-3 max-w-[18ch] text-[24px] leading-[1.2] tracking-[-0.035em] text-pretty sm:text-[28px] lg:ml-auto">
              Make your operation easier to run
            </p>
            <div className="mt-7 flex flex-wrap gap-3 lg:justify-end">
              <Button href={site.calendly} variant="light">
                Book a call
              </Button>
              <Button href={`mailto:${site.email}`} variant="ghost" className="text-white hover:bg-white/10">
                {site.email}
              </Button>
            </div>
          </div>
        </div>

        {/* Link columns */}
        <div className="grid gap-10 border-b border-line-light py-14 sm:grid-cols-2 lg:grid-cols-4">
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
                    className="text-[15px] text-white/80 transition-colors hover:text-white"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <p className="text-[13px] font-medium text-white/45">Studio</p>
              <p className="mt-3 text-[15px] text-white/80">{site.location}</p>
              <LocalTime className="mt-1 text-[15px] text-white/45" />
            </div>
          </div>
        </div>

        {/* Baseline */}
        <div className="flex flex-col gap-4 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13px] text-white/40">
            © {site.name} {new Date().getFullYear()}
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-[13px] text-white/40 transition-colors hover:text-white/70">
              Privacy policy
            </Link>
            <Link href="/terms" className="text-[13px] text-white/40 transition-colors hover:text-white/70">
              Terms of use
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
