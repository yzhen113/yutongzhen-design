"use client";

import { useEffect, useRef, useState } from "react";
import { KudosLottie } from "@/components/projects/KudosLottie";

function HeroPhone({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={[
        "w-[110px] shrink-0 overflow-hidden rounded-[22px] bg-white shadow-[0_12px_28px_rgba(0,0,0,0.10)] min-[600px]:w-[180px] min-[600px]:rounded-[32px] min-[1200px]:w-[210px]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="flex h-[18px] items-center justify-center bg-white min-[600px]:h-[24px]">
        <span className="h-[8px] w-[48px] rounded-full bg-black/10 min-[600px]:h-[10px] min-[600px]:w-[64px]" />
      </div>
      <div className="px-2 pb-3 min-[600px]:px-3 min-[600px]:pb-4">{children}</div>
    </div>
  );
}

export function DasherHero() {
  const ref = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setPlaying(true);
      },
      { threshold: 0.25 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="relative flex min-h-[380px] items-center justify-center overflow-hidden bg-[#f2f2f2] px-3 py-10 min-[600px]:min-h-[520px] min-[1200px]:h-[620px] min-[1200px]:py-0"
    >
      <div className="flex items-end justify-center gap-2 min-[600px]:gap-5">
        <HeroPhone>
          <div className="flex flex-col items-center pt-2">
            <KudosLottie id="cupcake" size={88} playing={playing} />
            <p className="mt-1 text-center text-[8px] font-semibold leading-[10px] text-[#191919] min-[600px]:text-[12px] min-[600px]:leading-[15px]">
              Cody, you did it!
            </p>
            <p className="mt-0.5 text-center text-[11px] font-bold leading-[14px] tracking-[-0.02em] text-[#191919] min-[600px]:text-[18px] min-[600px]:leading-[22px]">
              Your <span className="text-[#eb1700]">first dash</span>
            </p>
          </div>
        </HeroPhone>

        <HeroPhone className="mb-4 min-[600px]:mb-8">
          <div className="flex flex-col items-center pt-2">
            <KudosLottie id="onTime" size={88} playing={playing} />
            <p className="mt-1 text-center text-[8px] font-semibold leading-[10px] text-[#606060] min-[600px]:text-[12px] min-[600px]:leading-[15px]">
              You delivered on-time
            </p>
            <p className="mt-0.5 text-[22px] font-bold leading-[24px] tracking-[-0.03em] text-[#191919] min-[600px]:text-[40px] min-[600px]:leading-[44px]">
              96%
            </p>
            <p className="mt-1 rounded-full bg-[#e8f4ec] px-1.5 py-0.5 text-center text-[6px] font-semibold leading-[8px] text-[#12683a] min-[600px]:px-2.5 min-[600px]:text-[10px] min-[600px]:leading-[13px]">
              Higher than 75% of new Dashers nearby
            </p>
          </div>
        </HeroPhone>

        <HeroPhone>
          <div className="flex flex-col items-center pt-2">
            <KudosLottie id="medal" size={72} playing={playing} />
            <p className="text-center text-[7px] font-medium leading-[9px] text-[#606060] min-[600px]:text-[11px] min-[600px]:leading-[14px]">
              July 6 – 13
            </p>
            <p className="text-center text-[12px] font-bold leading-[15px] text-black min-[600px]:text-[20px] min-[600px]:leading-[24px]">
              What a week!
            </p>
            <div className="mt-2 flex w-full justify-between border-t border-[#e4e4e4] pt-1.5">
              <div>
                <p className="text-[8px] font-bold leading-[10px] text-[#191919] min-[600px]:text-[12px] min-[600px]:leading-[15px]">
                  15
                </p>
                <p className="text-[6px] leading-[8px] text-[#606060] min-[600px]:text-[10px] min-[600px]:leading-[13px]">
                  Deliveries
                </p>
              </div>
              <div>
                <p className="text-[8px] font-bold leading-[10px] text-[#191919] min-[600px]:text-[12px] min-[600px]:leading-[15px]">
                  $100.54
                </p>
                <p className="text-[6px] leading-[8px] text-[#606060] min-[600px]:text-[10px] min-[600px]:leading-[13px]">
                  Earnings
                </p>
              </div>
            </div>
          </div>
        </HeroPhone>
      </div>
    </div>
  );
}
