import { cn } from "@/lib/cn";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** flat = hairline border, raised = shadow, float = hero stat card, glass = frosted liquid glass */
  variant?: "flat" | "raised" | "float" | "glass";
  radius?: "card" | "lg" | "xl";
};

const variants = {
  flat: "bg-white border border-line",
  raised: "bg-white border border-line shadow-[var(--shadow-card)]",
  float: "bg-white shadow-[var(--shadow-float)]",
  glass: "glass-surface",
};

const radii = {
  card: "rounded-[var(--radius-card)]",
  lg: "rounded-[var(--radius-lg)]",
  xl: "rounded-[var(--radius-xl)]",
};

export function Card({ children, className, variant = "flat", radius = "card" }: Props) {
  return (
    <div
      className={cn(
        "transition-all duration-300 ease-[var(--ease-out-soft)]",
        variants[variant],
        radii[radius],
        className
      )}
    >
      {children}
    </div>
  );
}
