"use client";

import Link from "next/link";
import { useEffect, useState, type MouseEvent } from "react";
import { useScrollShrinkCover } from "@/components/projects/ScrollShrinkCover";

const navItems = [
  { label: "Projects", href: "/" },
  { label: "About", href: "/about" },
  { label: "Playground", href: "/playground" },
] as const;

export function CaseStudyHeader({ title }: { title: string }) {
  return (
    <header className="sticky top-0 z-50 w-full bg-[rgba(250,250,250,0.95)]">
      <div
        className="relative grid items-center gap-x-5 px-3 py-2 min-[1200px]:px-5 min-[1200px]:py-[8px]"
        style={{ gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)" }}
      >
        <p className="min-w-0 truncate text-[14px] leading-[18.2px] tracking-[0.14px] text-foreground">
          {title}
        </p>

        <nav className="hidden items-center gap-3.5 min-[1200px]:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="nav-link">
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/"
          aria-label="Close project"
          className="close-project-link absolute top-1/2 right-3 flex h-3.5 w-3.5 -translate-y-1/2 items-center justify-center min-[1200px]:right-5"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path
              d="M1 1L13 13M13 1L1 13"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </Link>
      </div>
    </header>
  );
}

export const bumbleSections = [
  { id: "overview", label: "Overview" },
  { id: "challenge", label: "Challenge" },
  { id: "solution", label: "Solution" },
  { id: "research", label: "Research" },
  { id: "explorations", label: "Explorations" },
  { id: "next-steps", label: "Next Steps" },
] as const;

export const tomSections = [
  { id: "overview", label: "Overview" },
  { id: "solution", label: "Solution" },
  { id: "research", label: "Research" },
  { id: "explorations", label: "Explorations" },
  { id: "next-steps", label: "Next Steps" },
] as const;

export const jamesJeanSections = [
  { id: "overview", label: "Overview" },
  { id: "journey", label: "Journey" },
  { id: "plan", label: "Spatial Plan" },
  { id: "process", label: "Process" },
  { id: "reflection", label: "Reflection" },
] as const;

export const dasherSections = [
  { id: "overview", label: "Overview" },
  { id: "challenge", label: "Challenge" },
  { id: "solution", label: "Solution" },
  { id: "system", label: "System" },
  { id: "motion", label: "Motion" },
  { id: "future", label: "Future" },
  { id: "outcome", label: "Outcome" },
] as const;

export function CaseStudySidebar({
  sections = bumbleSections,
  fadeUnderMedia = false,
}: {
  sections?: readonly { id: string; label: string }[];
  fadeUnderMedia?: boolean;
}) {
  const [active, setActive] = useState(sections[0]?.id ?? "");
  const mediaCover = useScrollShrinkCover();
  const hidden = fadeUnderMedia && mediaCover > 0;

  useEffect(() => {
    const elements = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => !!el);

    if (!elements.length) return;

    // Scroll-position spy: last section whose top has crossed a line just
    // below the sticky header. IntersectionObserver fails on very tall
    // sections (e.g. Explorations) because ratio stays tiny and exit-only
    // callbacks can leave the previous item stuck active.
    const update = () => {
      const header = document.querySelector("header");
      const headerH = header?.getBoundingClientRect().height ?? 34;
      const marker = headerH + 48;
      let current = elements[0].id;

      for (const el of elements) {
        if (el.getBoundingClientRect().top <= marker) {
          current = el.id;
        }
      }

      setActive(current);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [sections]);

  const onJump = (id: string) => (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    setActive(id);
    const header = document.querySelector("header");
    const headerH = header?.getBoundingClientRect().height ?? 34;
    // Tuck the section divider just under the sticky nav so it isn’t visible
    const overlap = 2;
    const top = window.scrollY + el.getBoundingClientRect().top - headerH + overlap;
    window.scrollTo({ top, behavior: "smooth" });
    history.replaceState(null, "", `#${id}`);
  };

  return (
    <nav
      aria-label="Case study sections"
      data-case-study-sidebar={fadeUnderMedia ? "" : undefined}
      aria-hidden={hidden || undefined}
      className={[
        "flex w-[105px] flex-col gap-[3px] transition-[opacity,filter] duration-500 ease-out",
        hidden ? "pointer-events-none opacity-0 blur-sm" : "opacity-100 blur-0",
      ].join(" ")}
    >
      {sections.map((section) => {
        const isActive = active === section.id;
        return (
          <a
            key={section.id}
            href={`#${section.id}`}
            onClick={onJump(section.id)}
            className={[
              "case-study-toc-link block py-0.5 text-[14px] leading-[18.2px] tracking-[0.14px] transition-colors",
              isActive ? "is-active" : "",
            ].join(" ")}
          >
            {section.label}
          </a>
        );
      })}
    </nav>
  );
}
