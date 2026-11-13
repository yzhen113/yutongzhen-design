"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { PittsburghClock } from "@/components/PittsburghClock";
import { ProjectMedia, ProjectMeta } from "@/components/ProjectCardParts";
import { projects, site, type Project, type ProjectCategory } from "@/lib/site";

type Filter = "all" | ProjectCategory;

/** Each filter is its own route, so /product and /experience keep working as links. */
const filters: { id: Filter; label: string; href: string }[] = [
  { id: "all", label: "All", href: "/" },
  { id: "product", label: "Product", href: "/product" },
  { id: "experience", label: "Experience", href: "/experience" },
];


const socialLinks = [
  { label: "Resume", href: site.resume },
  { label: "LinkedIn", href: site.linkedin },
  { label: "Medium", href: site.medium },
  { label: "X", href: site.x },
] as const;

function filterFromPath(pathname: string): Filter {
  if (pathname === "/product") return "product";
  if (pathname === "/experience") return "experience";
  return "all";
}

/** Order on the All view: evenly spaced, with product and experience work mixed. */
const ALL_ORDER = [
  "/projects/dasher",
  "/projects/bumble",
  "/projects/cmu-out-loud",
  "/projects/tom",
  "/projects/cmused",
  "/projects/turning-toward",
  "/projects/hybrid-exhibition-james-jean",
];

function projectsFor(filter: Filter): Project[] {
  if (filter !== "all") return projects.filter((project) => project.category === filter);
  const ordered = ALL_ORDER.flatMap((href) => projects.filter((project) => project.href === href));
  // Anything not listed (e.g. a new project) follows in the site's order.
  return [...ordered, ...projects.filter((project) => !ALL_ORDER.includes(project.href ?? ""))];
}

const headingFor = (filter: Filter) =>
  filter === "product" ? "Product" : filter === "experience" ? "Experience" : "All projects";

const countFor = (filter: Filter) =>
  filter === "all"
    ? projects.length
    : projects.filter((project) => project.category === filter).length;

function Label({ children }: { children: React.ReactNode }) {
  return <p className="text-[#7e7e7e]">{children}</p>;
}

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a className="plain-link" href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
}

/** Name with the handwritten signature, as in the original header. */
function NameMark() {
  return (
    <Link
      href="/"
      className="relative inline-block overflow-visible text-[14px] leading-[18.2px] tracking-[0.14px] text-foreground"
    >
      {site.name}
      <span className="pointer-events-none absolute left-[30px] top-[-32px] z-10 block h-[101px] w-[101px] overflow-visible">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/media/signature.png"
          alt=""
          width={101}
          height={101}
          className="block h-[101px] w-[101px] max-w-none object-cover"
          draggable={false}
        />
      </span>
    </Link>
  );
}

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
      <div className="overflow-hidden">
        <ProjectMedia project={project} />
      </div>
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

/**
 * Home page with a persistent left sidebar: intro, navigation with the
 * All / Product / Experience filter, and contact. Work scrolls on the right.
 */
export function SidebarHome() {
  const pathname = usePathname();
  const filter = filterFromPath(pathname);
  const [hovered, setHovered] = useState<string | null>(null);


  return (
    <div className="px-3 min-[1000px]:grid min-[1000px]:grid-cols-[minmax(260px,320px)_minmax(0,1fr)] min-[1000px]:gap-x-5 min-[1000px]:px-5">
      <aside className="flex flex-col gap-10 pt-3 pb-12 min-[1000px]:sticky min-[1000px]:top-0 min-[1000px]:h-screen min-[1000px]:justify-between min-[1000px]:overflow-y-auto min-[1000px]:pb-5">
        <div className="flex flex-col gap-10">
          <div className="pt-[3px]">
            <NameMark />
          </div>

          <div className="flex flex-col gap-3 pt-[60px] min-[1000px]:pt-10">
            <p>
              I design meaningful human experiences that integrate digital and
              physical systems, translating the expanding role of technology
              into intuitive, meaningful and fun interfaces.
            </p>
            <p>
              Currently studying <ExternalLink href={site.links.design}>Design</ExternalLink>,{" "}
              <ExternalLink href={site.links.hci}>HCI</ExternalLink>,{" "}
              <ExternalLink href={site.links.physicalComputing}>Physical Computing</ExternalLink>{" "}
              @ <ExternalLink href={site.links.cmu}>Carnegie Mellon University</ExternalLink>.
              Previously, designing @{" "}
              <ExternalLink href={site.links.doordash}>DoorDash</ExternalLink>.
            </p>
          </div>

          <nav aria-label="Primary" className="flex flex-col gap-1">
            <Label>Navigate</Label>
            <span className="nav-link" data-active="true">
              Projects
            </span>
            <div className="flex flex-col gap-1 border-l border-black/10 pl-3">
              {filters.map((item) => {
                const selected = filter === item.id;
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    scroll={false}
                    aria-current={selected ? "page" : undefined}
                    className={[
                      "flex w-fit items-start gap-1 transition-colors hover:text-[var(--nav-active)]",
                      selected ? "text-foreground" : "text-[#a8a8a8]",
                    ].join(" ")}
                  >
                    {item.label}
                    <sup className="pt-[2px] text-[10px] leading-[10px] tabular-nums">
                      {countFor(item.id)}
                    </sup>
                  </Link>
                );
              })}
            </div>
            <Link href="/about" className="nav-link w-fit">
              About
            </Link>
            <Link href="/playground" className="nav-link w-fit">
              Playground
            </Link>
          </nav>
        </div>

        <div className="flex flex-col gap-3">
          <div className="h-px bg-black/10" />
          {/* Email, then the clock on its own line so the time never wraps in the narrow sidebar. */}
          <div className="flex flex-col gap-1">
            <a className="footer-link w-fit" href={`mailto:${site.email}`}>
              {site.email}
            </a>
            <div className="whitespace-nowrap [&>div]:justify-start">
              <PittsburghClock />
            </div>
          </div>
          <div className="flex flex-wrap gap-x-3 gap-y-1">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                className="footer-link"
                href={link.href}
                target="_blank"
                rel="noreferrer"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </aside>

      <main className="pb-24 min-[1000px]:border-l min-[1000px]:border-black/10 min-[1000px]:pt-5 min-[1000px]:pl-5">
        <h2 className="sr-only">{headingFor(filter)}</h2>
        <div className="grid grid-cols-1 gap-x-5 gap-y-[33px] min-[1400px]:grid-cols-2">
          {projectsFor(filter).map((project) => (
            <Card
              key={project.title}
              project={project}
              hovered={hovered === project.title}
              onHover={setHovered}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
