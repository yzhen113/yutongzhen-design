import type { CSSProperties } from "react";
import Image from "next/image";
import { AutoplayVideo } from "@/components/AutoplayVideo";
import type { Project } from "@/lib/site";

export function ProjectMedia({ project }: { project: Project }) {
  if (project.media.type === "video") {
    return (
      <div className="w-full overflow-hidden">
        <AutoplayVideo
          className="block h-auto w-full"
          src={project.media.src}
          poster={project.media.poster}
          playWhenVisible
          preload="metadata"
        />
      </div>
    );
  }

  const scale = project.media.scale ?? 1;

  return (
    <div
      className={[
        "relative aspect-[690/392] w-full overflow-hidden",
        project.media.src.startsWith("/media/doordash/") ? "bg-[#f2f2f2]" : "",
      ].join(" ")}
    >
      <Image
        src={project.media.src}
        alt={project.title}
        fill
        quality={100}
        unoptimized={
          project.media.src.startsWith("/media/cmused/") ||
          project.media.src.startsWith("/media/doordash/")
        }
        className="object-cover transition-transform duration-300 ease-out [transform:scale(var(--thumb-scale))] group-hover:[transform:scale(var(--thumb-hover-scale))]"
        style={
          {
            "--thumb-scale": String(scale),
            "--thumb-hover-scale": String(scale * 1.05),
          } as CSSProperties
        }
        sizes="(max-width: 1099px) 100vw, 50vw"
      />
    </div>
  );
}

export function ProjectMeta({ project }: { project: Project }) {
  return (
    <div className="flex flex-col gap-1 pt-[13px] text-[14px] leading-[18.2px] tracking-[0.14px]">
      <p className="text-foreground">{project.title}</p>
      <p className="text-foreground/70">{project.tags}</p>
    </div>
  );
}
