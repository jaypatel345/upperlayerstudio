import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";

type Props = {
  eyebrow: string;
  headline: { lead: string; trail: string };
  body: string;
  tags?: string[];
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
};

/**
 * Hero for inner pages. Deliberately white rather than reusing the homepage's
 * SkyBackdrop: the sky marks the front door, and keeping it there is what stops
 * every page feeling like the homepage. Everything else — the two-tone
 * headline, the button pair, the trailing capability line — is unchanged.
 *
 * pt-[60px] clears the fixed navbar, matching Hero.
 */
export function PageHero({ eyebrow, headline, body, tags, primary, secondary }: Props) {
  const delay = (s: number) => ({ "--rise-delay": `${s}s` }) as React.CSSProperties;

  return (
    <section className="relative isolate overflow-hidden border-b border-line pt-[60px]">
      {/* A whisper of the hero sky, so inner pages still read as the same site */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px]"
        style={{
          background:
            "radial-gradient(70% 120% at 50% -20%, rgba(125,182,238,0.22) 0%, transparent 65%)",
        }}
      />

      <Container className="flex flex-col items-center pt-16 pb-14 text-center sm:pt-24 sm:pb-20">
        <div className="rise" style={delay(0)}>
          <Eyebrow>{eyebrow}</Eyebrow>
        </div>

        <h1
          className="rise mt-5 max-w-[22ch] text-[34px] leading-[1.06] sm:text-[50px] sm:leading-[1.03] lg:text-[58px]"
          style={delay(0.08)}
        >
          <span className="block">{headline.lead}</span>
          <span className="block text-[rgba(10,10,10,0.45)]">{headline.trail}</span>
        </h1>

        <p
          className="rise mt-6 max-w-[620px] text-[16px] leading-[1.6] text-ink-70 text-pretty sm:text-[17px]"
          style={delay(0.16)}
        >
          {body}
        </p>

        <div className="rise mt-8 flex flex-wrap items-center justify-center gap-3" style={delay(0.24)}>
          <Button href={primary.href} size="lg">
            {primary.label}
          </Button>
          {secondary && (
            <Button href={secondary.href} size="lg" variant="light">
              {secondary.label}
            </Button>
          )}
        </div>

        {tags && tags.length > 0 && (
          <p className="rise mt-7 text-[13px] text-muted" style={delay(0.3)}>
            {tags.join(" · ")}
          </p>
        )}
      </Container>
    </section>
  );
}
