import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "solid" | "light" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-[var(--radius-card)] font-medium " +
  "whitespace-nowrap transition-all duration-200 ease-[var(--ease-out-soft)] " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink " +
  "active:scale-[0.985]";

const variants: Record<Variant, string> = {
  solid: "bg-ink text-white hover:bg-[#2a2a2a] shadow-[0_1px_2px_rgba(10,10,10,0.2)]",
  light:
    "bg-white text-ink border border-line hover:border-line-strong hover:bg-[#fafafa] shadow-[0_1px_2px_rgba(10,10,10,0.06)]",
  outline: "border border-line text-ink hover:bg-tint",
  ghost: "text-ink hover:bg-[rgba(10,10,10,0.04)]",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-[13px]",
  md: "h-10 px-4 text-[14px]",
  lg: "h-12 px-6 text-[15px]",
};

type Props = {
  children: React.ReactNode;
  href?: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
};

export function Button({
  children,
  href,
  variant = "solid",
  size = "md",
  className,
  onClick,
  type = "button",
}: Props) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (href) {
    const external = href.startsWith("http") || href.startsWith("mailto:");
    if (external) {
      return (
        <a href={href} className={classes} target="_blank" rel="noreferrer">
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
