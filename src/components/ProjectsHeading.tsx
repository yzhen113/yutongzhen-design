"use client";

import { useEffect, useRef } from "react";

/** Exact scribble path from Vector 2 / Framer Projects hover underline */
const UNDERLINE_PATH =
  "M0.230469 17.5C16.8971 8.83333 97.4269 -2.23046 100.23 2.12065C103.034 6.47176 48.7305 22.6999 46.7305 17.5C45.8262 15.1489 99.2305 0.5 119.73 0.5C128.23 0.5 138.23 0.623512 139.73 3.14917C140.896 5.11096 129.445 8.14917 129.23 6.64917C128.945 4.64917 176.23 0.5 197.23 0.5C214.03 0.5 246.897 3.8334 261.23 5.5001";

/**
 * "Projects" heading with Framer-style pen draw underline.
 * Same stroke-dashoffset animation as hover on yutongzhen.design, but plays on load.
 * Framer transition: Ease In Out, bezier(0.44, 0, 0.56, 1), 1s, delay 0, stroke width 1.
 */
export function ProjectsHeading() {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;
    path.getBoundingClientRect();

    const frame = requestAnimationFrame(() => {
      path.style.transition =
        "stroke-dashoffset 1.35s cubic-bezier(0.44, 0, 0.56, 1)";
      path.style.strokeDashoffset = "0";
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="relative inline-block">
      <h1 className="relative z-[1] text-[26px] font-medium leading-[31.2px] tracking-[-1.04px] text-foreground">
        Projects
      </h1>
      <svg
        className="pointer-events-none absolute left-[2px] top-[calc(100%-4px)] z-0 overflow-visible"
        width="125"
        height="11"
        viewBox="0 0 262 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <path
          ref={pathRef}
          d={UNDERLINE_PATH}
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}
