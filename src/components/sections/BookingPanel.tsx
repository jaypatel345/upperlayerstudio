"use client";

import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/site";
import { useLead } from "./LeadContext";

/**
 * The scheduler embed. While site.scheduler is empty there is nothing to
 * embed, so a holding card shows instead of an iframe pointing nowhere. Set
 * site.scheduler to the real booking URL (Calendly, Cal.com…) and this swaps
 * to the live embed on its own.
 *
 * Once the contact form has been sent, the embed reloads pre-filled with the
 * visitor's name, email and message (Cal.com reads them from the query).
 */
export function BookingPanel() {
  const { lead } = useLead();
  const live = /^https?:\/\//.test(site.scheduler);

  let src: string = site.scheduler;
  if (live && lead) {
    const url = new URL(site.scheduler);
    url.searchParams.set("name", lead.name);
    url.searchParams.set("email", lead.email);
    url.searchParams.set("notes", lead.message.slice(0, 500));
    src = url.toString();
  }

  return (
    <Reveal>
      <div id="book-a-call" className="mt-10 scroll-mt-24 overflow-hidden rounded-2xl bg-white">
        {live ? (
          <iframe
            key={src}
            src={src}
            title="Book a call"
            loading="lazy"
            className="block h-[840px] w-full border-0"
          />
        ) : (
          <div className="flex min-h-[420px] flex-col items-center justify-center gap-5 bg-tint px-6 py-16 text-center">
            <h2 className="text-[24px] sm:text-[28px]">Scheduler coming online</h2>
            <p className="max-w-[44ch] text-[15px] leading-[1.6] text-muted text-pretty">
              The calendar isn&apos;t connected yet. Email the studio and I&apos;ll send a time over.
            </p>
            <Button href={`mailto:${site.email}`} size="lg">
              Email the studio
            </Button>
          </div>
        )}
      </div>
    </Reveal>
  );
}
