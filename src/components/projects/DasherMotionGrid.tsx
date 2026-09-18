"use client";

import { useEffect, useRef, useState } from "react";
import {
  KudosLottie,
  type KudosLottieId,
} from "@/components/projects/KudosLottie";

const ITEMS: { id: KudosLottieId; label: string }[] = [
  { id: "cupcake", label: "First dash" },
  { id: "onTime", label: "On-time" },
  { id: "acceptance", label: "Acceptance" },
  { id: "completion", label: "Completion" },
  { id: "medal", label: "Week recap" },
];

export function DasherMotionGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setPlaying(true);
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="grid grid-cols-2 gap-x-5 gap-y-6 min-[600px]:grid-cols-3"
    >
      {ITEMS.map((item) => (
        <div key={item.id} className="flex flex-col items-center gap-2">
          <KudosLottie id={item.id} size={100} playing={playing} />
          <p className="text-[14px] leading-[18.2px] tracking-[0.14px] text-[#7e7e7e]">
            {item.label}
          </p>
        </div>
      ))}
    </div>
  );
}
