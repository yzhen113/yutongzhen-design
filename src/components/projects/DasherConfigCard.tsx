"use client";

import { useEffect, useRef, useState } from "react";
import { KudosLottie, type KudosLottieId } from "@/components/projects/KudosLottie";

const HOLD_MS = 4000;
const INK = "#191919";
const SUBDUED = "#606060";
const LINE = "#e4e4e4";
const RED = "#eb1700";

type Card =
  | {
      id: string;
      kind: "metric";
      lottie?: KudosLottieId;
      spot?: string;
      label: string;
      value: string;
      benchmark: string;
    }
  | {
      id: string;
      kind: "recap";
      lottie: KudosLottieId;
    }
  | {
      id: string;
      kind: "firstDash";
      lottie: KudosLottieId;
    };

const CARDS: Card[] = [
  {
    id: "on-time",
    kind: "metric",
    lottie: "onTime",
    label: "You delivered on-time",
    value: "96%",
    benchmark: "Higher than 75% of new Dashers nearby",
  },
  {
    id: "acceptance",
    kind: "metric",
    lottie: "acceptance",
    label: "Accepted orders sent your way",
    value: "93%",
    benchmark: "Higher than 68% of new Dashers nearby",
  },
  {
    id: "completion",
    kind: "metric",
    lottie: "completion",
    label: "Completed the orders you took",
    value: "99%",
    benchmark: "Higher than 82% of new Dashers nearby",
  },
  {
    id: "issue-free",
    kind: "metric",
    spot: "/media/dasher/spot/issue-free.svg",
    label: "Issue-free orders",
    value: "98%",
    benchmark: "Higher than 71% of new Dashers nearby",
  },
  { id: "recap", kind: "recap", lottie: "medal" },
  { id: "first-dash", kind: "firstDash", lottie: "cupcake" },
];

export function DasherConfigCard() {
  const ref = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(false);
  const [step, setStep] = useState(0);
  const card = CARDS[step];

  useEffect(() => {
    const el = ref.current;
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
    if (!live) return;
    const timer = window.setInterval(
      () => setStep((current) => (current + 1) % CARDS.length),
      HOLD_MS,
    );
    return () => window.clearInterval(timer);
  }, [live]);

  return (
    <div ref={ref} className="flex w-full justify-center">
      <div
        className="w-full max-w-[361px] rounded-[32px] border border-solid bg-white p-4 shadow-[0_8px_24px_rgba(25,25,25,0.12)]"
        style={{ borderColor: LINE }}
      >
        <div
          key={card.id}
          className="flex flex-col items-center px-4 pt-4 pb-2"
          style={{ animation: "dasher-card-fade 260ms linear" }}
        >
          {card.kind === "metric" ? (
            <>
              {card.lottie ? (
                <KudosLottie id={card.lottie} size={180} playing={live} />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={card.spot} alt="" width={180} height={180} />
              )}
              <p
                className="mt-1 text-center text-[18px] font-bold leading-[22px]"
                style={{ color: SUBDUED }}
              >
                {card.label}
              </p>
              <p
                className="mt-2 text-[72px] font-bold leading-[76px] tracking-[-0.01em]"
                style={{ color: INK }}
              >
                {card.value}
              </p>
              <p className="mt-3 inline-flex items-center gap-1 rounded-full bg-[#e8f4ec] px-3 py-1.5 text-[12px] font-bold text-[#12683a]">
                <span aria-hidden>↗</span>
                {card.benchmark}
              </p>
            </>
          ) : null}

          {card.kind === "recap" ? (
            <>
              <KudosLottie id={card.lottie} size={140} playing={live} />
              <p className="text-[15px] font-medium leading-[20px]" style={{ color: SUBDUED }}>
                July 6 – 13
              </p>
              <p className="mt-1 text-[28px] font-bold leading-[34px] text-black">
                What a week!
              </p>
              <div className="mt-4 flex w-full">
                <div className="flex flex-1 items-center gap-2.5 px-4 py-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/media/dasher/icons/deliveries.png"
                    alt=""
                    width={24}
                    height={24}
                  />
                  <div>
                    <p className="text-[15px] font-bold leading-[20px]" style={{ color: INK }}>
                      15
                    </p>
                    <p className="text-[13px] font-medium leading-[18px]" style={{ color: SUBDUED }}>
                      Deliveries
                    </p>
                  </div>
                </div>
                <div
                  className="flex flex-1 items-center gap-2.5 px-4 py-3"
                  style={{ borderLeft: `1px solid ${LINE}` }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/media/dasher/icons/earnings.png"
                    alt=""
                    width={24}
                    height={24}
                  />
                  <div>
                    <p className="text-[15px] font-bold leading-[20px]" style={{ color: INK }}>
                      $100.54
                    </p>
                    <p className="text-[13px] font-medium leading-[18px]" style={{ color: SUBDUED }}>
                      Earnings
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : null}

          {card.kind === "firstDash" ? (
            <>
              <KudosLottie id={card.lottie} size={180} playing={live} />
              <p className="text-center text-[18px] font-bold leading-[22px]" style={{ color: INK }}>
                Cody, you did it!
              </p>
              <p className="mt-1 text-center text-[32px] font-bold leading-[44px]" style={{ color: INK }}>
                Your <span style={{ color: RED }}>first dash</span>
              </p>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
