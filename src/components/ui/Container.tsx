import { cn } from "@/lib/cn";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** narrow = reading column, wide = full grid */
  size?: "narrow" | "text" | "default" | "wide";
  as?: "div" | "section" | "header" | "footer" | "nav";
};

const sizes = {
  narrow: "max-w-[560px]",
  text: "max-w-[840px]",
  default: "max-w-[1280px]",
  wide: "max-w-[1440px]",
};

export function Container({ children, className, size = "default", as: Tag = "div" }: Props) {
  return (
    <Tag className={cn("mx-auto w-full px-5 sm:px-8", sizes[size], className)}>{children}</Tag>
  );
}
