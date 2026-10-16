"use client";

import React from "react";
import { SmoothScroll } from "./SmoothScroll";

/**
 * Global provider for studio micro-motion and smooth momentum scrolling.
 * Emulates the exact fluidity, physics, and damping of bybrightstudios.com.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <SmoothScroll>{children}</SmoothScroll>;
}
