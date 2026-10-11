import React from "react";

/** Pass-through provider. Framer Motion is fully replaced with high-performance CSS and native observers. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
