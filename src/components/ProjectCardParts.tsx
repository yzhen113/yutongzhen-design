import Image from "next/image";
import type { Project } from "@/lib/site";

export function ProjectMedia({ project }: { project: Project }) {
  if (project.media.type === "video") {
    return (
      <div className="w-full overflow-hidden">
        <video
          className="block h-auto w-full"
          src={project.media.src}
          poster={project.media.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
      </div>
    );
  }

  return (
    <div className="relative aspect-[690/392] w-full overflow-hidden">
      <Image
        src={project.media.src}
        alt={project.title}
        fill
        quality={100}
        unoptimized={project.media.src.startsWith("/media/cmused/")}
        className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
        sizes="(max-width: 1099px) 100vw, 50vw"
      />
    </div>
  );
}

function LockIcon() {
  return (
    <svg width="11" height="14" viewBox="0 0 11 14" fill="none" aria-hidden>
      <rect
        x="0.75"
        y="6.25"
        width="9.5"
        height="6.5"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M2.75 6.25V4.2C2.75 2.48 4.08 1.1 5.5 1.1C6.92 1.1 8.25 2.48 8.25 4.2V6.25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ProjectMeta({ project }: { project: Project }) {
  return (
    <div className="flex flex-col gap-1 pt-[13px] text-[14px] leading-[18.2px] tracking-[0.14px]">
      <p className="flex items-center gap-1.5 text-foreground">
        {project.locked ? (
          <span
            aria-hidden
            className="inline-flex h-[14px] w-[11px] shrink-0 items-center justify-center"
          >
            <LockIcon />
          </span>
        ) : null}
        <span>{project.title}</span>
      </p>
      <p className="text-foreground/70">{project.tags}</p>
    </div>
  );
}
