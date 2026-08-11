"use client";

import { useEffect, useState } from "react";

function formatPittsburghTime(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}

export function PittsburghClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => setTime(formatPittsburghTime(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="flex items-center justify-end gap-2 pr-[25px] text-[14px] leading-[18.2px] tracking-[0.14px] text-foreground">
      <span>Pittsburgh,</span>
      <span className="min-w-[52px] tabular-nums">{time || "\u00a0"}</span>
    </div>
  );
}
