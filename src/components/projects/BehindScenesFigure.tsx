"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Side = "left" | "right";

// Leader arrow: 1.5px line with a filled dot on the photo-facing end. Length is
// driven by the --arrow-len variable set on the wrapper so it scales per screen.
function ArrowLeader({
  dir,
  style,
}: {
  dir: Side;
  style: React.CSSProperties;
}) {
  return (
    <div
      className="pointer-events-none absolute h-2 w-[var(--arrow-len)] max-w-none"
      style={{ transform: "translateY(-50%)", ...style }}
      aria-hidden
    >
      <span className="absolute top-1/2 right-0 left-0 h-[1.5px] -translate-y-1/2 bg-[#d9d9d9]" />
      <span
        className={[
          "absolute top-1/2 size-2 -translate-y-1/2 rounded-full bg-[#d9d9d9]",
          dir === "right" ? "right-0" : "left-0",
        ].join(" ")}
      />
    </div>
  );
}

// Minimum clearance allowed between a label and the photo before we hide the
// whole annotation (arrow + text) so nothing overlaps the image.
const MIN_GAP = 5;

export function BehindScenesFigure() {
  const imgRef = useRef<HTMLImageElement>(null);
  const labelRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];
  // Each annotation sits on one side of the photo; that determines which edges
  // we compare when checking the gap.
  const sides: Side[] = ["left", "left", "right"];
  const [hidden, setHidden] = useState([false, false, false]);

  useEffect(() => {
    const measure = () => {
      const img = imgRef.current?.getBoundingClientRect();
      if (!img) return;
      setHidden(
        labelRefs.map((ref, i) => {
          const r = ref.current?.getBoundingClientRect();
          if (!r) return false;
          const gap =
            sides[i] === "left" ? img.left - r.right : r.left - img.right;
          return gap < MIN_GAP;
        }),
      );
    };

    measure();
    const ro = new ResizeObserver(measure);
    if (imgRef.current) ro.observe(imgRef.current);
    window.addEventListener("resize", measure);
    if (typeof document !== "undefined" && "fonts" in document) {
      document.fonts.ready.then(measure).catch(() => {});
    }
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const vis = (i: number): React.CSSProperties => ({
    visibility: hidden[i] ? "hidden" : "visible",
  });

  return (
    <div className="relative w-full [--arrow-len:clamp(120px,18vw,180px)] min-[1200px]:[--arrow-len:200px]">
      <div className="overflow-hidden rounded-[8px]">
        <Image
          ref={imgRef}
          src="/media/turning-toward/behind-scenes-photo.png"
          alt="Behind the scenes: Unity scripted interactions, Motive Optitrack system, and motion tracking markers on a 3D printed object"
          width={1840}
          height={1124}
          className="h-auto w-full rounded-[8px]"
          sizes="(max-width: 1199px) 100vw, 550px"
          quality={100}
        />
      </div>

      <div className="pointer-events-none absolute inset-0 hidden min-[600px]:block">
        <ArrowLeader
          dir="right"
          style={{
            left: "calc(4.891% - var(--arrow-len))",
            top: "calc(20.107% + 17px)",
            ...vis(0),
          }}
        />
        <ArrowLeader
          dir="right"
          style={{
            left: "calc(4.891% - var(--arrow-len))",
            top: "calc(72.064% + 20px)",
            ...vis(1),
          }}
        />
        <ArrowLeader
          dir="left"
          style={{
            left: "calc(97.065% - 4px)",
            top: "calc(27.580% + 17px)",
            ...vis(2),
          }}
        />

        <div
          ref={labelRefs[0]}
          className="absolute whitespace-nowrap text-[13px] font-normal leading-[18.2px] tracking-[0.13px] text-foreground"
          style={{
            left: "calc(4.891% - var(--arrow-len))",
            top: "20.107%",
            ...vis(0),
          }}
        >
          <span className="font-bold">Unity</span>
          <br />
          Scripted interactions
        </div>
        <div
          ref={labelRefs[1]}
          className="absolute whitespace-nowrap text-[13px] font-normal leading-[20px] tracking-[0.13px] text-foreground"
          style={{
            left: "calc(4.891% - var(--arrow-len))",
            top: "72.064%",
            ...vis(1),
          }}
        >
          Motion tracking markers
          <br />
          on 3D printed object
        </div>
        <div
          ref={labelRefs[2]}
          className="absolute whitespace-nowrap text-left text-[13px] font-normal leading-[18.2px] tracking-[0.13px] text-foreground"
          style={{
            right: "calc(2.935% - var(--arrow-len))",
            top: "27.580%",
            ...vis(2),
          }}
        >
          <span className="font-bold">Motive</span>
          <br />
          Optitrack system
        </div>
      </div>
    </div>
  );
}
