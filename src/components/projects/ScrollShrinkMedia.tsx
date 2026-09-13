"use client";

import { useEffect, useRef } from "react";
import { useScrollShrinkCoverSetter } from "@/components/projects/ScrollShrinkCover";

/** Below this viewport width the effect is skipped and the media stays in column. */
const MIN_VIEWPORT = 1200;
/** Gap below the sticky header while the media is pinned. */
const TOP_GAP = 16;
/** Gap above the viewport bottom so corner controls stay on screen. */
const BOTTOM_GAP = 20;

function clamp01(value: number) {
  return value < 0 ? 0 : value > 1 ? 1 : value;
}

/**
 * Pins the media while scrolling and interpolates it from full-bleed width down
 * to the width of the surrounding text column. The scroll distance consumed by
 * the pin equals the extra height reserved on the track, so the content below
 * ends up flush against the media once the transition finishes.
 */
export function ScrollShrinkMedia({
  aspect,
  children,
}: {
  aspect: number;
  children: React.ReactNode;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const setCover = useScrollShrinkCoverSetter();
  const lastCover = useRef(0);

  useEffect(() => {
    const host = hostRef.current;
    const track = trackRef.current;
    const pin = pinRef.current;
    const inner = innerRef.current;
    if (!host || !track || !pin || !inner) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    type Metrics = {
      trackTop: number;
      columnWidth: number;
      bleedWidth: number;
      scrub: number;
      offsetTop: number;
    };

    let metrics: Metrics | null = null;
    let frame = 0;

    const publishCover = (value: number) => {
      if (value === lastCover.current) return;
      lastCover.current = value;
      setCover(value);
    };

    const reset = () => {
      track.style.height = "";
      track.style.position = "";
      pin.style.position = "";
      pin.style.top = "";
      pin.style.height = "";
      inner.style.width = "";
      inner.style.marginLeft = "";
      publishCover(0);
    };

    const render = () => {
      if (!metrics) return;
      const { trackTop, columnWidth, bleedWidth, scrub, offsetTop } = metrics;

      const progress = clamp01(
        (window.scrollY - (trackTop - offsetTop)) / scrub,
      );
      const width = columnWidth + (bleedWidth - columnWidth) * (1 - progress);
      const height = width / aspect;

      track.style.position = "relative";
      track.style.height = `${height + scrub}px`;
      pin.style.position = "sticky";
      pin.style.top = `${offsetTop}px`;
      pin.style.height = `${height}px`;
      inner.style.width = `${width}px`;
      inner.style.marginLeft = `${(columnWidth - width) / 2}px`;

      const sidebar = document.querySelector("[data-case-study-sidebar]");
      if (!sidebar) {
        publishCover(0);
        return;
      }

      const wide = width > columnWidth + 8;
      const sr = sidebar.getBoundingClientRect();
      const mr = inner.getBoundingClientRect();
      // Start fading when the video sits just under the nav, before they overlap.
      const fadeStart = sr.bottom + 160;
      const approaching =
        mr.bottom > sr.top &&
        mr.top < fadeStart;
      publishCover(wide && approaching ? 1 : 0);
    };

    const measure = () => {
      const columnWidth = host.clientWidth;
      const header = document.querySelector("header");
      const headerH = header?.getBoundingClientRect().height ?? 34;
      const offsetTop = headerH + TOP_GAP;
      const maxHeight = window.innerHeight - offsetTop - BOTTOM_GAP;
      const bleedWidth = Math.min(
        window.innerWidth,
        maxHeight * aspect,
      );

      if (
        reduceMotion ||
        window.innerWidth < MIN_VIEWPORT ||
        bleedWidth <= columnWidth
      ) {
        metrics = null;
        reset();
        return;
      }

      // The track itself never sticks, so this stays a stable document offset.
      const trackTop = track.getBoundingClientRect().top + window.scrollY;

      metrics = {
        trackTop,
        columnWidth,
        bleedWidth,
        scrub: Math.max(360, window.innerHeight * 0.6),
        offsetTop,
      };
      render();
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        render();
      });
    };

    measure();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      reset();
    };
  }, [aspect, setCover]);

  return (
    <div ref={hostRef} className="w-full">
      <div ref={trackRef}>
        <div ref={pinRef}>
          <div ref={innerRef}>{children}</div>
        </div>
      </div>
    </div>
  );
}
