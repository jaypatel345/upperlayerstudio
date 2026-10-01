import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { SkyPlate } from "@/components/ui/SkyPlate";
import { serviceDetails, servicesIndex } from "@/lib/services";

/**
 * The /services index proper: each service as an alternating art-plate / copy
 * row on dark, mirroring the reference's "what we do" block.
 *
 * Each row carries an id so the nav's /services#automation style anchors land
 * on the right service, as well as the per-service pages linking out.
 */
export function ServiceShowcase() {
  return (
    <Section tone="dark" pad="lg">
      <Container>
        <Reveal className="flex flex-col items-center text-center">
          <Eyebrow className="text-white/45">{servicesIndex.showcase.eyebrow}</Eyebrow>
          <h2 className="mt-4 max-w-[22ch] text-[32px] leading-[1.06] text-white sm:text-[44px] lg:text-[52px]">
            {servicesIndex.showcase.title}
          </h2>
          <p className="mt-6 max-w-[56ch] text-[16px] leading-[1.6] text-white/60 text-pretty">
            {servicesIndex.showcase.body}
          </p>
        </Reveal>

        <div className="mt-16 space-y-4 sm:mt-20 sm:space-y-6">
          {serviceDetails.map((s, i) => (
            <Reveal key={s.slug} delay={0.06}>
              <article
                id={s.slug}
                className="grid scroll-mt-24 items-center gap-8 rounded-[var(--radius-lg)] border border-line-light bg-[rgba(255,255,255,0.03)] p-5 sm:p-6 lg:grid-cols-2 lg:gap-12 lg:p-7"
              >
                {/* Art plate alternates side on desktop so the page has rhythm */}
                <SkyPlate
                  variant={s.art.sky}
                  label={s.art.label}
                  className={[
                    "aspect-[16/10] rounded-[var(--radius-card)]",
                    i % 2 === 1 ? "lg:order-2" : "",
                  ].join(" ")}
                />

                <div className="lg:px-4">
                  <span className="text-[13px] font-medium text-white/45">{s.n}</span>
                  <h3 className="mt-3 text-[26px] leading-[1.1] text-white sm:text-[32px]">
                    {s.name}
                  </h3>
                  <p className="mt-4 max-w-[48ch] text-[16px] leading-[1.65] text-white/65 text-pretty">
                    {s.hero.body}
                  </p>

                  <ul className="mt-6 flex flex-wrap gap-2">
                    {s.hero.tags.map((t) => (
                      <li
                        key={t}
                        className="rounded-full border border-line-light bg-white/5 px-3 py-1.5 text-[13px] text-white/70"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={`/services/${s.slug}`}
                    className="group mt-8 inline-flex items-center gap-1.5 text-[14px] font-medium text-white underline-offset-4 hover:underline"
                  >
                    Explore {s.name}
                    <span
                      aria-hidden
                      className="transition-transform duration-200 ease-[var(--ease-out-soft)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    >
                      ↗
                    </span>
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
