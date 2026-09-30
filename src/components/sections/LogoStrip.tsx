import { Container } from "@/components/ui/Container";
import { collaborators } from "@/lib/site";

/** "Selected collaborations" — an infinite marquee of stack/partner names. */
export function LogoStrip() {
  const row = [...collaborators, ...collaborators];

  return (
    <div className="border-y border-line bg-surface py-10">
      <Container>
        <p className="mb-8 text-center text-[13px] font-medium text-muted">
          Built with the tools your team already trusts
        </p>
      </Container>

      <div className="marquee-mask relative overflow-hidden">
        <div className="animate-marquee flex w-max items-center gap-14 pr-14">
          {row.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="text-[19px] font-medium tracking-[-0.035em] whitespace-nowrap text-[rgba(10,10,10,0.34)] transition-colors duration-300 hover:text-ink"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
