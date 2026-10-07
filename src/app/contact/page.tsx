import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Image from "next/image";
import { BookingPanel } from "@/components/sections/BookingPanel";
import { ContactForm } from "@/components/sections/ContactForm";
import { LeadProvider } from "@/components/sections/LeadContext";
import { Container } from "@/components/ui/Container";
import { contact } from "@/lib/pages";

export const metadata: Metadata = pageMeta({ title: contact.meta.title, description: contact.meta.description, path: "/contact" });

/**
 * Mirrors the reference's book-a-call page: a left-aligned reading column with
 * the headline and one line of copy, then the scheduler at full width — the
 * one primary action. Below it, under a sky banner, a short project form for
 * people who'd rather write first; it feeds the AI lead agent (email is its
 * fallback), and sending it pre-fills the scheduler with their details.
 */
export default function ContactPage() {
  const delay = (s: number) => ({ "--rise-delay": `${s}s` }) as React.CSSProperties;

  return (
    <LeadProvider>
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
          <a
            href="#enquiry"
            className="rise group mt-4 inline-flex items-center gap-2 text-[14px] tracking-[-0.01em]"
            style={delay(0.12)}
          >
            <span className="text-ink-70">{contact.form.jumpPrompt}</span>{" "}
            <span className="font-medium text-ink">{contact.form.jumpCta}</span>
            <span
              aria-hidden
              className="text-ink-70 transition-transform duration-200 ease-[var(--ease-out-soft)] group-hover:translate-y-0.5"
            >
              ↓
            </span>
          </a>
        </div>

        <BookingPanel />

        <section id="enquiry" className="mt-16 max-w-[680px] scroll-mt-24">
          <div className="relative h-[160px] overflow-hidden rounded-lg">
            <Image
              src="/hero/mountain-lake-4k.jpg"
              alt=""
              fill
              sizes="(min-width: 768px) 680px, 100vw"
              quality={90}
              className="object-cover object-[center_55%]"
            />
          </div>
          <div className="mt-6">
            <ContactForm />
          </div>
        </section>
      </Container>
    </LeadProvider>
  );
}
