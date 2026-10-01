import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

export type Feature = { n?: string; title: string; body: string };

type Props = {
  items: Feature[];
  tone?: "light" | "dark";
  cols?: 2 | 3;
  className?: string;
};

/**
 * The hairline card grid used across the inner pages.
 *
 * The seam is a 1px gap over a line-coloured background rather than a border on
 * each cell — that's what keeps the interior rules single-width and stops the
 * outer edge doubling up against the container border. Same construction as the
 * homepage process steps; this just makes it reusable.
 */
export function FeatureGrid({ items, tone = "light", cols = 3, className }: Props) {
  const dark = tone === "dark";

  return (
    <div
      className={cn(
        "grid gap-px overflow-hidden rounded-[var(--radius-card)] border",
        dark ? "border-line-light bg-[rgba(255,255,255,0.14)]" : "border-line bg-line",
        cols === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3",
        className,
      )}
    >
      {items.map((item, i) => (
        <Reveal key={item.title} delay={i * 0.06} className={dark ? "bg-dark" : "bg-white"}>
          <div className="flex h-full flex-col p-7 sm:p-8">
            {item.n && (
              <span className={cn("text-[13px] font-medium", dark ? "text-white/40" : "text-faint")}>
                {item.n}
              </span>
            )}
            <h3
              className={cn(
                "text-[19px] leading-[1.25] sm:text-[21px]",
                item.n && "mt-5",
                dark && "text-white",
              )}
            >
              {item.title}
            </h3>
            <p
              className={cn(
                "mt-3.5 max-w-[46ch] text-[15px] leading-[1.65] text-pretty",
                dark ? "text-white/60" : "text-muted",
              )}
            >
              {item.body}
            </p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
