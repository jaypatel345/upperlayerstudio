import { SkyPlate } from "@/components/ui/SkyPlate";
import { Screenshot, PhoneFrame } from "@/components/ui/DeviceFrames";
import { AutoplayVideo } from "@/components/ui/AutoplayVideo";
import { Slideshow, type Slide } from "@/components/ui/Slideshow";
import { cn } from "@/lib/cn";
import type { Project } from "@/lib/projects";

/**
 * A project's gallery, in the reference's order: the walkthrough reel first,
 * then the cover pair, then one more screen from the case study. Full-width
 * 16:9 slides whose neighbours run off into the page margins.
 */
export function WorkGallery({ project }: { project: Project }) {
  const { desktop } = project.cover;
  const extra = project.screens
    .filter((g) => g.kind === "desktop")
    .flatMap((g) => g.shots)
    .find((s) => s.src !== desktop.src);

  // Apply the premium translucent blue glass presentation to all projects in the gallery
  const useGlass = Boolean(project.video.src);

  const renderGlassBackground = () => (
    <>
      {/* Soft atmospheric white-to-sky glow with zero purple */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-10 -z-10 rounded-full bg-gradient-to-b from-white/80 via-sky-200/25 to-sky-300/18 blur-3xl"
      />

      {/* Ambient radial highlights: bright white at top, very soft light sky blue at bottom */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(70% 50% at 50% 0%, rgba(255, 255, 255, 0.95) 0%, transparent 65%), radial-gradient(80% 60% at 50% 100%, rgba(186, 230, 253, 0.32) 0%, transparent 70%)",
        }}
      />

      {/* Subtle noise texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </>
  );

  const glassStyle: React.CSSProperties = {
    background:
      "linear-gradient(175deg, rgba(255, 255, 255, 0.95) 0%, rgba(246, 251, 255, 0.82) 40%, rgba(228, 245, 254, 0.62) 75%, rgba(207, 238, 254, 0.58) 100%)",
    backdropFilter: "blur(20px) saturate(1.15)",
    WebkitBackdropFilter: "blur(20px) saturate(1.15)",
    boxShadow:
      "inset 0 1px 1px 0 rgba(255, 255, 255, 0.95), inset 0 0 0 1px rgba(255, 255, 255, 0.5)",
  };

  const plate = (key: string, shot: typeof desktop, phone?: (typeof project.cover)["mobile"]): Slide => {
    if (useGlass) {
      return {
        key,
        node: (
          <div
            className="relative isolate flex h-full items-center justify-center overflow-hidden rounded-[var(--radius-card)]"
            style={glassStyle}
          >
            {renderGlassBackground()}

            <div className="flex h-full items-center justify-center px-4 py-2 sm:px-8 sm:py-3 lg:px-12 lg:py-3.5">
              <div className="pointer-events-none relative w-full max-w-[680px] lg:max-w-[740px] overflow-hidden rounded-[14px] shadow-[0_20px_50px_-12px_rgba(15,23,42,0.2)] [&_img]:select-none">
                <Screenshot shot={shot} sizes="(min-width: 1024px) 740px, 80vw" />
                {phone && (
                  <PhoneFrame
                    shot={phone}
                    sizes="(min-width: 1024px) 220px, 26vw"
                    className="absolute -right-[4%] -bottom-[8%] w-[24%] max-w-[220px]"
                  />
                )}
              </div>
            </div>
          </div>
        ),
      };
    }

    return {
      key,
      node: (
        <SkyPlate variant={project.art} className="h-full">
          <div className="flex h-full items-center justify-center px-[9%] py-[7%]">
            <div className="pointer-events-none relative w-full max-w-[780px] [&_img]:select-none">
              <Screenshot shot={shot} sizes="(min-width: 1024px) 780px, 80vw" />
              {phone && (
                <PhoneFrame
                  shot={phone}
                  sizes="(min-width: 1024px) 220px, 26vw"
                  className="absolute -right-[4%] -bottom-[8%] w-[24%] max-w-[220px]"
                />
              )}
            </div>
          </div>
        </SkyPlate>
      ),
    };
  };

  const slides: Slide[] = [];
  if (project.video.src) {
    if (useGlass) {
      slides.push({
        key: "video",
        node: (
          <div
            className="relative isolate flex h-full items-center justify-center overflow-hidden rounded-[var(--radius-card)]"
            style={glassStyle}
          >
            {renderGlassBackground()}

            <div className="flex h-full items-center justify-center px-4 py-2 sm:px-8 sm:py-3 lg:px-12 lg:py-3.5">
              <div className="relative w-full max-w-[680px] lg:max-w-[740px] overflow-hidden rounded-[14px] shadow-[0_20px_50px_-12px_rgba(15,23,42,0.2)]">
                <AutoplayVideo
                  src={project.video.src}
                  srcSmall={project.video.srcSmall}
                  poster={project.video.poster}
                  label={`${project.name} walkthrough`}
                  posterWidth={1248}
                  fit="cover"
                  className="aspect-video w-full object-cover"
                  style={{
                    objectPosition: project.video.focus ?? "center",
                  }}
                />
              </div>
            </div>
          </div>
        ),
      });
    } else {
      slides.push({
        key: "video",
        node: (
          <AutoplayVideo
            src={project.video.src}
            srcSmall={project.video.srcSmall}
            poster={project.video.poster}
            label={`${project.name} walkthrough`}
            posterWidth={1248}
            fit="cover"
            style={project.video.focus ? { objectPosition: project.video.focus } : undefined}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ),
      });
    }
  }
  slides.push(plate("cover", desktop, undefined));
  if (extra) slides.push(plate("extra", extra));

  return (
    <Slideshow
      slides={slides}
      label={`${project.name} artwork`}
      slideClassName={cn(
        "aspect-video rounded-[var(--radius-card)] overflow-hidden",
        useGlass ? "bg-transparent" : "bg-tint",
      )}
      className="px-6 lg:px-24"
    />
  );
}
