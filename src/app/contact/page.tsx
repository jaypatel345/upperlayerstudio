import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Image from "next/image";
import { BookingPanel } from "@/components/sections/BookingPanel";
import { ContactForm } from "@/components/sections/ContactForm";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { contact } from "@/lib/pages";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMeta({ title: contact.meta.title, description: contact.meta.description, path: "/contact" });

/**
 * Mirrors the reference's book-a-call page: a left-aligned reading column with
 * the headline, one line of copy, a sky banner, a short project form (feeds the
 * AI lead agent) and the email fallback, then the scheduler at full width
 * beneath it.
 */
export default function ContactPage() {
  const delay = (s: number) => ({ "--rise-delay": `${s}s` }) as React.CSSProperties;

  return (
    <Container size="wide" className="pt-[124px] pb-24 sm:pt-[144px]">
      <div className="max-w-[680px]">
        <h1 className="rise text-[38px] leading-[1.06] sm:text-[54px]" style={delay(0)}>
          {contact.hero.title}
        </h1>
        <p
          className="rise mt-6 text-[16px] leading-[1.5] text-ink-70 text-pretty sm:text-[17px]"
          style={delay(0.08)}
        >
          {contact.hero.body}
        </p>

        <div className="rise relative mt-6 h-[160px] overflow-hidden rounded-lg" style={delay(0.16)}>
          <Image
            src="/hero/sky-1.jpg"
            alt=""
            fill
            priority
            sizes="(min-width: 768px) 680px, 100vw"
            className="object-cover object-[center_55%]"
          />
        </div>

        <div className="rise mt-6" style={delay(0.2)}>
          <ContactForm />
        </div>

        <section className="rise mt-6 rounded-lg bg-tint p-6" style={delay(0.24)}>
          <p className="text-[17px] font-medium tracking-[-0.025em]">{contact.direct.prompt}</p>
          <p className="mt-1 text-[16px] leading-[1.5] text-ink-70">{contact.direct.promptBody}</p>
          <Button href={`mailto:${site.email}`} className="mt-6 h-[45px] px-[18px] text-[15px]">
            Email the studio
          </Button>
        </section>

        <a
          href={`mailto:${site.email}`}
          className="rise mt-6 inline-block text-[15px] font-medium tracking-[-0.01em] transition-opacity hover:opacity-70"
          style={delay(0.3)}
        >
          {site.email}
        </a>
      </div>

      <BookingPanel />
    </Container>
  );
}
