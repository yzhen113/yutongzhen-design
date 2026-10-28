"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { PaperclipLoader } from "@/components/PaperclipLoader";
import styles from "./MediaReveal.module.css";

type Media = HTMLImageElement | HTMLVideoElement;

function isReady(el: Media) {
  if (el instanceof HTMLImageElement) return el.complete && el.naturalWidth > 0;
  return el.readyState >= HTMLMediaElement.HAVE_ENOUGH_DATA;
}

/** Resolves once the element is fully loaded (or failed), never on a partial paint. */
function whenReady(el: Media) {
  return new Promise<void>((resolve) => {
    const done = () => {
      cleanup();
      // Wait for the full decode so the image never paints in strips. Background
      // tabs can defer decoding indefinitely, so the bytes being in is enough after a beat.
      if (el instanceof HTMLImageElement) {
        void Promise.race([
          el.decode().catch(() => {}),
          new Promise((r) => setTimeout(r, 1000)),
        ]).then(() => resolve());
      } else resolve();
    };
    const onProgress = () => {
      if (isReady(el)) done();
    };
    const events = el instanceof HTMLImageElement ? ["load"] : ["canplaythrough", "playing"];
    const cleanup = () => {
      for (const name of events) el.removeEventListener(name, onProgress);
      el.removeEventListener("error", done);
    };

    if (isReady(el)) return done();
    for (const name of events) el.addEventListener(name, onProgress);
    el.addEventListener("error", done);
  });
}

/** Hides the wrapped images/videos behind a paperclip loader until all of them have fully loaded. */
export function MediaReveal({
  children,
  className,
  fill = false,
}: {
  children: ReactNode;
  className?: string;
  /** Fill the positioned parent instead of sizing to the media. */
  fill?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const media = [...(ref.current?.querySelectorAll<Media>("img, video") ?? [])];
    let cancelled = false;
    void Promise.all(media.map(whenReady)).then(() => {
      if (!cancelled) setLoaded(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

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
