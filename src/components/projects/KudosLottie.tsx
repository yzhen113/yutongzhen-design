"use client";

import { useEffect, useRef } from "react";
import type { AnimationItem } from "lottie-web";

export const KUDOS_LOTTIE = {
  cupcake: "first-dash-cupcake.json",
  onTime: "delicia-on-time.json",
  acceptance: "delicia-acceptance.json",
  completion: "delicia-completion.json",
  medal: "day-7-medal.json",
} as const;

export type KudosLottieId = keyof typeof KUDOS_LOTTIE;

const cache = new Map<string, Promise<unknown>>();

function load(file: string) {
  let pending = cache.get(file);
  if (!pending) {
    pending = fetch(`/media/dasher/lottie/${file}`).then((r) => r.json());
    cache.set(file, pending);
  }
  return pending;
}

function park(anim: AnimationItem) {
  anim.goToAndStop(Math.max(anim.totalFrames - 1, 0), true);
}

export function KudosLottie({
  id,
  size = 120,
  playing = false,
}: {
  id: KudosLottieId;
  size?: number;
  playing?: boolean;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<AnimationItem | null>(null);
  const playingRef = useRef(playing);
  playingRef.current = playing;
  const file = KUDOS_LOTTIE[id];

  useEffect(() => {
    let cancelled = false;
    let anim: AnimationItem | undefined;

    void Promise.all([import("lottie-web"), load(file)]).then(
      ([{ default: lottie }, animationData]) => {
        if (cancelled || !hostRef.current) return;
        anim = lottie.loadAnimation({
          container: hostRef.current,
          renderer: "svg",
          loop: false,
          autoplay: false,
          animationData,
        });
        animRef.current = anim;
        if (playingRef.current) anim.goToAndPlay(0, true);
        else park(anim);
      },
    );

    return () => {
      cancelled = true;
      animRef.current = null;
      anim?.destroy();
    };
  }, [file]);

  useEffect(() => {
    const anim = animRef.current;
    if (!anim) return;
    if (playing) {
      anim.goToAndPlay(0, true);
      return;
    }
    park(anim);
  }, [playing]);

  return (
    <div
      ref={hostRef}
      aria-hidden
      style={{ width: size, height: size }}
    />
  );
}
