"use client";

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { KudosLottie } from "@/components/projects/KudosLottie";
import styles from "./DasherHero.module.css";

function HeroCard({ children, height, lifted = false, lowered = false, fit = false, className = "" }: {
  children: React.ReactNode;
  height: number;
  lifted?: boolean;
  lowered?: boolean;
  /** Shrink the frame to the card’s content so a hidden tag does not leave a gap. */
  fit?: boolean;
  className?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [measured, setMeasured] = useState(height);

  useLayoutEffect(() => {
    if (!fit) return;
    const el = cardRef.current;
    if (!el) return;
    const measure = () => setMeasured(el.offsetHeight);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [fit]);

  const cardHeight = fit ? measured : height;
  const grow = fit ? Math.max(height - measured, 0) : 0;

  return (
    <div
      className={`${styles.cardFrame} ${lifted ? styles.lifted : ""} ${lowered ? styles.lowered : ""}`}
      style={{ "--card-height": `${cardHeight}px`, "--card-grow": `${grow}px` } as CSSProperties}
    >
      <div ref={cardRef} className={`${styles.card} ${className}`}>{children}</div>
    </div>
  );
}

const WEEK_RATINGS = [
  { label: "Completion rate", value: "100%", rank: "top 1%" },
  { label: "Acceptance rate", value: "94%", rank: "top 15%" },
  { label: "On-time rate", value: "96%", rank: "top 15%" },
];

const WEEK_TOTALS = [
  { icon: "deliveries", value: "15", label: "Deliveries" },
  { icon: "earnings", value: "$100.54", label: "Earnings" },
];

/** Matches the week-one prototype: number rolls after the illustration, then the tag. */
const TICKER_DELAY = 200;
const TICKER_DURATION = 1500;
const DIGIT_STAGGER = 180;
const TAG_PAUSE = 250;
const ROW_START = 780;
const ROW_STAGGER = 110;
const TAG_REVEAL_MS = 720;
/** Longest motion in one pass: the on-time tag finishes after the number rolls. */
const SEQUENCE_MS = TICKER_DELAY + DIGIT_STAGGER + TICKER_DURATION + TAG_PAUSE + TAG_REVEAL_MS;
const REPEAT_HOLD_MS = 3000;

function PercentTicker({ value, play }: { value: number; play: boolean }) {
  const digits = String(value).split("").map(Number);
  return (
    <span
      aria-hidden
      className={`${styles.ticker} ${play ? styles.tickerPlay : ""}`}
      style={{ "--ticker-duration": `${TICKER_DURATION}ms` } as CSSProperties}
    >
      {digits.map((digit, index) => (
        <span key={index} className={styles.digitCell} style={{ overflow: "hidden" }}>
          <span
            className={styles.digitStrip}
            style={{ "--target": digit, "--digit-delay": `${index * DIGIT_STAGGER}ms`, display: "flex", flexDirection: "column" } as CSSProperties}
          >
            {Array.from({ length: 10 }, (_, n) => (
              <span key={n} className={styles.digitSlot}>{n}</span>
            ))}
          </span>
        </span>
      ))}
      <span className={styles.percent}>%</span>
    </span>
  );
}

function OnTimeStat({ animate }: { animate: boolean }) {
  const [rolling, setRolling] = useState(false);
  const [tagOn, setTagOn] = useState(false);

  useEffect(() => {
    if (!animate) return;
    const rollTimer = window.setTimeout(() => setRolling(true), TICKER_DELAY);
    const tagTimer = window.setTimeout(
      () => setTagOn(true),
      TICKER_DELAY + DIGIT_STAGGER + TICKER_DURATION + TAG_PAUSE,
    );
    return () => {
      window.clearTimeout(rollTimer);
      window.clearTimeout(tagTimer);
    };
  }, [animate]);

  return (
    <>
      <p className={styles.metricValue} aria-label="96%">
        {animate ? <PercentTicker value={96} play={rolling} /> : "96%"}
      </p>
      <div className={`${styles.benchmark} ${animate ? (tagOn ? styles.tagIn : styles.tagHold) : ""}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/media/dasher/icons/trend.png" alt="" width={16} height={16} />
        <span>Higher than 75% of new Dashers nearby</span>
      </div>
    </>
  );
}

function WeekDetails({ animate }: { animate: boolean }) {
  return (
    <>
      <div
        className={`${styles.totals} ${animate ? styles.roll : ""}`}
        style={animate ? { animationDelay: `${ROW_START}ms` } : undefined}
      >
        {WEEK_TOTALS.map((total) => (
          <div key={total.label} className={styles.total}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/media/dasher/icons/${total.icon}.png`} alt="" width={24} height={24} />
            <div><p className={styles.totalValue}>{total.value}</p><p className={styles.totalLabel}>{total.label}</p></div>
          </div>
        ))}
      </div>
      <div className={styles.ratings}>
        {WEEK_RATINGS.map((rating, index) => (
          <div
            key={rating.label}
            className={`${styles.rating} ${animate ? styles.roll : ""}`}
            style={animate ? { animationDelay: `${ROW_START + (index + 1) * ROW_STAGGER}ms` } : undefined}
          >
            <span>{rating.label}</span>
            <span className={styles.ratingValue}><strong>{rating.value}</strong> ({rating.rank})</span>
          </div>
        ))}
      </div>
    </>
  );
}

function MetricCardsHero({ thumbnail = false }: { thumbnail?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [metricCycle, setMetricCycle] = useState(0);
  const [weekCycle, setWeekCycle] = useState(0);
  const [replayToken, setReplayToken] = useState(0);
  const metricAnimate = playing && metricCycle > 0;
  const weekAnimate = playing && weekCycle > 0;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setPlaying(entry.isIntersecting),
      { threshold: 0.35 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!thumbnail || !playing) return;
    const id = window.setInterval(() => setReplayToken((token) => token + 1), SEQUENCE_MS + REPEAT_HOLD_MS);
    return () => window.clearInterval(id);
  }, [thumbnail, playing]);

  const hero = (
    <div ref={ref} className={`${styles.hero} ${thumbnail ? styles.thumbnail : ""}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <div
        className={styles.brand}
        style={{ position: "absolute", left: "50%", bottom: "6.5%", width: "clamp(84px, 14.5%, 160px)", transform: "translateX(-50%)", zIndex: 2 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/media/dasher/doordash-logo.png" alt="" style={{ display: "block", width: "100%", height: "auto" }} />
      </div>
      <div className={styles.cards}>
        <HeroCard height={340} className={styles.firstDash}>
          <KudosLottie id="cupcake" size={200} playing={playing} replayToken={replayToken} />
          <p className={styles.firstEyebrow}>Cody, you did it!</p>
          <p className={styles.firstTitle}>Your <span>first dash</span></p>
        </HeroCard>

        <HeroCard height={424} lifted fit className={styles.metric}>
          <KudosLottie id="onTime" size={200} playing={playing} replayToken={replayToken} onCycle={() => setMetricCycle((cycle) => cycle + 1)} />
          <p className={styles.metricLabel}>You delivered on-time</p>
          <OnTimeStat key={metricAnimate ? metricCycle : "rest"} animate={metricAnimate} />
        </HeroCard>

        <HeroCard height={510} lowered className={styles.week}>
          <KudosLottie id="medal" size={160} playing={playing} replayToken={replayToken} onCycle={() => setWeekCycle((cycle) => cycle + 1)} />
          <p className={styles.dates}>July 6 – 13</p>
          <p className={styles.weekTitle}>What a week!</p>
          <WeekDetails key={weekAnimate ? weekCycle : "rest"} animate={weekAnimate} />
        </HeroCard>
      </div>
    </div>
  );

  if (thumbnail) return <div className={styles.thumbnailFrame}>{hero}</div>;
  return hero;
}

export function DasherHero({ thumbnail = false }: { thumbnail?: boolean }) {
  return <MetricCardsHero thumbnail={thumbnail} />;
}
