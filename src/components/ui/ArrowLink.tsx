import Link from "next/link";
import { cn } from "@/lib/cn";

type Props = {
  children: React.ReactNode;
  href: string;
  className?: string;
  /** "up" renders ↗ for detail pages, "right" renders → for in-flow next steps */
  direction?: "up" | "right";
};

export function ArrowLink({ children, href, className, direction = "up" }: Props) {
  const external = href.startsWith("http") || href.startsWith("mailto:");
  const inner = (
    <>
      <span>{children}</span>
      <span
        aria-hidden
        className={cn(
          "transition-transform duration-200 ease-[var(--ease-out-soft)]",
          direction === "up"
            ? "group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            : "group-hover:translate-x-1",
        )}
      >
        {direction === "up" ? "↗" : "→"}
      </span>
    </>
  );

  const classes = cn(
    "group inline-flex items-center gap-1.5 text-[14px] font-medium text-ink",
    "underline-offset-4 hover:underline decoration-line-strong",
    className,
  );

  if (external) {
    return (
      <a href={href} className={classes} target="_blank" rel="noreferrer">
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {inner}
    </Link>
  );
}
