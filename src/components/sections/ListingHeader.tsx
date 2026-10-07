import { Eyebrow } from "@/components/ui/Eyebrow";

/**
 * The reference's header for its listing pages (Work, The Lab): a small
 * eyebrow over one large left-aligned word, and nothing else competing with
 * the grid underneath. pt clears the fixed navbar.
 */
export function ListingHeader({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body?: string;
}) {
  const delay = (s: number) => ({ "--rise-delay": `${s}s` }) as React.CSSProperties;

  return (
    <header className="mx-auto max-w-[1440px] px-6 pt-32 pb-12 sm:pt-[176px] sm:pb-14 lg:px-32 lg:pb-20">
      <div className="rise" style={delay(0)}>
        <Eyebrow>{eyebrow}</Eyebrow>
      </div>
      <h1
        className="rise mt-4 text-[44px] leading-[1.06] tracking-[-0.04em] sm:text-[68px]"
        style={delay(0.08)}
      >
        {title}
      </h1>
      {body && (
        <p
          className="rise mt-5 max-w-[620px] text-[16px] leading-[1.6] text-ink-70 text-pretty sm:text-[17px]"
          style={delay(0.16)}
        >
          {body}
        </p>
      )}
    </header>
  );
}
