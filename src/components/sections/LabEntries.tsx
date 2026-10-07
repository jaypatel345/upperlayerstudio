import { Reveal } from "@/components/ui/Reveal";
import { lab, type LabEntry } from "@/lib/insights";

/**
 * The reference's Lab grid: two columns of rounded 16:10 tiles with the title
 * underneath. The reference fills its tiles with artwork; these entries are
 * techniques, so each tile is the technique itself, running.
 */
export function LabEntries() {
  return (
    <div className="mx-auto grid max-w-[1440px] grid-cols-[minmax(0,1fr)] gap-x-6 gap-y-12 px-6 pb-20 sm:pb-[88px] md:grid-cols-2 lg:px-32">
      {lab.entries.map((entry, i) => (
        <Reveal key={entry.title} delay={(i % 2) * 0.06}>
          <article className="flex flex-col gap-4">
            <Demo kind={entry.demo} />
            <div>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h2 className="text-[20px] leading-[1.25] tracking-[-0.02em]">{entry.title}</h2>
                <span className="text-[13px] font-medium text-faint">{entry.kind}</span>
              </div>
              <p className="mt-3 text-[15px] leading-[1.6] text-ink-70 text-pretty">{entry.body}</p>
              <p className="mt-3 border-l-2 border-line-strong pl-4 text-[14px] leading-[1.6] text-muted text-pretty">
                {entry.detail}
              </p>
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  );
}

const tile = "relative aspect-[16/10] overflow-hidden rounded-[var(--radius-card)]";

function Demo({ kind }: { kind: LabEntry["demo"] }) {
  switch (kind) {
    case "marquee":
      return <MarqueeDemo />;
    case "copy":
      return <CopyDemo />;
    case "docs":
      return <DocsDemo />;
  }
}

/**
 * The bug and the fix, side by side: the same -50% marquee with one set of
 * names per half, which runs out and opens a gap, and with four, which never does.
 */
function MarqueeDemo() {
  const names = ["n8n", "OpenAI", "Supabase"];
  const row = (sets: number, label: string) => {
    const half = Array.from({ length: sets }, () => names).flat();
    return (
      <div>
        <p className="mb-2 px-5 text-[12px] font-medium text-white/45">{label}</p>
        <div className="overflow-hidden border-y border-line-light py-3">
          <div
            className="animate-marquee flex w-max items-center gap-8 pr-8"
            style={{ "--marquee-duration": `${sets * 6}s` } as React.CSSProperties}
          >
            {[...half, ...half].map((n, i) => (
              <span key={i} className="text-[17px] font-medium tracking-[-0.03em] whitespace-nowrap text-white/80">
                {n}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div aria-hidden className={`${tile} flex flex-col justify-center gap-6 bg-dark select-none`}>
      {row(1, "Before: one set per half, so a gap opens")}
      {row(4, "After: four sets, always wider than the screen")}
    </div>
  );
}

/** What one service actually is in the codebase: an object, not a route. */
function CopyDemo() {
  return (
    <div className={`${tile} flex items-center bg-tint`}>
      <pre className="w-full overflow-hidden px-6 font-mono text-[12px] leading-[1.7] text-ink-70 sm:px-8 sm:text-[13px]">
        <code>
          <span className="text-faint">{"// src/lib/services.ts\n"}</span>
          {"{\n"}
          {"  slug: "}<span className="text-sky-deep">{'"voice"'}</span>{",\n"}
          {"  n: "}<span className="text-sky-deep">{'"02"'}</span>{",\n"}
          {"  name: "}<span className="text-sky-deep">{'"Voice AI"'}</span>{",\n"}
          {"  proof: "}<span className="text-sky-deep">{'"frontdeskai"'}</span>{",\n"}
          {"  hero: { headline, body, tags },\n"}
          {"  deliverables: { items: [...] },\n"}
          {"  faqs: [...],\n"}
          {"}"}
          <span className="text-faint">{"\n// → /services/voice, its nav entry and metadata"}</span>
        </code>
      </pre>
    </div>
  );
}

/** The instruction every agent on this repo reads first. */
function DocsDemo() {
  return (
    <div className={`${tile} flex flex-col bg-dark-2`}>
      <div className="flex gap-1.5 px-4 pt-4" aria-hidden>
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
      </div>
      <pre className="flex flex-1 items-center overflow-hidden px-6 font-mono text-[12px] leading-[1.75] text-white/70 sm:px-8 sm:text-[13px]">
        <code>
          <span className="text-white/40">$ </span>
          {"cat AGENTS.md\n"}
          <span className="text-white">{"# This is NOT the Next.js you know\n"}</span>
          {"Read the relevant guide in\n"}
          <span className="text-sky">{"node_modules/next/dist/docs/\n"}</span>
          {"before writing any code.\n\n"}
          <span className="text-white/40">$ </span>
          {"ls node_modules/next/dist/docs\n"}
          <span className="text-white/45">{"01-app  02-pages  03-architecture  …"}</span>
        </code>
      </pre>
    </div>
  );
}
