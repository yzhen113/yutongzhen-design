"use client";

import type { ProjectCategory } from "@/lib/site";

export type ProjectFilter = "all" | ProjectCategory;

const filters: { id: ProjectFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "product", label: "Product" },
  { id: "experience", label: "Experience" },
];

export function ProjectsHeading({
  active,
  onChange,
}: {
  active: ProjectFilter;
  onChange: (id: ProjectFilter) => void;
}) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
      <h1 className="sr-only">Projects</h1>
      {filters.map((filter) => {
        const selected = active === filter.id;
        return (
          <button
            key={filter.id}
            type="button"
            onClick={() => onChange(filter.id)}
            className={[
              "transition-colors",
              filter.id === "all"
                ? "!text-[26px] !font-medium !leading-[31.2px] !tracking-[-1.04px]"
                : "!text-[18px] !font-medium !leading-[21.6px] !tracking-[-0.72px]",
              selected
                ? "!text-foreground"
                : "!text-[#C6C6C6] hover:!text-foreground",
            ].join(" ")}
            aria-pressed={selected}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}
