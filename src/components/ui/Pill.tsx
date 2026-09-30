import { cn } from "@/lib/cn";

export function Pill({
  children,
  className,
  tone = "light",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "light" | "outline" | "dark";
}) {
  const tones = {
    light: "glass border border-white/60 text-ink shadow-[0_1px_2px_rgba(10,10,10,0.06)]",
    outline: "border border-line text-ink-70 bg-white",
    dark: "border border-white/14 text-white/80 bg-white/5",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[13px] font-medium tracking-[-0.01em]",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
