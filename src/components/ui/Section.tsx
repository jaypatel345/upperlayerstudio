import { cn } from "@/lib/cn";

type Props = {
  children: React.ReactNode;
  className?: string;
  id?: string;
  /** Matches the reference's alternating white / #F2F6F8 rhythm */
  tone?: "white" | "tint" | "dark";
  /** Vertical rhythm */
  pad?: "sm" | "md" | "lg";
};

const tones = {
  white: "bg-surface text-ink",
  tint: "bg-tint text-ink",
  dark: "bg-dark text-white",
};

const pads = {
  sm: "py-16 sm:py-20",
  md: "py-20 sm:py-28",
  lg: "py-24 sm:py-32 lg:py-40",
};

export function Section({ children, className, id, tone = "white", pad = "md" }: Props) {
  return (
    <section id={id} className={cn("relative", tones[tone], pads[pad], className)}>
      {children}
    </section>
  );
}
