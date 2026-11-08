"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { PaperclipLoader } from "@/components/PaperclipLoader";
import styles from "./MediaReveal.module.css";

type Media = HTMLImageElement | HTMLVideoElement;
/**
 * "playable": autoplaying video, wait until it can play through.
 * "poster": click-to-play video, wait for its metadata and poster only.
 */
type VideoReadiness = "playable" | "poster";

/** Reveal anyway after this long, e.g. when low-power mode blocks autoplay. */
const MAX_WAIT_MS = 10000;

function isReady(el: Media, video: VideoReadiness) {
  if (el instanceof HTMLImageElement) return el.complete && el.naturalWidth > 0;
  return el.readyState >= (video === "poster" ? HTMLMediaElement.HAVE_METADATA : HTMLMediaElement.HAVE_ENOUGH_DATA);
}

/** Resolves once an image has fully decoded; failures resolve too. */
function decoded(img: HTMLImageElement) {
  // Background tabs can defer decoding indefinitely, so the bytes being in is enough after a beat.
  return Promise.race([img.decode().catch(() => {}), new Promise((r) => setTimeout(r, 1000))]);
}

function posterReady(src: string) {
  const img = new Image();
  img.src = src;
  return decoded(img);
}

/** Resolves once the element is fully loaded (or failed), never on a partial paint. */
function whenReady(el: Media, video: VideoReadiness) {
  return new Promise<void>((resolve) => {
    const done = () => {
      cleanup();
      // Wait for the full decode so the image never paints in strips.
      if (el instanceof HTMLImageElement) void decoded(el).then(() => resolve());
      else if (video === "poster" && el.poster) void posterReady(el.poster).then(() => resolve());
      else resolve();
    };
    const onProgress = () => {
      if (isReady(el, video)) done();
    };
    const events =
      el instanceof HTMLImageElement
        ? ["load"]
        : video === "poster"
          ? ["loadedmetadata"]
          : ["canplaythrough", "playing"];
    const cleanup = () => {
      for (const name of events) el.removeEventListener(name, onProgress);
      el.removeEventListener("error", done);
    };

    if (isReady(el, video)) return done();
    for (const name of events) el.addEventListener(name, onProgress);
    el.addEventListener("error", done);
  });
}

/** Hides the wrapped images/videos behind a paperclip loader until all of them have fully loaded. */
export function MediaReveal({
  children,
  className,
  fill = false,
  video = "playable",
}: {
  children: ReactNode;
  className?: string;
  /** Fill the positioned parent instead of sizing to the media. */
  fill?: boolean;
  video?: VideoReadiness;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const host = ref.current;
    if (!host) return;
    const media = [...host.querySelectorAll<Media>("img, video")];
    let cancelled = false;
    let cap: ReturnType<typeof setTimeout> | undefined;
    const reveal = () => {
      if (!cancelled) setLoaded(true);
    };
    void Promise.all(media.map((el) => whenReady(el, video))).then(reveal);

    // Lazy media only starts loading near the viewport, so the cap starts there too.
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      cap = setTimeout(reveal, MAX_WAIT_MS);
    });
    observer.observe(host);

    return () => {
      cancelled = true;
      observer.disconnect();
      clearTimeout(cap);
    };
  }, [video]);

  return (
    <div
      ref={ref}
      className={[styles.reveal, className].filter(Boolean).join(" ")}
      data-loaded={loaded}
      data-fill={fill || undefined}
    >
      <div className={styles.media}>{children}</div>
      <div className={styles.loaderSlot} aria-hidden={loaded}>
        <PaperclipLoader />
      </div>
    </div>
  );
}
