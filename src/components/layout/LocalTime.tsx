"use client";

import { useEffect, useState } from "react";

/**
 * Studio clock. Renders empty on the server so the markup matches on hydration,
 * then fills in once mounted.
 */
export function LocalTime({ className, tz = "Asia/Kolkata" }: { className?: string; tz?: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () =>
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: tz,
        }).format(new Date()),
      );
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, [tz]);

  return (
    <p className={className} suppressHydrationWarning>
      Local time · {time ?? "--:--"}
    </p>
  );
}
