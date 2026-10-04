import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/site";

/**
 * The scheduler embed. While site.scheduler is empty there is nothing to
 * embed, so a holding card shows instead of an iframe pointing nowhere. Set
 * site.scheduler to the real booking URL (Calendly, Cal.com…) and this swaps
 * to the live embed on its own.
 */
export function BookingPanel() {
  const live = /^https?:\/\//.test(site.scheduler);

  return (
    <Reveal>
      <div id="book-a-call" className="mt-10 scroll-mt-24 overflow-hidden rounded-2xl bg-white">
        {live ? (
          <iframe
            src={site.scheduler}
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
