import Link from "next/link";
import { ProjectMedia, ProjectMeta } from "@/components/ProjectCardParts";
import { type ProjectFilter } from "@/components/ProjectsHeading";
import { projects, type Project } from "@/lib/site";

function ProjectCard({ project }: { project: Project }) {
  const body = (
    <>
      <div className="overflow-hidden">
        <ProjectMedia project={project} />
      </div>
      <ProjectMeta project={project} />
    </>
  );

  if (!project.href) {
    return <div className="group block w-full">{body}</div>;
  }

  return (
    <Link href={project.href} className="group block w-full">
      {body}
    </Link>
  );
}

export function ProjectGrid({
  filter = "product",
}: {
  filter?: ProjectFilter;
}) {
  const visible = projects.filter((project) => project.category === filter);

  return (
    <section className="w-full">
      <div className="grid grid-cols-1 gap-x-5 gap-y-[33px] px-3 min-[1100px]:grid-cols-2 min-[1100px]:px-5">
        {visible.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}
