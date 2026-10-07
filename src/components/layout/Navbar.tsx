"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Wordmark } from "@/components/ui/Wordmark";
import { nav, site } from "@/lib/site";
import { cn } from "@/lib/cn";

export function Navbar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeMenu = nav.find((item) => item.label === openMenu && "children" in item) as
    | Extract<(typeof nav)[number], { children: unknown }>
    | undefined;

  useEffect(() => {
    if (!openMenu) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenMenu(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openMenu]);

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
        // Light see-through frost in every state (BrightStudios' nav): a soft
        // white gradient, a gentle blur, and glassy edge highlights
        "bg-[linear-gradient(125deg,rgba(255,255,255,0.82)_0%,rgba(255,255,255,0.62)_45%,rgba(247,251,253,0.7)_100%)] backdrop-blur-[5px] backdrop-saturate-[1.18]",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.96),inset_1px_0_0_rgba(255,255,255,0.68),inset_0_-1px_0_rgba(255,255,255,0.7),0_8px_32px_rgba(31,50,61,0.06)]",
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

      {/* Desktop mega panel — one shared panel under the bar, centred, so moving
          between menu items swaps its contents instead of jumping a dropdown
          around. The pt-3 wrapper bridges the gap so the hover never drops. */}
      <AnimatePresence>
        {activeMenu && (
          <m.div
            key="mega"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-0 top-full mx-auto hidden w-full px-5 pt-3 lg:block"
            style={{ maxWidth: activeMenu.children.length > 2 ? 840 : 600 }}
          >
            <div className="rounded-2xl bg-white/98 bg-[linear-gradient(125deg,rgba(255,255,255,0.996),rgba(255,255,255,0.98))] px-5 pt-5 pb-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.96),inset_1px_0_0_rgba(255,255,255,0.68),inset_0_-1px_0_rgba(255,255,255,0.7),0_8px_32px_rgba(31,50,61,0.06)] backdrop-blur-[18px] backdrop-saturate-[1.12]">
              <div className="flex items-center justify-between px-1">
                <p className="text-[13px] text-muted">{activeMenu.label}</p>
                <button
                  type="button"
                  onClick={() => setOpenMenu(null)}
                  className="rounded-md bg-[#eef4fa] px-3 py-2 text-[13px] leading-none text-muted transition-colors hover:text-ink"
                >
                  Close ×
                </button>
              </div>

              <m.div
                key={activeMenu.label}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.18 }}
                className={cn(
                  "mt-4 grid gap-2",
                  activeMenu.children.length > 2 ? "grid-cols-4" : "grid-cols-2",
                )}
              >
                {activeMenu.children.map((child) => (
                  <Link
                    key={child.label}
                    href={child.href}
                    onClick={() => setOpenMenu(null)}
                    className="group flex min-h-[120px] flex-col rounded-lg bg-[#f2f6f8] p-4 transition-colors duration-200 hover:bg-[#e9eff3]"
                  >
                    <span className="flex items-start justify-between gap-3">
                      <span className="text-[16px] leading-[1.5] text-ink">{child.label}</span>
                      <span
                        aria-hidden
                        className="text-[16px] leading-[1.5] text-muted transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink"
                      >
                        ↗
                      </span>
                    </span>
                    <span className="mt-2 text-[13px] leading-[1.4] text-muted">{child.desc}</span>
                  </Link>
                ))}
              </m.div>

              <div className="mt-3 flex items-center justify-between px-1 pt-1">
                <Link
                  href={activeMenu.href}
                  onClick={() => setOpenMenu(null)}
                  className="py-2 text-[13px] text-muted transition-colors hover:text-ink"
                >
                  View all {activeMenu.label.toLowerCase()} ↗
                </Link>
                <Link
                  href={site.book}
                  onClick={() => setOpenMenu(null)}
                  className="py-2 text-[13px] text-muted transition-colors hover:text-ink"
                >
                  Book a call
                </Link>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>

      {/* Mobile sheet */}
      <AnimatePresence>
        {mobileOpen && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="h-[calc(100dvh-60px)] overflow-y-auto border-t border-white/70 bg-white/98 backdrop-blur-[18px] backdrop-saturate-[1.12] lg:hidden"
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
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
