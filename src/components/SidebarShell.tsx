"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PittsburghClock } from "@/components/PittsburghClock";
import { projects, site, type ProjectCategory } from "@/lib/site";

export type ProjectFilter = "all" | ProjectCategory;
type Section = "projects" | "about" | "playground";

/** Each filter is its own route, so /product and /experience keep working as links. "Projects" itself shows all of them. */
const filters: { id: ProjectFilter; label: string; href: string }[] = [
  { id: "product", label: "Product", href: "/product" },
  { id: "experience", label: "Experience", href: "/experience" },
];

const socialLinks = [
  { label: "Resume", href: site.resume },
  { label: "LinkedIn", href: site.linkedin },
  { label: "Medium", href: site.medium },
  { label: "X", href: site.x },
] as const;

export function filterFromPath(pathname: string): ProjectFilter | null {
  if (pathname === "/") return "all";
  if (pathname === "/product") return "product";
  if (pathname === "/experience") return "experience";
  return null;
}

function sectionFromPath(pathname: string): Section {
  if (pathname.startsWith("/about")) return "about";
  if (pathname.startsWith("/playground")) return "playground";
  return "projects";
}

const countFor = (filter: ProjectFilter) =>
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

/**
 * Persistent left sidebar (intro, navigation with the project filter, contact)
 * shared by the home, Product, Experience, About and Playground pages. The
 * page's own content goes in the column on the right.
 */
export function SidebarShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const section = sectionFromPath(pathname);
  const filter = filterFromPath(pathname);

  return (
    <div className="px-3 min-[1000px]:grid min-[1000px]:grid-cols-[minmax(260px,320px)_minmax(0,1fr)] min-[1000px]:gap-x-5 min-[1000px]:px-5">
      <aside className="flex flex-col gap-10 pt-3 pb-12 min-[1000px]:sticky min-[1000px]:top-0 min-[1000px]:h-screen min-[1000px]:justify-between min-[1000px]:overflow-y-auto min-[1000px]:pb-5">
        <div className="flex flex-col gap-10">
          {/* Name on the left, Pittsburgh time on the right of the same row. */}
          <div className="flex items-start justify-between gap-3 pt-[3px]">
            <NameMark />
            <div className="whitespace-nowrap">
              <PittsburghClock />
            </div>
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
            <Link
              href="/"
              className="nav-link w-fit"
              // Blue only while showing every project; a selected filter takes the highlight.
              data-active={section === "projects" && (filter === "all" || filter === null)}
            >
              Projects
            </Link>
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
                      selected ? "!text-[var(--nav-active)]" : "!text-foreground hover:!text-[var(--nav-active)]",
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
            <Link
              href="/about"
              className="nav-link w-fit"
              data-active={section === "about"}
              aria-current={section === "about" ? "page" : undefined}
            >
              About
            </Link>
            <Link
              href="/playground"
              className="nav-link w-fit"
              data-active={section === "playground"}
              aria-current={section === "playground" ? "page" : undefined}
            >
              Playground
            </Link>
          </nav>
        </div>

        <div className="flex flex-col gap-3">
          <div className="h-px bg-black/10" />
          <a className="footer-link w-fit" href={`mailto:${site.email}`}>
            {site.email}
          </a>
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

      {/* Top padding matches the 20px side margins. */}
      <main className="pb-24 min-[1000px]:border-l min-[1000px]:border-black/10 min-[1000px]:pt-5 min-[1000px]:pl-5">
        {children}
      </main>
    </div>
  );
}
