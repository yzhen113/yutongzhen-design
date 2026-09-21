"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { ProjectCategory } from "@/lib/site";

export type ProjectFilter = ProjectCategory;

const filters: { id: ProjectFilter; label: string; href: string }[] = [
  { id: "product", label: "Product", href: "/product" },
  { id: "experience", label: "Experience", href: "/experience" },
];

const TYPE_EASE = "cubic-bezier(0.44, 0, 0.56, 1)";
const TYPE_MS = 480;

let settled: ProjectFilter | null = null;
let lingering: ProjectFilter | null = null;
const UNDERLINE_HOLD_MS = TYPE_MS + 520;

function SectionUnderline() {
  return (
    <span className="section-underline" aria-hidden>
      <svg viewBox="0 0 262 20" fill="none" preserveAspectRatio="none">
        <path
          d="M0.230469 17.5C16.8971 8.83333 97.4269 -2.23046 100.23 2.12065C103.034 6.47176 48.7305 22.6999 46.7305 17.5C45.8262 15.1489 99.2305 0.5 119.73 0.5C128.23 0.5 138.23 0.623512 139.73 3.14917C140.896 5.11096 129.445 8.14917 129.23 6.64917C128.945 4.64917 176.23 0.5 197.23 0.5C214.03 0.5 246.897 3.8334 261.23 5.5001"
          pathLength={1}
        />
      </svg>
    </span>
  );
}

function typeStyle(selected: boolean) {
  return {
    fontSize: selected ? 26 : 18,
    lineHeight: selected ? "31.2px" : "21.6px",
    letterSpacing: selected ? "-1.04px" : "-0.72px",
    transition: `font-size ${TYPE_MS}ms ${TYPE_EASE}, line-height ${TYPE_MS}ms ${TYPE_EASE}, letter-spacing ${TYPE_MS}ms ${TYPE_EASE}`,
  } as const;
}

function filterFromPath(pathname: string): ProjectFilter {
  return pathname === "/experience" ? "experience" : "product";
}

export function ProjectsHeading() {
  const pathname = usePathname();
  const onProjects =
    pathname === "/" || pathname === "/product" || pathname === "/experience";
  const active = filterFromPath(pathname);
  const [visual, setVisual] = useState<ProjectFilter>(settled ?? active);
  const [heldUnderline, setHeldUnderline] = useState<ProjectFilter | null>(
    lingering,
  );

  useEffect(() => {
    if (visual === active) {
      settled = visual;
    }
  }, [visual, active]);

  useEffect(() => {
    if (visual === active) return;

    const id = window.setTimeout(() => setVisual(active), 0);
    return () => window.clearTimeout(id);
  }, [active, visual]);

  useEffect(() => {
    if (!heldUnderline || visual !== heldUnderline) return;

    const id = window.setTimeout(() => {
      lingering = null;
      setHeldUnderline(null);
    }, UNDERLINE_HOLD_MS);
    return () => window.clearTimeout(id);
  }, [heldUnderline, visual]);

  if (!onProjects) return null;

  return (
    <div className="flex min-h-[191px] items-end px-3 pb-6 min-[1100px]:min-h-[220px] min-[1100px]:px-5 min-[1100px]:pb-5">
      <div className="flex flex-wrap items-baseline justify-start gap-x-2.5 gap-y-1 min-[1100px]:gap-x-5">
        <h1 className="sr-only">
          {active === "product" ? "Product" : "Experience"}
        </h1>
        {filters.map((filter) => {
          const selected = visual === filter.id;
          return (
            <Link
              key={filter.id}
              href={filter.href}
              scroll={false}
              className={[
                "section-filter inline-block font-medium motion-reduce:!transition-none",
                heldUnderline === filter.id ? "is-underline-held" : "",
              ].join(" ")}
              style={typeStyle(selected)}
              aria-current={active === filter.id ? "page" : undefined}
              onClick={() => {
                if (filter.id === active) return;
                lingering = filter.id;
                setHeldUnderline(filter.id);
              }}
            >
              {filter.label}
              <SectionUnderline />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
