"use client";

import { useState } from "react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { cn } from "@/lib/cn";

export type AccordionItem = {
  id: string;
  /** Left gutter number, e.g. "01" */
  n?: string;
  title: string;
  content: React.ReactNode;
};

type Props = {
  items: AccordionItem[];
  /** index open on first paint; -1 for all closed */
  defaultOpen?: number;
  className?: string;
};

export function Accordion({ items, defaultOpen = 0, className }: Props) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={cn("divide-y divide-line border-y border-line", className)}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.id}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              aria-controls={`panel-${item.id}`}
              className="group flex w-full items-center gap-5 py-6 text-left sm:py-7"
            >
              {item.n && (
                <span className="w-9 shrink-0 text-[20px] font-medium tracking-[-0.03em] text-ink sm:w-12 sm:text-[26px]">
                  {item.n}
                </span>
              )}
              <span className="flex-1 text-[20px] font-medium tracking-[-0.03em] sm:text-[26px]">
                {item.title}
              </span>
              <span
                aria-hidden
                className={cn(
                  "relative h-5 w-5 shrink-0 text-ink transition-transform duration-300 ease-[var(--ease-out-soft)]",
                  isOpen && "rotate-45",
                )}
              >
                <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-current" />
                <span className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-current" />
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <m.div
                  id={`panel-${item.id}`}
                  key="panel"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className={cn("pb-8", item.n && "sm:pl-17")}>{item.content}</div>
                </m.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
