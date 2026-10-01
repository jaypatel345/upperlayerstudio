"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Wordmark } from "@/components/ui/Wordmark";
import { nav, site } from "@/lib/site";
import { cn } from "@/lib/cn";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-[var(--ease-out-soft)]",
        scrolled ? "glass border-b border-line" : "bg-transparent border-b border-transparent",
      )}
      onMouseLeave={() => setOpenMenu(null)}
    >
      <Container size="wide" className="flex h-[60px] items-center justify-between">
        <Wordmark />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => {
            const hasChildren = "children" in item && item.children;
            return (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setOpenMenu(hasChildren ? item.label : null)}
              >
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-1.5 rounded-[var(--radius-sm)] px-3 py-2 text-[14px] font-medium text-ink transition-colors hover:bg-[rgba(10,10,10,0.04)]"
                >
                  {item.label}
                  {hasChildren && (
                    <span
                      aria-hidden
                      className={cn(
                        "relative h-2.5 w-2.5 transition-transform duration-200",
                        openMenu === item.label && "rotate-45",
                      )}
                    >
                      <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-current opacity-50" />
                      <span className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-current opacity-50" />
                    </span>
                  )}
                </Link>

                <AnimatePresence>
                  {hasChildren && openMenu === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute top-full left-0 w-[290px] pt-2"
                    >
                      <div className="rounded-[var(--radius-card)] border border-line bg-white p-1.5 shadow-[var(--shadow-nav)]">
                        {item.children!.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className="block rounded-[var(--radius-sm)] px-3 py-2.5 transition-colors hover:bg-tint"
                          >
                            <span className="block text-[14px] font-medium">{child.label}</span>
                            <span className="mt-0.5 block text-[13px] text-muted">{child.desc}</span>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Button href={site.book} size="sm">
            Book a call
          </Button>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            className="relative flex h-9 w-9 items-center justify-center rounded-[var(--radius-sm)] hover:bg-[rgba(10,10,10,0.04)] lg:hidden"
          >
            <span className="sr-only">Menu</span>
            <span aria-hidden className="relative block h-3 w-4.5">
              <span
                className={cn(
                  "absolute left-0 h-px w-full bg-ink transition-all duration-300 ease-[var(--ease-out-soft)]",
                  mobileOpen ? "top-1.5 rotate-45" : "top-0",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 h-px w-full bg-ink transition-all duration-300 ease-[var(--ease-out-soft)]",
                  mobileOpen ? "top-1.5 -rotate-45" : "top-3",
                )}
              />
            </span>
          </button>
        </div>
      </Container>

      {/* Mobile sheet */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="h-[calc(100dvh-60px)] overflow-y-auto border-t border-line bg-surface lg:hidden"
          >
            <Container className="py-6">
              {nav.map((item) => (
                <div key={item.label} className="border-b border-line py-4">
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block text-[22px] font-medium tracking-[-0.03em]"
                  >
                    {item.label}
                  </Link>
                  {"children" in item && item.children && (
                    <div className="mt-2 flex flex-col gap-1.5">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          onClick={() => setMobileOpen(false)}
                          className="text-[15px] text-muted"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Button href={site.book} size="lg" className="mt-6 w-full">
                Book a call
              </Button>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
