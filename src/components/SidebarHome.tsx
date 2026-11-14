"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ProjectMedia, ProjectMeta } from "@/components/ProjectCardParts";
import { ProjectMorph } from "@/components/ProjectMorph";
import { filterFromPath, type ProjectFilter } from "@/components/SidebarShell";
import { projects, type Project } from "@/lib/site";

/** Order on the All view: evenly spaced, with product and experience work mixed. */
const ALL_ORDER = [
  "/projects/dasher",
  "/projects/bumble",
  "/projects/cmu-out-loud",
  "/projects/tom",
  "/projects/turning-toward",
  "/projects/cmused",
  "/projects/hybrid-exhibition-james-jean",
];

function projectsFor(filter: ProjectFilter): Project[] {
  if (filter !== "all") return projects.filter((project) => project.category === filter);
  const ordered = ALL_ORDER.flatMap((href) => projects.filter((project) => project.href === href));
  // Anything not listed (e.g. a new project) follows in the site's order.
  return [...ordered, ...projects.filter((project) => !ALL_ORDER.includes(project.href ?? ""))];
}

const headingFor = (filter: ProjectFilter) =>
  filter === "product" ? "Product" : filter === "experience" ? "Experience" : "All projects";

function Card({
  project,
  hovered,
  onHover,
}: {
  project: Project;
  hovered: boolean;
  onHover: (title: string | null) => void;
}) {
  const body = (
    <>
      {project.href ? (
        <ProjectMorph href={project.href}>
          <div className="overflow-hidden">
            <ProjectMedia project={project} />
          </div>
        </ProjectMorph>
      ) : (
        <div className="overflow-hidden">
          <ProjectMedia project={project} />
        </div>
      )}
      <div className={hovered ? "[&_p:first-child]:text-[var(--nav-active)]" : ""}>
        <ProjectMeta project={project} />
      </div>
    </>
  );

  return (
    <div onMouseEnter={() => onHover(project.title)} onMouseLeave={() => onHover(null)}>
      {project.href ? (
        <Link href={project.href} className="group block w-full">
          {body}
        </Link>
      ) : (
        <div className="group block w-full">{body}</div>
      )}
    </div>
  );
}

/** Home, Product and Experience: the project grid (the sidebar comes from the route group's layout). */
export function SidebarHome() {
  const filter = filterFromPath(usePathname()) ?? "all";
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <>
      <h1 className="sr-only">{headingFor(filter)}</h1>
      {/* One card per row at every width, so each spans the whole column beside the sidebar. */}
      <div className="grid grid-cols-1 gap-y-[33px]">
        {projectsFor(filter).map((project) => (
          <Card
            key={project.title}
            project={project}
            hovered={hovered === project.title}
            onHover={setHovered}
          />
        ))}
      </div>
    </>
  );
}
