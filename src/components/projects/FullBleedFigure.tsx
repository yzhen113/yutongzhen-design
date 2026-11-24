"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { MediaReveal } from "@/components/MediaReveal";
import { SmoothCorners } from "@/components/SmoothCorners";
import { useScrollShrinkCoverSetter } from "@/components/projects/ScrollShrinkCover";

/**
 * A photo that breaks out of the text column to the page width (20px gutters,
 * like CMUsed's full-width screens, with the page's rounded corners) and hides the case study sidebar while it
 * passes beside it. Served as the original file, without re-compression.
 */
export function FullBleedFigure({
  src,
  alt,
  width,
  height,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const setCover = useScrollShrinkCoverSetter();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let last = -1;
    let frame = 0;

    const update = () => {
      frame = 0;
      const sidebar = document.querySelector("[data-case-study-sidebar]");
      const sr = sidebar?.getBoundingClientRect();
      // No sidebar on narrow screens (it's display: none, so its box is empty).
      let value = 0;
      if (sr && sr.height > 0) {
        const mr = el.getBoundingClientRect();
        // Fade a little before the photo reaches the sidebar, same as the scroll-shrink video.
        value = mr.bottom > sr.top - 40 && mr.top < sr.bottom + 160 ? 1 : 0;
      }
      if (value !== last) {
        last = value;
        setCover(value);
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      setCover(0);
    };
  }, [setCover]);

  return (
    <figure
      ref={ref}
      // Centered on the column, as wide as the page container minus 20px gutters.
      className="relative left-1/2 w-[min(calc(100vw-40px),1400px)] -translate-x-1/2"
    >
      {/* Same 8px smooth corners as the page's other figures and videos. */}
      <SmoothCorners radius={8} className="w-full overflow-hidden rounded-[8px] bg-[#f2f2f2]">
        <MediaReveal>
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            unoptimized
            className="block h-auto w-full"
            sizes="100vw"
          />
        </MediaReveal>
      </SmoothCorners>
    </figure>
  );
}
