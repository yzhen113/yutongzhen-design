"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore, type MouseEvent } from "react";
import { createPortal } from "react-dom";
import { CASE_STUDY_TOC_SLOT } from "@/components/SidebarShell";
import { useScrollShrinkCover } from "@/components/projects/ScrollShrinkCover";

/**
 * Phones only: a slim bar with the way back to the projects. On wider screens
 * the home page's sidebar carries the navigation instead (SidebarShell).
 */
export function CaseStudyHeader({ title }: { title: string }) {
  return (
    <header className="sticky top-0 z-50 w-full bg-[rgba(250,250,250,0.95)] min-[1000px]:hidden">
      <div className="flex items-center justify-between gap-5 px-3 py-2 text-[14px] leading-[18.2px] tracking-[0.14px]">
        <Link href="/" className="nav-link flex shrink-0 items-center gap-1.5">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
            <path d="M11 6H1M5.5 1.5 1 6l4.5 4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Projects
        </Link>
        <p className="min-w-0 truncate text-right text-[#7e7e7e]">{title}</p>
      </div>
    </header>
  );
}

// The sidebar slot is part of the layout, so it never changes while a page is open.
const noSubscribe = () => () => {};

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

export const cmuOutLoudSections = [
  { id: "overview", label: "Overview" },
  { id: "context", label: "Context" },
  { id: "research", label: "Research" },
  { id: "explorations", label: "Explorations" },
  { id: "design", label: "Design" },
  { id: "build", label: "Build" },
  { id: "reflection", label: "Reflection" },
] as const;

export const turningTowardSections = [
  { id: "overview", label: "Overview" },
  { id: "context", label: "Context" },
  { id: "research", label: "Research" },
  { id: "solution", label: "Concept" },
  { id: "process", label: "Process" },
  { id: "reflection", label: "Reflection" },
] as const;

export function CaseStudySidebar({
  sections = bumbleSections,
  fadeUnderMedia = false,
}: {
  sections?: readonly { id: string; label: string }[];
  fadeUnderMedia?: boolean;
}) {
  const navRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(sections[0]?.id ?? "");
  const mediaCover = useScrollShrinkCover();
  // In the sidebar layout the list moves into the site sidebar, under the project's title.
  const slot = useSyncExternalStore(
    noSubscribe,
    () => document.getElementById(CASE_STUDY_TOC_SLOT),
    () => null,
  );
  const hidden = !slot && fadeUnderMedia && mediaCover > 0;

  useLayoutEffect(() => {
    if (slot) return;
    const nav = navRef.current;
    const pin = nav?.parentElement;
    const aside = pin?.closest("aside");
    if (!nav || !pin || !aside) return;

    // Change positioning only at the article boundaries. While reading, the
    // sidebar is viewport-fixed: no sticky offsets or scroll-driven transforms.
    const update = () => {
      const bounds = aside.getBoundingClientRect();
      const mode = bounds.top > 52
        ? "before"
        : bounds.bottom - 40 <= 52 + pin.offsetHeight
          ? "after"
          : "pinned";
      if (pin.dataset.position !== mode) pin.dataset.position = mode;
      const left = `${bounds.left}px`;
      if (pin.style.getPropertyValue("--sidebar-left") !== left) {
        pin.style.setProperty("--sidebar-left", left);
      }
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(aside);
    observer.observe(nav);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      delete pin.dataset.position;
      pin.style.removeProperty("--sidebar-left");
    };
  }, [slot]);

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

  if (slot) {
    return createPortal(
      <nav aria-label="Case study sections" className="flex flex-col gap-1">
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            onClick={onJump(section.id)}
            aria-current={active === section.id ? "location" : undefined}
            className={[
              "w-fit transition-colors",
              active === section.id
                ? "!text-[var(--nav-active)]"
                : "!text-foreground hover:!text-[var(--nav-active)]",
            ].join(" ")}
          >
            {section.label}
          </a>
        ))}
      </nav>,
      slot,
    );
  }

  return (
    <nav
      ref={navRef}
      aria-label="Case study sections"
      data-case-study-sidebar={fadeUnderMedia ? "" : undefined}
      aria-hidden={hidden || undefined}
      className={[
        "flex w-[105px] flex-col gap-[3px] transition-opacity duration-500 ease-out",
        hidden ? "pointer-events-none opacity-0" : "opacity-100",
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
