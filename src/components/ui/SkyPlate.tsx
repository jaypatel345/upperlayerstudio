import { cn } from "@/lib/cn";

export type SkyVariant = "clear" | "deep" | "cumulus" | "haze" | "high" | "dusk";

/**
 * Sky imagery as a component.
 *
 * Every art plate on the site is one of these rather than a flat gradient or a
 * stock photograph. Same reasoning as SkyBackdrop: the studio's cover art is a
 * sky, and a built sky costs no bytes, never pixelates, and recolours with the
 * tokens instead of fighting them.
 *
 * Six variants so plates sitting near each other don't read as the same image.
 * Each one is a base gradient, a stack of cloud radials, one blurred pass to
 * keep edges atmospheric, and grain to kill banding — the layer order matters,
 * since the blur has to sit over the radials and under the grain.
 */
const skies: Record<SkyVariant, { base: string; clouds: string[]; blur: string }> = {
  clear: {
    base: "linear-gradient(178deg,#2f7ad6 0%,#4a8fe0 18%,#6aa9ea 40%,#8cc0f1 62%,#bcdcf7 84%,#e8f3fc 100%)",
    clouds: [
      "radial-gradient(38% 30% at 14% 22%, rgba(255,255,255,0.86) 0%, rgba(255,255,255,0.3) 46%, transparent 76%)",
      "radial-gradient(26% 20% at 30% 34%, rgba(255,255,255,0.58) 0%, transparent 74%)",
      "radial-gradient(34% 22% at 84% 16%, rgba(255,255,255,0.7) 0%, transparent 76%)",
      "radial-gradient(44% 18% at 54% 78%, rgba(255,255,255,0.4) 0%, transparent 72%)",
    ],
    blur: "top-[-12%] left-[28%] h-[55%] w-[60%] bg-white/25",
  },
  deep: {
    base: "linear-gradient(170deg,#11407f 0%,#1d5fae 22%,#2f7ad6 46%,#5fa3e8 72%,#a9d0f4 100%)",
    clouds: [
      "radial-gradient(30% 24% at 78% 26%, rgba(255,255,255,0.72) 0%, rgba(255,255,255,0.2) 48%, transparent 78%)",
      "radial-gradient(24% 16% at 60% 38%, rgba(255,255,255,0.4) 0%, transparent 74%)",
      "radial-gradient(40% 20% at 16% 72%, rgba(255,255,255,0.38) 0%, transparent 74%)",
      "radial-gradient(30% 14% at 90% 62%, rgba(255,255,255,0.3) 0%, transparent 76%)",
    ],
    blur: "bottom-[-18%] left-[-10%] h-[60%] w-[70%] bg-white/15",
  },
  cumulus: {
    base: "linear-gradient(180deg,#3d85da 0%,#64a5e9 28%,#95c6f2 56%,#cfe6fa 80%,#ffffff 100%)",
    clouds: [
      "radial-gradient(42% 34% at 34% 64%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.45) 44%, transparent 72%)",
      "radial-gradient(32% 28% at 60% 72%, rgba(255,255,255,0.88) 0%, rgba(255,255,255,0.3) 48%, transparent 76%)",
      "radial-gradient(26% 22% at 14% 76%, rgba(255,255,255,0.8) 0%, transparent 74%)",
      "radial-gradient(22% 14% at 82% 30%, rgba(255,255,255,0.5) 0%, transparent 74%)",
    ],
    blur: "bottom-[-20%] left-[16%] h-[62%] w-[66%] bg-white/35",
  },
  haze: {
    base: "linear-gradient(176deg,#7db6ee 0%,#a3cdf3 26%,#c7e0f9 54%,#e8f3fc 78%,#ffffff 100%)",
    clouds: [
      "radial-gradient(46% 30% at 22% 30%, rgba(255,255,255,0.8) 0%, transparent 74%)",
      "radial-gradient(38% 24% at 76% 52%, rgba(255,255,255,0.66) 0%, transparent 76%)",
      "radial-gradient(30% 18% at 50% 84%, rgba(255,255,255,0.72) 0%, transparent 74%)",
    ],
    blur: "top-[10%] left-[10%] h-[70%] w-[80%] bg-white/30",
  },
  high: {
    base: "linear-gradient(184deg,#1b5aa8 0%,#3b84d8 24%,#6aa9ea 52%,#9ecbf3 78%,#d8eafb 100%)",
    clouds: [
      "radial-gradient(60% 10% at 50% 24%, rgba(255,255,255,0.6) 0%, transparent 72%)",
      "radial-gradient(52% 8% at 38% 40%, rgba(255,255,255,0.48) 0%, transparent 74%)",
      "radial-gradient(46% 7% at 64% 56%, rgba(255,255,255,0.42) 0%, transparent 74%)",
      "radial-gradient(38% 6% at 44% 70%, rgba(255,255,255,0.34) 0%, transparent 74%)",
    ],
    blur: "top-[26%] left-[6%] h-[40%] w-[88%] bg-white/18",
  },
  dusk: {
    base: "linear-gradient(174deg,#14406f 0%,#2b6aa8 24%,#5e9ad0 50%,#a8c8e4 74%,#e3edf5 100%)",
    clouds: [
      "radial-gradient(44% 26% at 70% 70%, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.18) 48%, transparent 78%)",
      "radial-gradient(34% 18% at 26% 54%, rgba(255,255,255,0.42) 0%, transparent 76%)",
      "radial-gradient(30% 14% at 86% 34%, rgba(255,255,255,0.34) 0%, transparent 76%)",
    ],
    blur: "bottom-[-14%] right-[-8%] h-[58%] w-[64%] bg-white/18",
  },
};

type Props = {
  variant?: SkyVariant;
  className?: string;
  /** Caption burned into the lower-left corner, as on the service plates */
  label?: string;
  children?: React.ReactNode;
  /** Darkens the plate so white text sits on it legibly */
  scrim?: boolean;
};

export function SkyPlate({ variant = "clear", className, label, children, scrim }: Props) {
  const sky = skies[variant];

  return (
    <div className={cn("relative isolate overflow-hidden", className)}>
      <div aria-hidden className="absolute inset-0 -z-10" style={{ backgroundImage: sky.base }} />
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{ backgroundImage: sky.clouds.join(",") }}
      />
      <div aria-hidden className={cn("absolute -z-10 rounded-full blur-[70px]", sky.blur)} />
      {scrim && (
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(10,10,10,0.3)_0%,rgba(10,10,10,0.05)_45%,rgba(10,10,10,0.42)_100%)]"
        />
      )}
      {/* Grain, so wide plates don't band */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.055] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {label && (
        <>
          {/* Pale skies (haze, cumulus) leave nothing for white text to sit on,
              so the label carries its own wash rather than relying on the sky */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[46%] bg-[linear-gradient(0deg,rgba(12,45,88,0.42)_0%,rgba(12,45,88,0.12)_52%,transparent_100%)]"
          />
          <span className="absolute bottom-5 left-6 text-[15px] font-medium tracking-[-0.02em] text-white drop-shadow-[0_1px_6px_rgba(10,40,80,0.5)]">
            {label.toUpperCase()}
          </span>
        </>
      )}
      {children}
    </div>
  );
}
