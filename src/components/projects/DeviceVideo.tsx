"use client";

import { AutoplayVideo } from "@/components/AutoplayVideo";

// Keep the original 3× bezel separate from the recording to preserve its quality.
const FRAME_W = 1350;
const FRAME_H = 2760;
const SCREEN_LEFT = 72;
const SCREEN_TOP = 69;
const SCREEN_W = 1206;
const SCREEN_H = 2622;

export type DeviceVideoProps = {
  src: string;
  poster?: string;
  alt: string;
};

export function DeviceVideo({ src, poster, alt }: DeviceVideoProps) {
  return (
    <div className="relative w-full" style={{ aspectRatio: `${FRAME_W} / ${FRAME_H}` }}>
      <div
        className="absolute overflow-hidden bg-black"
        style={{
          left: `${(SCREEN_LEFT / FRAME_W) * 100}%`,
          top: `${(SCREEN_TOP / FRAME_H) * 100}%`,
          width: `${(SCREEN_W / FRAME_W) * 100}%`,
          height: `${(SCREEN_H / FRAME_H) * 100}%`,
          borderRadius: `${(186 / SCREEN_W) * 100}% / ${(186 / SCREEN_H) * 100}%`,
          // Small overlap avoids seams between the recording and transparent bezel.
          transform: "scale(1.01)",
        }}
      >
        <AutoplayVideo
          className="absolute inset-0 h-full w-full object-contain"
          src={src}
          poster={poster}
          width={SCREEN_W}
          height={SCREEN_H}
          aria-label={alt}
          preload="metadata"
          playWhenVisible
        />
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/media/dasher/iphone-frame.png"
        alt=""
        width={FRAME_W}
        height={FRAME_H}
        draggable={false}
        className="pointer-events-none absolute inset-0 z-10 h-full w-full select-none"
      />
    </div>
  );
}
