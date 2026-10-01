import { Container } from "@/components/ui/Container";
import { collaborators } from "@/lib/site";

/**
 * How many times the name list is repeated inside each animated half.
 *
 * The animation translates the track by exactly -50%, so one loop travels the
 * width of a single half. For the loop to be invisible, that half must be at
 * least as wide as the viewport — otherwise the track runs out of names before
 * it resets and a blank gap opens at the right edge.
 *
 * One set of names measures ~1030px, so 4 sets covers screens up to ~4100px.
 * Raise this if the list ever gets shorter.
 */
const SETS_PER_HALF = 4;

/** Seconds a single set takes to cross. Total duration scales with the repeats
 *  so adding sets changes the loop length, never the perceived speed. */
const SECONDS_PER_SET = 38;

/** "Selected collaborations" — an infinite marquee of stack/partner names. */
export function LogoStrip() {
  const half = Array.from({ length: SETS_PER_HALF }, () => collaborators).flat();
  const row = [...half, ...half];

  return (
    <div className="border-y border-line bg-surface py-10">
      <Container>
        <p className="mb-8 text-center text-[13px] font-medium text-muted">
          Built with the tools your team already trusts
        </p>
      </Container>

      <div className="marquee-mask relative overflow-hidden">
        <div
          className="animate-marquee flex w-max items-center gap-14 pr-14"
          style={
            {
              "--marquee-duration": `${SETS_PER_HALF * SECONDS_PER_SET}s`,
            } as React.CSSProperties
          }
        >
          {row.map((name, i) => (
            <span
              key={`${name}-${i}`}
              aria-hidden={i >= collaborators.length}
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
