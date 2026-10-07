import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Reveal } from "@/components/ui/Reveal";
import { cta } from "@/lib/site";
import { cn } from "@/lib/cn";

/**
 * Closing call to action: a frosted glass card over a hills-and-sky photo,
 * so the page ends on open sky and landscape. The photo is masked at the top and
 * bottom to dissolve into the white sections either side instead of starting
 * on a hard edge.
 *
 * `after` is the tone of the section above, so the top fade lands on that
 * colour rather than leaving a seam.
 */
export function CTA({ after = "white" }: { after?: "white" | "tint" }) {
  return (
    <section
      id="book-a-call"
      className={cn(
        // 600px tall like BrightStudios' closing image; the card sits centred in it
        "relative isolate flex min-h-[600px] items-center overflow-hidden py-20 sm:py-[88px]",
        after === "tint" ? "bg-[linear-gradient(180deg,var(--color-tint)_0%,var(--color-surface)_60%)]" : "bg-surface",
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 [mask-image:linear-gradient(180deg,transparent_0%,#000_5%,#000_94%,transparent_100%)]"
      >
        <Image
          src="/hero/cta-hills-4k.jpg"
          alt=""
          fill
          sizes="100vw"
          quality={90}
          className="object-cover object-bottom"
        />
      </div>

      <Container>
        <Reveal>
          <div className="mx-auto max-w-[900px] rounded-2xl bg-[linear-gradient(125deg,rgba(255,255,255,0.82)_0%,rgba(255,255,255,0.62)_45%,rgba(247,251,253,0.7)_100%)] px-6 py-10 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.96),inset_1px_0_0_rgba(255,255,255,0.68),inset_0_-1px_0_rgba(255,255,255,0.7),0_8px_32px_rgba(31,50,61,0.06)] backdrop-blur-[5px] backdrop-saturate-[1.18] sm:p-8">
            <Eyebrow className="text-[#24596d]">{cta.eyebrow}</Eyebrow>
            <h2 className="mx-auto mt-3 text-[30px] leading-[1.1] sm:text-[40px]">{cta.title}</h2>
            <p className="mx-auto mt-4 max-w-[44ch] text-[16px] leading-[1.55] text-ink text-pretty sm:text-[17px]">
              {cta.body}
            </p>
            <div className="mt-8 flex flex-col items-center gap-4">
              <Button href={cta.primary.href} size="lg">
                {cta.primary.label}
              </Button>
              <ArrowLink href={cta.secondary.href} className="text-[13px] text-ink-70">
                {cta.secondary.label}
              </ArrowLink>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
