/**
 * Pure-CSS sky behind the hero — echoes the studio's cloud cover art without
 * shipping a photograph.
 *
 * Tuning notes: the blue has to hold through roughly the top two thirds or the
 * white cloud layer and the horizon wash bleach the whole section. Cloud
 * radials stay in the upper half; the wash is confined to the bottom third so
 * the section still dissolves cleanly into the white page below.
 *
 * `horizon` turns that white wash off. The footer reuses this exact sky so the
 * top and bottom of the page are literally the same image rather than two
 * similar ones — but it dissolves into the dark footer instead of into white,
 * so it supplies its own fade and wants the white one gone.
 */
export function SkyBackdrop({ horizon = true }: { horizon?: boolean }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Base: saturated overhead blue, clearing only near the horizon */}
      <div className="absolute inset-0 bg-[linear-gradient(178deg,#2f7ad6_0%,#4a8fe0_16%,#6aa9ea_34%,#8cc0f1_52%,#b2d6f6_70%,#dcecfa_86%,#ffffff_100%)]" />

      {/* Cloud mass — stacked radials give shape the way blurred circles can't */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: [
            "radial-gradient(34% 26% at 10% 14%, rgba(255,255,255,0.82) 0%, rgba(255,255,255,0.34) 44%, transparent 74%)",
            "radial-gradient(24% 18% at 22% 25%, rgba(255,255,255,0.6) 0%, transparent 72%)",
            "radial-gradient(36% 22% at 86% 11%, rgba(255,255,255,0.74) 0%, rgba(255,255,255,0.26) 46%, transparent 76%)",
            "radial-gradient(22% 16% at 68% 22%, rgba(255,255,255,0.52) 0%, transparent 74%)",
            "radial-gradient(30% 16% at 4% 46%, rgba(255,255,255,0.5) 0%, transparent 74%)",
            "radial-gradient(32% 17% at 97% 42%, rgba(255,255,255,0.46) 0%, transparent 74%)",
            "radial-gradient(48% 18% at 50% 63%, rgba(255,255,255,0.44) 0%, transparent 72%)",
          ].join(","),
        }}
      />

      {/* Single soft-focus pass so cloud edges stay atmospheric, not graphic */}
      <div className="absolute -top-24 left-[34%] h-[320px] w-[460px] rounded-full bg-white/25 blur-[90px]" />

      {/* Horizon: the section melts into the page */}
      {horizon && (
        <div className="absolute inset-x-0 bottom-0 h-[32%] bg-[linear-gradient(180deg,transparent_0%,rgba(255,255,255,0.55)_42%,rgba(255,255,255,0.92)_76%,#ffffff_100%)]" />
      )}

      {/* Grain kills gradient banding on wide displays */}
      <div
        className="absolute inset-0 opacity-[0.045] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}
