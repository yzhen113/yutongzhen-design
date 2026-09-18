"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { KudosLottie } from "@/components/projects/KudosLottie";
import styles from "./DasherHero.module.css";

// Native iPhone 17 Pro cards: a 402pt screen with 16pt side margins.
// Scale the complete 370pt layouts so type, illustrations, and spacing stay in proportion.
function HeroCard({ children, height, lifted = false, lowered = false, className = "" }: {
  children: React.ReactNode;
  height: number;
  lifted?: boolean;
  lowered?: boolean;
  className?: string;
}) {
  return (
    <div className={`${styles.cardFrame} ${lifted ? styles.lifted : ""} ${lowered ? styles.lowered : ""}`} style={{ "--card-height": `${height}px` } as CSSProperties}>
      <div className={`${styles.card} ${className}`}>{children}</div>
    </div>
  );
}

const WEEK_RATINGS = [
  { label: "Completion rate", value: "100%", rank: "top 1%" },
  { label: "Acceptance rate", value: "94%", rank: "top 15%" },
  { label: "On-time rate", value: "96%", rank: "top 15%" },
];

export function DasherHero() {
  const ref = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setPlaying(true); },
      { threshold: 0.25 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={styles.hero}>
      <div className={styles.cards}>
        <HeroCard height={340} className={styles.firstDash}>
          <KudosLottie id="cupcake" size={200} playing={playing} />
          <p className={styles.firstEyebrow}>Cody, you did it!</p>
          <p className={styles.firstTitle}>Your <span>first dash</span></p>
        </HeroCard>

        <HeroCard height={424} lifted className={styles.metric}>
          <KudosLottie id="onTime" size={200} playing={playing} />
          <p className={styles.metricLabel}>You delivered on-time</p>
          <p className={styles.metricValue}>96%</p>
          <div className={styles.benchmark}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/media/dasher/icons/trend.png" alt="" width={16} height={16} />
            <span>Higher than 75% of new Dashers nearby</span>
          </div>
        </HeroCard>

        <HeroCard height={510} lowered className={styles.week}>
          <KudosLottie id="medal" size={160} playing={playing} />
          <p className={styles.dates}>July 6 – 13</p>
          <p className={styles.weekTitle}>What a week!</p>
          <div className={styles.totals}>
            {[
              { icon: "deliveries", value: "15", label: "Deliveries" },
              { icon: "earnings", value: "$100.54", label: "Earnings" },
            ].map((total) => (
              <div key={total.label} className={styles.total}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/media/dasher/icons/${total.icon}.png`} alt="" width={24} height={24} />
                <div><p className={styles.totalValue}>{total.value}</p><p className={styles.totalLabel}>{total.label}</p></div>
              </div>
            ))}
          </div>
          <div className={styles.ratings}>
            {WEEK_RATINGS.map((rating) => (
              <div key={rating.label} className={styles.rating}>
                <span>{rating.label}</span>
                <span className={styles.ratingValue}><strong>{rating.value}</strong> ({rating.rank})</span>
              </div>
            ))}
          </div>
        </HeroCard>
      </div>
    </div>
  );
}
