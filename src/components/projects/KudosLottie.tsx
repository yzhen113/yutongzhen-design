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
  loop = false,
  loopDelay = 0,
  replayToken = 0,
  onCycle,
}: {
  id: KudosLottieId;
  size?: number;
  playing?: boolean;
  loop?: boolean;
  /** Pause, in ms, after each play before the next one. Native looping is used when this is 0. */
  loopDelay?: number;
  /** Bump to replay from the first frame while `playing` stays true. */
  replayToken?: number;
  /** Fires each time playback starts, including repeats. */
  onCycle?: () => void;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<AnimationItem | null>(null);
  const playingRef = useRef(playing);
  const loopRef = useRef(loop);
  const loopDelayRef = useRef(loopDelay);
  const onCycleRef = useRef(onCycle);
  const repeatTimer = useRef<number | null>(null);
  playingRef.current = playing;
  loopRef.current = loop;
  loopDelayRef.current = loopDelay;
  onCycleRef.current = onCycle;
  const cycleStamp = useRef(0);
  const replaySeen = useRef(replayToken);
  const file = KUDOS_LOTTIE[id];

  const emitCycle = () => {
    const now = performance.now();
    if (now - cycleStamp.current < 50) return;
    cycleStamp.current = now;
    onCycleRef.current?.();
  };

  useEffect(() => {
    let cancelled = false;
    let anim: AnimationItem | undefined;

    const clearRepeat = () => {
      if (repeatTimer.current == null) return;
      window.clearTimeout(repeatTimer.current);
      repeatTimer.current = null;
    };

    const scheduleRepeat = () => {
      clearRepeat();
      const delay = loopDelayRef.current;
      if (!anim || !playingRef.current || !loopRef.current || delay <= 0) return;
      repeatTimer.current = window.setTimeout(() => {
        repeatTimer.current = null;
        if (!playingRef.current || !loopRef.current) return;
        anim?.goToAndPlay(0, true);
        emitCycle();
      }, delay);
    };

    void Promise.all([import("lottie-web"), load(file)]).then(
      ([{ default: lottie }, animationData]) => {
        if (cancelled || !hostRef.current) return;
        anim = lottie.loadAnimation({
          container: hostRef.current,
          renderer: "svg",
          loop: loopRef.current && loopDelayRef.current <= 0,
          autoplay: false,
          animationData,
        });
        animRef.current = anim;
        anim.addEventListener("complete", scheduleRepeat);
        if (playingRef.current) {
          anim.goToAndPlay(0, true);
          emitCycle();
        } else park(anim);
      },
    );

    return () => {
      cancelled = true;
      clearRepeat();
      animRef.current = null;
      anim?.destroy();
    };
  }, [file]);

  useEffect(() => {
    const anim = animRef.current;
    if (!anim) return;
    if (repeatTimer.current != null) {
      window.clearTimeout(repeatTimer.current);
      repeatTimer.current = null;
    }
    anim.loop = loop && loopDelay <= 0;
    if (playing) {
      anim.goToAndPlay(0, true);
      emitCycle();
      return;
    }
    anim.loop = false;
    park(anim);
  }, [playing, loop, loopDelay]);

  useEffect(() => {
    if (replayToken === replaySeen.current) return;
    replaySeen.current = replayToken;
    const anim = animRef.current;
    if (!anim || !playingRef.current) return;
    if (repeatTimer.current != null) {
      window.clearTimeout(repeatTimer.current);
      repeatTimer.current = null;
    }
    anim.loop = false;
    anim.goToAndPlay(0, true);
    emitCycle();
  }, [replayToken]);

  return (
    <div
      ref={hostRef}
      aria-hidden
      style={{ width: size, height: size }}
    />
  );
}
