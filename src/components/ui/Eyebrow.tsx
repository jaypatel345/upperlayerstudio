import { cn } from "@/lib/cn";

/** Small grey label that sits above every section heading. */
export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("text-[13px] font-medium tracking-[-0.01em] text-muted", className)}>
      {children}
    </p>
  );
}
