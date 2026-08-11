import Image from "next/image";
import Link from "next/link";
import { projects, type Project } from "@/lib/site";

function ProjectMedia({ project }: { project: Project }) {
  if (project.media.type === "video") {
    return (
      <div className="relative aspect-[2/1] w-full overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover"
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
        className="object-cover"
        sizes="(max-width: 1099px) 100vw, 50vw"
      />
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const body = (
    <>
      <div className="overflow-hidden">
        <ProjectMedia project={project} />
      </div>
      <div className="flex flex-col gap-0 pt-[13px] text-[14px] leading-[18.2px] tracking-[0.14px] text-foreground">
        <p>{project.title}</p>
        <p>{project.tags}</p>
      </div>
    </>
  );

  if (!project.href || project.locked) {
    return <div className="block w-full">{body}</div>;
  }

  return (
    <Link href={project.href} className="block w-full">
      {body}
    </Link>
  );
}

export function ProjectGrid() {
  return (
    <section className="w-full">
      <div className="flex min-h-[191px] items-end px-3 pb-6 min-[1100px]:min-h-[220px] min-[1100px]:px-5 min-[1100px]:pb-5">
        <h1 className="text-[28px] font-medium leading-[33.6px] tracking-[-1.12px] text-foreground">
          Projects
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-x-5 gap-y-[33px] px-3 min-[1100px]:grid-cols-2 min-[1100px]:px-5">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}
