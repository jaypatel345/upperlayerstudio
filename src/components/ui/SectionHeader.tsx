import { Eyebrow } from "./Eyebrow";
import { cn } from "@/lib/cn";

type Props = {
  eyebrow?: string;
  title: React.ReactNode;
  body?: string;
  align?: "left" | "center";
  className?: string;
  children?: React.ReactNode;
};

export function SectionHeader({ eyebrow, title, body, align = "left", className, children }: Props) {
  return (
    <div className={cn(align === "center" && "flex flex-col items-center text-center", className)}>
      {eyebrow && <Eyebrow className="mb-4">{eyebrow}</Eyebrow>}
      <h2 className="text-[34px] leading-[1.05] sm:text-[44px] lg:text-[54px]">{title}</h2>
      {body && (
        <p
          className={cn(
            "mt-5 max-w-[560px] text-[16px] leading-[1.6] text-muted text-pretty",
            align === "center" && "mx-auto",
          )}
        >
          {body}
        </p>
      )}
      {children}
    </div>
  );
}
