"use client";

import { usePathname } from "next/navigation";

/** "Projects" heading above the project grid on the home page, at the Playground heading's scale. */
export function ProjectsHeading() {
  if (usePathname() !== "/") return null;

  return (
    <div className="flex px-3 pt-[140px] pb-5 min-[1100px]:px-5 min-[1100px]:pt-[160px]">
      <h1 className="text-[26px] font-medium leading-[31.2px] tracking-[-1.04px] text-foreground min-[1100px]:text-[28px] min-[1100px]:leading-[33.6px] min-[1100px]:tracking-[-1.12px]">
        Projects
      </h1>
    </div>
  );
}
