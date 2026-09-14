"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ProjectMedia, ProjectMeta } from "@/components/ProjectCardParts";
import {
  ProjectsHeading,
  type ProjectFilter,
} from "@/components/ProjectsHeading";
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

export function ProjectGrid() {
  const [filter, setFilter] = useState<ProjectFilter>("all");
  const visible = useMemo(
    () =>
      filter === "all"
        ? projects
        : projects.filter((project) => project.category === filter),
    [filter],
  );

  return (
    <section className="w-full">
      <div className="flex min-h-[191px] items-end px-3 pb-6 min-[1100px]:min-h-[220px] min-[1100px]:px-5 min-[1100px]:pb-5">
        <ProjectsHeading active={filter} onChange={setFilter} />
      </div>

      <div className="grid grid-cols-1 gap-x-5 gap-y-[33px] px-3 min-[1100px]:grid-cols-2 min-[1100px]:px-5">
        {visible.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}
