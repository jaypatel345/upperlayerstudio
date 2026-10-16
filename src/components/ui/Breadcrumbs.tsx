import Link from "next/link";
import { cn } from "@/lib/cn";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export function Breadcrumbs({
  items,
  className,
}: {
  items: BreadcrumbItem[];
  className?: string;
}) {
  return (
    <nav aria-label="Breadcrumb" className={cn("text-[13px] text-muted", className)}>
      <ol className="flex flex-wrap items-center gap-1.5 leading-none">
        <li>
          <Link
            href="/"
            className="text-ink-70 hover:text-ink transition-colors underline-offset-4 hover:underline"
          >
            Home
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-1.5">
              <span aria-hidden="true" className="text-line-strong select-none">
                ›
              </span>
              {isLast || !item.href ? (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className="font-medium text-ink truncate max-w-[260px] sm:max-w-none"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-ink-70 hover:text-ink transition-colors underline-offset-4 hover:underline"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
