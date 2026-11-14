import Link from "next/link";
import { ProjectMedia, ProjectMeta } from "@/components/ProjectCardParts";
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

/** Product and experience work mixed, so neither kind bunches up. */
const ORDER = [
  "/projects/dasher",
  "/projects/bumble",
  "/projects/tom",
  "/projects/cmu-out-loud",
  "/projects/turning-toward",
  "/projects/cmused",
  "/projects/hybrid-exhibition-james-jean",
];

export function ProjectGrid() {
  const listed = ORDER.flatMap((href) => projects.filter((project) => project.href === href));
  // Anything not listed (e.g. a new project) follows in the site's order.
  const visible = [...listed, ...projects.filter((project) => !ORDER.includes(project.href ?? ""))];

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
