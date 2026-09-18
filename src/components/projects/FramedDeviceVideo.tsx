"use client";

import { AutoplayVideo } from "@/components/AutoplayVideo";

// Original 3× device artwork: 1350 × 2760, screen aperture 1206 × 2622.
// Keep the screen video separate so it never inherits compression from the bezel/background.
const FRAME_W = 1350;
const FRAME_H = 2760;
const SCREEN_LEFT = 72;
const SCREEN_TOP = 69;
const SCREEN_W = 1206;
const SCREEN_H = 2622;
const DEVICE_W = 449;
const ARTBOARD = 1082;

export function FramedDeviceVideo({
  src,
  poster,
  alt,
}: {
  src: string;
  poster?: string;
  alt: string;
}) {
  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-[8px] border border-solid border-[#f2f2f2] bg-[#fcfcfc]">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: `${(DEVICE_W / ARTBOARD) * 100}%`,
          aspectRatio: `${FRAME_W} / ${FRAME_H}`,
        }}
      >
        <div
          className="absolute overflow-hidden bg-black"
          style={{
            left: `${(SCREEN_LEFT / FRAME_W) * 100}%`,
            top: `${(SCREEN_TOP / FRAME_H) * 100}%`,
            width: `${(SCREEN_W / FRAME_W) * 100}%`,
            height: `${(SCREEN_H / FRAME_H) * 100}%`,
            borderRadius: `${(186 / SCREEN_W) * 100}% / ${(186 / SCREEN_H) * 100}%`,
            // Overlap the transparent aperture to prevent subpixel seams at responsive sizes.
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
        {/* Keep the supplied transparent bezel at its original pixel quality. */}
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
    </div>
  );
}
