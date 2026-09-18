"use client";

import { useEffect, useRef, useState } from "react";
import {
  KudosLottie,
  type KudosLottieId,
} from "@/components/projects/KudosLottie";

type GalleryItem =
  | { id: KudosLottieId; label: string; src?: never }
  | { id: "quality"; label: string; src: string };

const ITEMS: GalleryItem[] = [
  { id: "cupcake", label: "First dash" },
  { id: "onTime", label: "On-time" },
  { id: "acceptance", label: "Acceptance" },
  { id: "completion", label: "Completion" },
  { id: "quality", label: "Quality rate", src: "/media/dasher/spot/quality-rate.svg" },
  { id: "medal", label: "Week recap" },
];

function MotionItem({ item }: { item: GalleryItem }) {
  const ref = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setPlaying(entry.isIntersecting && entry.intersectionRatio >= 0.3),
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="flex flex-col items-center gap-2">
      {item.id === "quality" ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={item.src} alt="" width={100} height={100} />
      ) : (
        <KudosLottie id={item.id} size={100} playing={playing} />
      )}
      <p className="text-[14px] leading-[18.2px] tracking-[0.14px] text-[#7e7e7e]">
        {item.label}
      </p>
    </div>
  );
}

export function DasherMotionGrid() {
  return (
    <div className="grid grid-cols-2 gap-x-5 gap-y-6 min-[600px]:grid-cols-3">
      {ITEMS.map((item) => <MotionItem key={item.id} item={item} />)}
    </div>
  );
}
