import Link from "next/link";
import { LogoMark } from "./LogoMark";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";

export function Wordmark({ className, href = "/" }: { className?: string; href?: string }) {
  return (
    <Link href={href} className={cn("group inline-flex items-center gap-2", className)} aria-label={site.name}>
      <LogoMark className="h-[22px] w-[22px] transition-transform duration-300 ease-[var(--ease-out-soft)] group-hover:-translate-y-px" />
      <span className="text-[15px] font-medium tracking-[-0.03em] whitespace-nowrap">
        {site.wordmark}
        <sup className="ml-px text-[8px] top-[-0.5em] relative">{site.wordmarkSuffix}</sup>
      </span>
    </Link>
  );
}
