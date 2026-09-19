"use client";

import { useEffect, useRef, type CSSProperties } from "react";

export function AutoplayVideo({
  src,
  poster,
  className,
  style,
  width,
  height,
  preload = "auto",
  playWhenVisible = false,
  "aria-label": ariaLabel,
}: {
  src: string;
  poster?: string;
  className?: string;
  style?: CSSProperties;
  width?: number;
  height?: number;
  preload?: "auto" | "metadata" | "none";
  playWhenVisible?: boolean;
  "aria-label"?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");

    let inView = !playWhenVisible;

    const play = () => {
      if (!inView) return;
      video.muted = true;
      void video.play().catch(() => {});
    };

    const restart = () => {
      video.currentTime = 0;
      play();
    };

    play();
    video.addEventListener("loadeddata", play);
    video.addEventListener("canplay", play);
    video.addEventListener("ended", restart);

    let observer: IntersectionObserver | undefined;
    if (playWhenVisible) {
      observer = new IntersectionObserver(
        ([entry]) => {
          inView = entry.isIntersecting;
          if (inView) play();
          else video.pause();
        },
        { threshold: 0.25 },
      );
      observer.observe(video);
    }

    return () => {
      video.removeEventListener("loadeddata", play);
      video.removeEventListener("canplay", play);
      video.removeEventListener("ended", restart);
      observer?.disconnect();
    };
  }, [playWhenVisible, src]);

  return (
    <video
      ref={ref}
      className={["autoplay-video", className].filter(Boolean).join(" ")}
      style={style}
      src={src}
      poster={poster}
      width={width}
      height={height}
      autoPlay={!playWhenVisible}
      muted
      loop
      playsInline
      preload={preload}
      controls={false}
      controlsList="nodownload nofullscreen noremoteplayback"
      disablePictureInPicture
      disableRemotePlayback
      aria-label={ariaLabel}
    />
  );
}
