"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { SmoothCorners } from "@/components/SmoothCorners";
import styles from "./CupcakeTuner.module.css";

type Motion = {
  bounceDuration: number;
  bounceDelay: number;
  bounceAmp: number;
  candleDuration: number;
  candleDelay: number;
  candleDropPx: number;
  candleSettleAmp: number;
  basePopDuration: number;
  baseSquashDuration: number;
  baseSquashDelay: number;
  baseSquashAmp: number;
};

const DEFAULT_MOTION: Motion = {
  bounceDuration: 0.78,
  bounceDelay: 0.22,
  bounceAmp: 1,
  candleDuration: 0.4,
  candleDelay: 0.04,
  candleDropPx: 104,
  candleSettleAmp: 1,
  basePopDuration: 0.38,
  baseSquashDuration: 0.42,
  baseSquashDelay: 0.2,
  baseSquashAmp: 1,
};

const SPEEDS = [1, 0.5];
const REPLAY_DELAY_MS = 400;

function speedChipStyle(active: boolean): CSSProperties {
  return {
    padding: "7px 14px",
    borderRadius: 999,
    border: `1px solid ${active ? "#6a6a6a" : "#e7e5e1"}`,
    background: active ? "rgba(26, 26, 26, 0.08)" : "transparent",
    color: active ? "#6a6a6a" : "#55504a",
    fontSize: 13,
    fontWeight: 500,
    lineHeight: "normal",
    cursor: "pointer",
  };
}

const BEZIER = {
  bounce: "cubic-bezier(0.22, 0.7, 0.28, 1)",
  candle: "cubic-bezier(0.4, 0, 0.3, 1)",
  pop: "cubic-bezier(0.25, 1.08, 0.4, 1)",
  squash: "cubic-bezier(0.25, 0.7, 0.3, 1)",
};

function cssVars(m: Motion, speed: number): CSSProperties {
  const t = (seconds: number) => `${(seconds / speed).toFixed(3)}s`;
  const { bounceAmp: a, baseSquashAmp: sa, candleSettleAmp: ca } = m;
  return {
    "--bounce-duration": t(m.bounceDuration),
    "--bounce-delay": t(m.bounceDelay),
    "--bounce-ease": BEZIER.bounce,
    "--bounce-y1": `${1 * a}px`,
    "--bounce-y2": `${-2.4 * a}px`,
    "--bounce-y3": `${0.7 * a}px`,
    "--bounce-y4": `${-0.4 * a}px`,
    "--bounce-sy1": 1 - 0.01 * a,
    "--bounce-sy2": 1 + 0.01 * a,
    "--bounce-sy3": 1 - 0.003 * a,
    "--bounce-sy4": 1 + 0.002 * a,
    "--candle-duration": t(m.candleDuration),
    "--candle-delay": t(m.candleDelay),
    "--candle-ease": BEZIER.candle,
    "--candle-drop": `${-m.candleDropPx}px`,
    "--candle-settle1": `${1.2 * ca}px`,
    "--candle-settle2": `${-1 * ca}px`,
    "--base-pop-duration": t(m.basePopDuration),
    "--base-pop-ease": BEZIER.pop,
    "--base-squash-duration": t(m.baseSquashDuration),
    "--base-squash-delay": t(m.baseSquashDelay),
    "--base-squash-ease": BEZIER.squash,
    "--squash-x1": 1 + 0.02 * sa,
    "--squash-y1": 1 - 0.02 * sa,
    "--squash-x2": 1 - 0.005 * sa,
    "--squash-y2": 1 + 0.01 * sa,
  } as CSSProperties;
}

const SLIDERS: {
  key: keyof Motion;
  label: string;
  min: number;
  max: number;
  step: number;
  unit?: string;
}[] = [
  { key: "bounceAmp", label: "Bounce amplitude", min: 0, max: 6, step: 0.1 },
  { key: "bounceDuration", label: "Bounce duration", min: 0.2, max: 3, step: 0.02, unit: "s" },
  { key: "candleDropPx", label: "Candle drop", min: 40, max: 160, step: 2, unit: "px" },
  { key: "baseSquashAmp", label: "Squash on landing", min: 0, max: 6, step: 0.1 },
];

export function CupcakeTuner() {
  const [values, setValues] = useState<Motion>(DEFAULT_MOTION);
  const [speed, setSpeed] = useState(1);
  const [run, setRun] = useState(0);
  const hostRef = useRef<HTMLDivElement>(null);
  const replayTimer = useRef<number | null>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const el = hostRef.current;
    if (!el || live) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setLive(true);
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [live]);

  useEffect(() => {
    if (live) setRun((n) => n + 1);
  }, [live]);

  useEffect(() => {
    return () => {
      if (replayTimer.current != null) window.clearTimeout(replayTimer.current);
    };
  }, []);

  const replayAfterAdjust = () => {
    if (replayTimer.current != null) window.clearTimeout(replayTimer.current);
    replayTimer.current = window.setTimeout(() => {
      replayTimer.current = null;
      setRun((n) => n + 1);
    }, REPLAY_DELAY_MS);
  };

  const set = (patch: Partial<Motion>) => {
    setValues((prev) => ({ ...prev, ...patch }));
    replayAfterAdjust();
  };

  const reset = () => {
    setValues(DEFAULT_MOTION);
    setSpeed(1);
    setRun((n) => n + 1);
  };

  return (
    <div ref={hostRef} className="flex flex-col">
      <div className="flex items-start gap-4">
        <SmoothCorners className="relative aspect-square w-[50%] shrink-0 overflow-hidden rounded-[8px] border border-solid border-[#f2f2f2] bg-[#fcfcfc]">
          <div className="absolute inset-[12%]" aria-hidden={live ? undefined : true}>
            {live ? (
              <div className={styles.illo} style={cssVars(values, speed)} key={run}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className={styles.base} src="/media/dasher/cupcake/base.png" alt="" draggable={false} />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className={styles.candle} src="/media/dasher/cupcake/candle.png" alt="" draggable={false} />
              </div>
            ) : null}
          </div>
        </SmoothCorners>

        <div className="flex min-w-0 flex-1 flex-col self-stretch">
          <div className="min-h-0 flex-1" />
          <div className="flex flex-col gap-3.5">
            {SLIDERS.map((slider) => {
              const value = values[slider.key];
              const shown = slider.step < 1 ? value.toFixed(2) : String(value);
              const fill = ((value - slider.min) / (slider.max - slider.min)) * 100;
              return (
                <label key={slider.key} className="flex flex-col gap-1.5">
                  <span className="flex items-baseline justify-between text-[14px] leading-[18.2px] tracking-[0.14px] text-[#7e7e7e]">
                    {slider.label}
                    <span className="tabular-nums text-[#7e7e7e]">
                      {shown}
                      {slider.unit ?? ""}
                    </span>
                  </span>
                  <input
                    type="range"
                    min={slider.min}
                    max={slider.max}
                    step={slider.step}
                    value={value}
                    aria-valuetext={`${shown}${slider.unit ?? ""}`}
                    onChange={(e) => set({ [slider.key]: Number(e.target.value) })}
                    className={styles.slider}
                    style={{ "--fill": `${fill}%` } as CSSProperties}
                  />
                </label>
              );
            })}
          <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Playback speed">
            {SPEEDS.map((s) => (
              <button
                key={s}
                type="button"
                aria-pressed={speed === s}
                onClick={() => {
                  setSpeed(s);
                  setRun((n) => n + 1);
                }}
                style={speedChipStyle(speed === s)}
              >
                {s}×
              </button>
            ))}
            <button type="button" onClick={reset} style={speedChipStyle(false)}>
              Reset
            </button>
          </div>
          </div>
          <div className="min-h-0 flex-1" />
        </div>
      </div>

      <p className="mt-5 text-[14px] font-normal leading-[18.2px] tracking-[0.14px] text-[#7e7e7e]">
        These values regenerate one file — eng can drop it into the card slot on iOS, Android and web quickly without extra effort.
      </p>
    </div>
  );
}
