import type { Metadata } from "next";
import { BookingPanel } from "@/components/sections/BookingPanel";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { contact } from "@/lib/pages";

export const metadata: Metadata = {
  title: contact.meta.title,
  description: contact.meta.description,
  alternates: { canonical: "/contact" },
};

/**
 * Mirrors the reference's book-a-call page: one headline, one line of copy,
 * the scheduler, and an email fallback. Nothing else competes with the call.
 */
export default function ContactPage() {
  const delay = (s: number) => ({ "--rise-delay": `${s}s` }) as React.CSSProperties;

  return (
    <>
      <section className="relative isolate overflow-hidden pt-[60px]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px]"
          style={{
            background:
              "radial-gradient(70% 120% at 50% -20%, rgba(125,182,238,0.22) 0%, transparent 65%)",
          }}
        />
        <Container className="flex flex-col items-center pt-16 pb-12 text-center sm:pt-24 sm:pb-14">
          <div className="rise" style={delay(0)}>
            <Eyebrow>{contact.hero.eyebrow}</Eyebrow>
          </div>
          <h1
            className="rise mt-5 max-w-[22ch] text-[34px] leading-[1.06] sm:text-[50px] sm:leading-[1.03] lg:text-[58px]"
            style={delay(0.08)}
          >
            <span className="block">{contact.hero.headline.lead}</span>
            <span className="block text-[rgba(10,10,10,0.45)]">{contact.hero.headline.trail}</span>
          </h1>
          <p
            className="rise mt-6 max-w-[560px] text-[16px] leading-[1.6] text-ink-70 text-pretty sm:text-[17px]"
            style={delay(0.16)}
          >
            {contact.hero.body}
          </p>
        </Container>
      </section>
      <BookingPanel />
    </>
  );
}
