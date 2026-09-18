"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { PittsburghClock } from "@/components/PittsburghClock";
import { site } from "@/lib/site";

const navItems = [
  { label: "Projects", href: "/" },
  { label: "About", href: "/about" },
  { label: "Playground", href: "/playground" },
] as const;

function activeFromPath(pathname: string) {
  if (pathname.startsWith("/about")) return "About";
  if (pathname.startsWith("/playground")) return "Playground";
  return "Projects";
}

function NavDoodle() {
  return (
    <span className="nav-doodle" aria-hidden>
      <svg viewBox="0 0 29 23" fill="none">
        <path
          d="M 8.351 4.465 C 1.722 8.67 -3.233 19.057 2.558 20.436 C 16.65 23.792 29.544 11.382 26.569 3.933 C 24.189 -2.027 9.363 0.087 2.248 1.889 L 1.819 1.889"
          transform="translate(1 1)"
          pathLength={1}
        />
      </svg>
    </span>
  );
}

function DesktopNav({ active }: { active: string }) {
  return (
    <div
      className="grid w-full items-center gap-x-5 px-5 py-[9px]"
      style={{ gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)" }}
    >
      <div />
      <nav className="flex items-center gap-3">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="nav-link"
            data-active={item.label === active}
          >
            {item.label}
            <NavDoodle />
          </Link>
        ))}
      </nav>
    </div>
  );
}

function MobileBar({
  active,
  menuOpen,
  setMenuOpen,
}: {
  active: string;
  menuOpen: boolean;
  setMenuOpen: (value: boolean | ((v: boolean) => boolean)) => void;
}) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen, setMenuOpen]);

  return (
    <div className="sticky top-0 z-50 min-[600px]:hidden">
      <div
        className={[
          "relative z-20 flex items-center justify-between px-3 py-3",
          menuOpen ? "bg-white" : "bg-white/70 backdrop-blur-[3px]",
        ].join(" ")}
      >
        <Link
          href="/"
          className="text-[14px] leading-[18.2px] tracking-[0.14px]"
          onClick={() => setMenuOpen(false)}
        >
          {site.name}
        </Link>
        <button
          type="button"
          className="nav-link rounded-full px-1.5 py-0.5 active:bg-black/5"
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          Menu
        </button>
      </div>

      <div
        className={[
          "mobile-menu-panel fixed inset-0 z-10 flex flex-col bg-white px-3 pt-14 pb-[60px]",
          menuOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-3 opacity-0",
        ].join(" ")}
        aria-hidden={!menuOpen}
      >
        <div className="mt-auto flex flex-col gap-6">
          <nav className="flex flex-col gap-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="nav-link"
                data-active={item.label === active}
                onClick={() => setMenuOpen(false)}
                tabIndex={menuOpen ? 0 : -1}
              >
                {item.label}
                <NavDoodle />
              </Link>
            ))}
          </nav>

          <div className="flex w-[200px] flex-col gap-6">
            <div className="h-px bg-black/10" />
            <div className="flex flex-col gap-3 text-[14px] leading-[18.2px] tracking-[0.14px] text-foreground">
              <p className="text-[#7e7e7e]">About</p>
              <p>
                I design meaningful human experiences that integrate digital and
                physical systems. At the moment, I&apos;m interested in
                translating the expanding role of technology into intuitive and
                meaningful user interfaces.
              </p>
              <p>
                Currently, I&apos;m studying{" "}
                <a
                  className="plain-link"
                  href={site.links.design}
                  target="_blank"
                  rel="noreferrer"
                  tabIndex={menuOpen ? 0 : -1}
                >
                  Design
                </a>
                ,{" "}
                <a
                  className="plain-link"
                  href={site.links.hci}
                  target="_blank"
                  rel="noreferrer"
                  tabIndex={menuOpen ? 0 : -1}
                >
                  HCI
                </a>
                ,{" "}
                <a
                  className="plain-link"
                  href={site.links.physicalComputing}
                  target="_blank"
                  rel="noreferrer"
                  tabIndex={menuOpen ? 0 : -1}
                >
                  Physical Computing
                </a>{" "}
                @ Carnegie Mellon Univeresity. Previously, desgining @{" "}
                <a
                  className="plain-link"
                  href={site.links.doordash}
                  target="_blank"
                  rel="noreferrer"
                  tabIndex={menuOpen ? 0 : -1}
                >
                  DoorDash
                </a>
              </p>
            </div>
            <div className="h-px bg-black/10" />
            <div className="flex flex-col gap-1 text-[14px] leading-[18.2px] tracking-[0.14px]">
              <p className="text-[#7e7e7e]">Contact</p>
              <a
                className="footer-link"
                href={`mailto:${site.email}`}
                tabIndex={menuOpen ? 0 : -1}
              >
                {site.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const BIO_EASE = "cubic-bezier(0.44, 0, 0.56, 1)";
const BIO_MS = 500;

function HeaderBio({ collapsed }: { collapsed: boolean }) {
  const innerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | "auto">(collapsed ? 0 : "auto");
  const [ready, setReady] = useState(false);
  const skipRef = useRef(true);

  useEffect(() => {
    setReady(true);
  }, []);

  useLayoutEffect(() => {
    const inner = innerRef.current;
    if (!inner) return;

    if (skipRef.current) {
      skipRef.current = false;
      setHeight(collapsed ? 0 : "auto");
      return;
    }

    if (collapsed) {
      setHeight(inner.getBoundingClientRect().height || inner.scrollHeight);
      let innerFrame = 0;
      const outerFrame = requestAnimationFrame(() => {
        innerFrame = requestAnimationFrame(() => setHeight(0));
      });
      return () => {
        cancelAnimationFrame(outerFrame);
        cancelAnimationFrame(innerFrame);
      };
    }

    setHeight(inner.scrollHeight);
  }, [collapsed]);

  return (
    <div
      className="min-w-0 overflow-hidden motion-reduce:!transition-none"
      style={{
        height: height === "auto" ? "auto" : height,
        transition: ready ? `height ${BIO_MS}ms ${BIO_EASE}` : undefined,
      }}
      onTransitionEnd={(event) => {
        if (event.propertyName !== "height") return;
        if (!collapsed) setHeight("auto");
      }}
    >
      <div
        ref={innerRef}
        className={[
          "flex w-full max-w-[453px] flex-col gap-3 text-[14px] leading-[18.2px] tracking-[0.14px] text-foreground motion-reduce:!transition-none",
          collapsed
            ? "pointer-events-none opacity-0"
            : "opacity-100",
        ].join(" ")}
        style={{
          transition: ready ? `opacity ${BIO_MS}ms ${BIO_EASE}` : undefined,
        }}
        aria-hidden={collapsed}
      >
        <p>
          I design meaningful human experiences that integrate digital and
          physical systems. At the moment, I&apos;m interested in translating
          the expanding role of technology into intuitive and meaningful user
          interfaces.
        </p>
        <p>
          Currently, I&apos;m studying{" "}
          <a
            className="plain-link"
            href={site.links.design}
            target="_blank"
            rel="noreferrer"
          >
            Design
          </a>
          ,{" "}
          <a
            className="plain-link"
            href={site.links.hci}
            target="_blank"
            rel="noreferrer"
          >
            HCI
          </a>
          ,{" "}
          <a
            className="plain-link"
            href={site.links.physicalComputing}
            target="_blank"
            rel="noreferrer"
          >
            Physical Computing
          </a>{" "}
          @ Carnegie Mellon Univeresity. Previously, desgining @{" "}
          <a
            className="plain-link"
            href={site.links.doordash}
            target="_blank"
            rel="noreferrer"
          >
            DoorDash
          </a>
        </p>
      </div>
    </div>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const active = activeFromPath(pathname);
  const collapsed = pathname === "/about";
  const [menuOpen, setMenuOpen] = useState(false);

  const [pinned, setPinned] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const [navHeight, setNavHeight] = useState(42);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setPinned(!entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "0px" },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (navRef.current) {
      setNavHeight(navRef.current.getBoundingClientRect().height);
    }
  }, []);

  return (
    <>
      <div className="hidden min-[600px]:block">
        <div
          className="grid items-start gap-x-5 gap-y-2.5 px-5 py-3"
          style={{ gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)" }}
        >
          <div className="relative overflow-visible pt-[3px]">
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
          </div>

          <div
            className="grid items-start gap-x-5 pt-[3px]"
            style={{ gridTemplateColumns: "minmax(0,1fr) auto" }}
          >
            <HeaderBio collapsed={collapsed} />
            <div className="hidden justify-self-end min-[1200px]:block">
              <PittsburghClock />
            </div>
          </div>

          <div className="col-span-2 h-px bg-foreground/10" aria-hidden />
        </div>
      </div>

      <div ref={sentinelRef} className="hidden h-0 min-[600px]:block" aria-hidden />

      {pinned ? (
        <div
          className="hidden min-[600px]:block"
          style={{ height: navHeight }}
          aria-hidden
        />
      ) : null}

      <div
        ref={navRef}
        className={[
          "z-50 hidden min-[600px]:block",
          pinned
            ? "fixed inset-x-0 top-0 bg-white/70 backdrop-blur-[3px]"
            : "relative bg-transparent",
        ].join(" ")}
      >
        <DesktopNav active={active} />
      </div>

      <MobileBar
        active={active}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />
    </>
  );
}
