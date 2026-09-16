import Link from "next/link";
import type { ProjectCategory } from "@/lib/site";

export type ProjectFilter = "all" | ProjectCategory;

const filters: { id: ProjectFilter; label: string; href: string }[] = [
  { id: "all", label: "All", href: "/" },
  { id: "product", label: "Product", href: "/product" },
  { id: "experience", label: "Experience", href: "/experience" },
];

export function ProjectsHeading({ active }: { active: ProjectFilter }) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1 min-[1100px]:gap-x-5">
      <h1 className="sr-only">
        {active === "all"
          ? "Projects"
          : active === "product"
            ? "Product"
            : "Experience"}
      </h1>
      {filters.map((filter) => {
        const selected = active === filter.id;
        return (
          <Link
            key={filter.id}
            href={filter.href}
            className={[
              "transition-colors",
              filter.id === "all"
                ? "!text-[26px] !font-medium !leading-[31.2px] !tracking-[-1.04px]"
                : "!text-[18px] !font-medium !leading-[21.6px] !tracking-[-0.72px]",
              selected
                ? "!text-foreground"
                : "!text-[#C6C6C6] hover:!text-foreground",
            ].join(" ")}
            aria-current={selected ? "page" : undefined}
          >
            {filter.label}
          </Link>
        );
      })}
    </div>
  );
}
