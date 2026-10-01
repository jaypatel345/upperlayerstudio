import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { contact } from "@/lib/pages";
import { site } from "@/lib/site";

/**
 * Scheduler plus email fallback. While site.scheduler is empty there is
 * nothing to embed, so a holding card shows instead of an iframe pointing
 * nowhere. Set site.scheduler to the real booking URL (Calendly, Cal.com…)
 * and this swaps to the live embed on its own.
 */
export function BookingPanel() {
  const live = /^https?:\/\//.test(site.scheduler);

  return (
    <Section id="book-a-call" pad="sm" className="pt-0 sm:pt-0">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-[900px] overflow-hidden rounded-[var(--radius-lg)] border border-line bg-white">
            {live ? (
              <iframe
                src={site.scheduler}
                title="Book a call"
                loading="lazy"
                className="block h-[720px] w-full border-0"
              />
            ) : (
              <div className="flex min-h-[420px] flex-col items-center justify-center gap-5 bg-tint px-6 py-16 text-center">
                <h2 className="text-[24px] sm:text-[28px]">Scheduler coming online</h2>
                <p className="max-w-[44ch] text-[15px] leading-[1.6] text-muted text-pretty">
                  The calendar isn&apos;t connected yet. Email the studio and I&apos;ll send a time
                  over.
                </p>
                <Button href={`mailto:${site.email}`} size="lg">
                  Email the studio
                </Button>
              </div>
            )}
          </div>
        </Reveal>

        <p className="mx-auto mt-8 max-w-[900px] text-center text-[15px] leading-[1.6] text-muted text-pretty">
          {contact.direct.prompt}{" "}
          <a
            href={`mailto:${site.email}`}
            className="font-medium text-ink underline underline-offset-4"
          >
            {site.email}
          </a>
        </p>
      </Container>
    </Section>
  );
}
