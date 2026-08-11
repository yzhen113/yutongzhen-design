"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { PittsburghClock } from "@/components/PittsburghClock";
import { site } from "@/lib/site";

const navItems = [
  { label: "Projects", href: "/" },
  { label: "About", href: "/about" },
  { label: "Playground", href: "/playground" },
] as const;

export function SiteHeader({ active = "Projects" }: { active?: string }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full">
      {/* Desktop header */}
      <div className="hidden min-[1100px]:block">
        <div
          className="grid items-start gap-x-5 px-5 pt-3"
          style={{ gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)" }}
        >
          <div className="relative pt-[3px]">
            <Link
              href="/"
              className="relative inline-block text-[14px] leading-[18.2px] tracking-[0.14px] text-foreground"
            >
              {site.name}
              <span className="pointer-events-none absolute left-[30px] top-[-35px]">
                <Image
                  src="/media/signature.png"
                  alt=""
                  width={101}
                  height={101}
                  className="h-[101px] w-[101px] object-contain"
                  priority
                />
              </span>
            </Link>
          </div>

          <div
            className="grid items-start gap-x-5 py-[3px]"
            style={{ gridTemplateColumns: "minmax(0,1fr) auto" }}
          >
            <div className="flex max-w-[453px] flex-col gap-3 text-[14px] leading-[18.2px] tracking-[0.14px] text-foreground">
              <p>
                I design meaningful human experiences that integrate digital and
                physical systems. At the moment, I&apos;m interested in
                translating the expanding role of technology into intuitive and
                meaningful user interfaces.
              </p>
              <p>
                Currently, I&apos;m studying{" "}
                <a className="site-link" href={site.links.design} target="_blank" rel="noreferrer">
                  Design
                </a>
                ,{" "}
                <a className="site-link" href={site.links.hci} target="_blank" rel="noreferrer">
                  HCI
                </a>
                ,{" "}
                <a
                  className="site-link"
                  href={site.links.physicalComputing}
                  target="_blank"
                  rel="noreferrer"
                >
                  Physical Computing
                </a>{" "}
                @ Carnegie Mellon Univeresity, and desgining @{" "}
                <a className="site-link" href={site.links.doordash} target="_blank" rel="noreferrer">
                  DoorDash
                </a>
              </p>
            </div>
            <div className="pt-[3px]">
              <PittsburghClock />
            </div>
          </div>
        </div>

        <div className="mx-5 mt-[18px] h-px bg-[var(--line)]" />

        <div
          className="grid items-center gap-x-5 px-5 py-[9px]"
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
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile header */}
      <div className="min-[1100px]:hidden">
        <div className="flex items-center justify-between px-3 py-3">
          <Link href="/" className="text-[14px] leading-[18.2px] tracking-[0.14px]">
            {site.name}
          </Link>
          <button
            type="button"
            className="nav-link"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
          >
            Menu
          </button>
        </div>
        {menuOpen ? (
          <nav className="flex flex-col gap-3 border-t border-[var(--line)] px-3 py-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="nav-link"
                data-active={item.label === active}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        ) : null}
      </div>
    </header>
  );
}
