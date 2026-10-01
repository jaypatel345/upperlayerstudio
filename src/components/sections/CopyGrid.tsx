import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { FeatureGrid, type Feature } from "@/components/ui/FeatureGrid";
import { Reveal } from "@/components/ui/Reveal";

type Props = {
  eyebrow: string;
  title: string;
  body?: string;
  items: Feature[];
  tone?: "white" | "tint" | "dark";
  cols?: 2 | 3;
  align?: "left" | "center";
  id?: string;
  className?: string;
};

/**
 * Section header plus a FeatureGrid — the shape four of the five inner-page
 * sections wanted. Written once here so /work, /studio and /contact can't drift
 * apart from each other, or from the service pages they sit beside.
 */
export function CopyGrid({
  eyebrow,
  title,
  body,
  items,
  tone = "white",
  cols = 3,
  align = "left",
  id,
  className,
}: Props) {
  const dark = tone === "dark";

  return (
    <Section id={id} tone={tone} pad="lg" className={className}>
      <Container>
        <Reveal className={align === "center" ? "flex flex-col items-center text-center" : ""}>
          {dark ? (
            <>
              <Eyebrow className="text-white/45">{eyebrow}</Eyebrow>
              <h2 className="mt-4 max-w-[22ch] text-[32px] leading-[1.06] text-white sm:text-[44px] lg:text-[52px]">
                {title}
              </h2>
              {body && (
                <p className="mt-6 max-w-[56ch] text-[16px] leading-[1.6] text-white/60 text-pretty">
                  {body}
                </p>
              )}
            </>
          ) : (
            <SectionHeader eyebrow={eyebrow} title={title} body={body} align={align} />
          )}
        </Reveal>

        <FeatureGrid items={items} tone={dark ? "dark" : "light"} cols={cols} className="mt-14" />
      </Container>
    </Section>
  );
}
