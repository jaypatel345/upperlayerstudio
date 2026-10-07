import { SkyPlate } from "@/components/ui/SkyPlate";
import { Screenshot, PhoneFrame } from "@/components/ui/DeviceFrames";
import { AutoplayVideo } from "@/components/ui/AutoplayVideo";
import { Slideshow, type Slide } from "@/components/ui/Slideshow";
import type { Project } from "@/lib/projects";

/**
 * A project's gallery, in the reference's order: the walkthrough reel first,
 * then the cover pair, then one more screen from the case study. Full-width
 * 16:9 slides whose neighbours run off into the page margins.
 */
export function WorkGallery({ project }: { project: Project }) {
  const { desktop, mobile } = project.cover;
  const extra = project.screens
    .filter((g) => g.kind === "desktop")
    .flatMap((g) => g.shots)
    .find((s) => s.src !== desktop.src);

  const plate = (key: string, shot: typeof desktop, phone?: typeof mobile): Slide => ({
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
  });

  const slides: Slide[] = [];
  if (project.video.src) {
    slides.push({
      key: "video",
      node: (
        <AutoplayVideo
          src={project.video.src}
          srcSmall={project.video.srcSmall}
          poster={project.video.poster}
          label={`${project.name} walkthrough`}
          posterWidth={1248}
          className="absolute inset-0 h-full"
        />
      ),
    });
  }
  slides.push(plate("cover", desktop, mobile));
  if (extra) slides.push(plate("extra", extra));

  return (
    <Slideshow
      slides={slides}
      label={`${project.name} artwork`}
      slideClassName="aspect-video bg-tint"
      className="px-6 lg:px-24"
    />
  );
}
