"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

const PLAY_PATH =
  "M21.7109 184.634C21.7109 195.734 28.1909 200.907 35.7977 200.907C39.0847 200.907 42.5594 199.872 45.8463 197.99L187.09 114.844C195.824 109.765 199.017 106.191 199.017 100.453C199.017 94.6216 195.824 91.0474 187.09 85.9683L45.8463 2.82172C42.5594 0.940572 39.0847 0 35.7977 0C28.1909 0 21.7109 5.07909 21.7109 16.1779V184.634Z";
const PAUSE_PATH =
  "M15.2779 200.809H42.7782C52.9953 200.809 58.0562 195.748 58.0562 185.531V15.2779C58.0562 4.67887 52.9953 0 42.7782 0H15.2779C5.06082 0 0 5.06082 0 15.2779V185.531C0 195.748 5.06082 200.809 15.2779 200.809ZM102.267 200.809H129.767C139.984 200.809 145.045 195.748 145.045 185.531V15.2779C145.045 4.67887 139.984 0 129.767 0H102.267C92.0496 0 86.9887 5.06082 86.9887 15.2779V185.531C86.9887 195.748 92.0496 200.809 102.267 200.809Z";

function ControlButton({
  label,
  onClick,
  sizeClass,
  className = "",
  children,
}: {
  label: string;
  onClick: () => void;
  sizeClass: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onMouseDown={(event) => event.preventDefault()}
      onClick={(event) => {
        event.stopPropagation();
        onClick();
      }}
      className={["relative cursor-pointer", sizeClass, className].join(" ")}
    >
      <svg viewBox="0 0 24 24" className="absolute inset-0 size-full" aria-hidden>
        <g
          fill="white"
          fillOpacity={0.85}
          stroke="white"
          strokeOpacity={0.85}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {children}
        </g>
      </svg>
    </button>
  );
}

export function CaseStudyVideo({
  src,
  poster,
  alt,
  aspectClass = "aspect-video",
  wide = false,
  bleed = false,
  largeControls = bleed,
}: {
  src: string;
  poster?: string;
  alt: string;
  aspectClass?: string;
  wide?: boolean;
  bleed?: boolean;
  largeControls?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [muted, setMuted] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [chromeVisible, setChromeVisible] = useState(true);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showChrome = useCallback(() => {
    if (hideTimer.current) {
      clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }
    setChromeVisible(true);
  }, []);

  const scheduleHide = useCallback(() => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => {
      setChromeVisible(false);
      hideTimer.current = null;
    }, 500);
  }, []);

  const chromeClass = [
    "z-10 transition-opacity duration-200",
    chromeVisible
      ? "opacity-100"
      : "pointer-events-none opacity-0",
  ].join(" ");

  // Larger controls for the big video, smaller for the others
  const centerSizeClass = largeControls
    ? "size-[clamp(44px,6cqw,64px)]"
    : "size-[clamp(32px,7.5cqw,44px)]";
  const cornerSizeClass = largeControls
    ? "size-[clamp(24px,3.2cqw,32px)]"
    : "size-[clamp(18px,4cqw,24px)]";

  const toggle = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play();
    } else {
      video.pause();
    }
  }, []);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  }, []);

  const toggleFullscreen = useCallback(() => {
    const wrap = wrapRef.current;
    const video = videoRef.current;
    if (!wrap || !video) return;

    const doc = document as Document & {
      webkitFullscreenElement?: Element | null;
      webkitExitFullscreen?: () => Promise<void> | void;
    };
    const active = doc.fullscreenElement ?? doc.webkitFullscreenElement;
    if (active) {
      if (doc.exitFullscreen) void doc.exitFullscreen();
      else doc.webkitExitFullscreen?.();
      return;
    }

    const el = wrap as HTMLElement & {
      webkitRequestFullscreen?: () => void;
    };
    if (el.requestFullscreen) {
      void el.requestFullscreen();
      return;
    }
    if (el.webkitRequestFullscreen) {
      el.webkitRequestFullscreen();
      return;
    }

    const safariVideo = video as HTMLVideoElement & {
      webkitEnterFullscreen?: () => void;
    };
    safariVideo.webkitEnterFullscreen?.();
  }, []);

  const seekFromClientX = useCallback((clientX: number) => {
    const bar = barRef.current;
    const video = videoRef.current;
    if (!bar || !video || !video.duration) return;
    const rect = bar.getBoundingClientRect();
    const pct = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    video.currentTime = pct * video.duration;
    setProgress(pct);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onTime = () => {
      if (dragging.current || !video.duration) return;
      setProgress(video.currentTime / video.duration);
    };
    const onPlay = () => {
      setPlaying(true);
      setStarted(true);
      if (wrapRef.current?.matches(":hover")) showChrome();
      else scheduleHide();
    };
    const onPause = () => {
      setPlaying(false);
      showChrome();
    };

    video.addEventListener("timeupdate", onTime);
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    return () => {
      video.removeEventListener("timeupdate", onTime);
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, [scheduleHide, showChrome]);

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      if (dragging.current) seekFromClientX(event.clientX);
    };
    const onUp = () => {
      dragging.current = false;
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [seekFromClientX]);

  useEffect(() => {
    const sync = () => {
      const doc = document as Document & {
        webkitFullscreenElement?: Element | null;
      };
      const active = doc.fullscreenElement ?? doc.webkitFullscreenElement;
      setFullscreen(active === wrapRef.current);
    };
    document.addEventListener("fullscreenchange", sync);
    document.addEventListener("webkitfullscreenchange", sync);
    return () => {
      document.removeEventListener("fullscreenchange", sync);
      document.removeEventListener("webkitfullscreenchange", sync);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      onPointerEnter={showChrome}
      onPointerLeave={() => {
        if (!videoRef.current?.paused) scheduleHide();
      }}
      className={[
        "relative @container overflow-hidden rounded-[8px] bg-[#f2f2f2] [:fullscreen]:aspect-auto [:fullscreen]:flex [:fullscreen]:items-center [:fullscreen]:rounded-none [:fullscreen]:bg-black",
        aspectClass,
        bleed
          ? "w-full min-[1200px]:w-auto min-[1200px]:mx-[calc(50%-50vw+20px)]"
          : wide
            ? "w-full min-[1200px]:left-1/2 min-[1200px]:w-[min(980px,calc(100vw-24px))] min-[1200px]:-translate-x-1/2"
            : "w-full",
      ].join(" ")}
    >
      <video
        ref={videoRef}
        className="absolute inset-0 block size-full cursor-pointer object-cover [:fullscreen]:object-contain"
        src={src}
        poster={poster}
        aria-label={alt}
        loop
        playsInline
        preload="metadata"
        onClick={toggle}
      />

      {!playing && progress < 0.01 ? (
        <div
          className="pointer-events-none absolute inset-0 z-[1] bg-[#f2f2f2] mix-blend-multiply"
          aria-hidden
        />
      ) : null}

      {/* Dim scrim so white controls stay legible over light frames */}
      <div
        className={[
          "pointer-events-none absolute inset-0 z-[2] bg-black/25 transition-opacity duration-200",
          chromeVisible ? "opacity-100" : "opacity-0",
        ].join(" ")}
        aria-hidden
      />

      <button
        type="button"
        aria-label={playing ? "Pause video" : "Play video"}
        onMouseDown={(event) => event.preventDefault()}
        onClick={(event) => {
          event.stopPropagation();
          toggle();
        }}
        className={[
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer",
          centerSizeClass,
          chromeClass,
        ].join(" ")}
      >
        <svg
          viewBox={playing ? "0 0 149 201" : "0 0 199 201"}
          className="absolute inset-0 size-full"
          aria-hidden
        >
          <path d={playing ? PAUSE_PATH : PLAY_PATH} fill="white" fillOpacity={0.85} />
        </svg>
      </button>

      <div
        className={[
          "absolute bottom-[calc(clamp(5px,0.7cqw,8px)+clamp(10px,0.9cqw,14px))] right-[clamp(12px,1cqw,18px)] flex items-center gap-[clamp(8px,1.2cqw,12px)]",
          chromeClass,
        ].join(" ")}
      >
        <ControlButton
          label={muted ? "Unmute video" : "Mute video"}
          onClick={toggleMute}
          sizeClass={cornerSizeClass}
        >
          {muted ? (
            <>
              <path
                stroke="none"
                d="M3.15 8.55h3.35l5.55-4.45A.88.88 0 0 1 13.5 4.8v14.4a.88.88 0 0 1-1.45.7l-5.55-4.45H3.15A1.85 1.85 0 0 1 1.3 13.6v-3.2A1.85 1.85 0 0 1 3.15 8.55Z"
              />
              <path fill="none" d="M4.4 19.2 19.6 4.8" />
            </>
          ) : (
            <>
              <path
                stroke="none"
                d="M3.15 8.55h3.35l5.55-4.45A.88.88 0 0 1 13.5 4.8v14.4a.88.88 0 0 1-1.45.7l-5.55-4.45H3.15A1.85 1.85 0 0 1 1.3 13.6v-3.2A1.85 1.85 0 0 1 3.15 8.55Z"
              />
              <path fill="none" d="M16.05 8.55a4.2 4.2 0 0 1 0 6.9" />
              <path fill="none" d="M19.2 5.7a8 8 0 0 1 0 12.6" />
            </>
          )}
        </ControlButton>

        <ControlButton
          label={fullscreen ? "Exit full screen" : "Enter full screen"}
          onClick={toggleFullscreen}
          sizeClass={cornerSizeClass}
        >
          {fullscreen ? (
            <>
              <path
                stroke="none"
                d="M20.4 9.85h-2.55V6.15h-3.7V3.6H20.4zM3.6 14.15h2.55v3.7h3.7v2.55H3.6z"
              />
            </>
          ) : (
            <>
              <path
                stroke="none"
                d="M13.15 3.6H20.4v7.25h-2.55V7.45l-6.2 6.2-1.8-1.8 6.2-6.2h-3.4z"
              />
              <path
                stroke="none"
                d="M3.6 13.15v7.25h7.25v-2.55H7.45l6.2-6.2-1.8-1.8-6.2 6.2v-3.4z"
              />
            </>
          )}
        </ControlButton>
      </div>

      <div
        ref={barRef}
        role="slider"
        aria-label="Video progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress * 100)}
        tabIndex={0}
        className="absolute inset-x-0 bottom-0 z-10 flex h-6 cursor-pointer items-end"
        onPointerDown={(event) => {
          dragging.current = true;
          seekFromClientX(event.clientX);
        }}
      >
        <div className="h-[clamp(5px,0.7cqw,8px)] w-full overflow-hidden bg-[rgba(255,255,255,0.3)]">
          <div
            className="h-full bg-[rgba(255,255,255,0.85)]"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
