"use client";

import { useEffect, useRef, useState } from "react";

const SRC = "/proto/week-one-kudos/index.html";
const DEVICE_W = 393;
const DEVICE_H = 852;

const EDGE: Record<number, string> = {
  1: "#f2f1ef",
  2: "#5f8fbb",
  7: "#5f8fbb",
};

export function KudosPhone({
  day,
  stage,
  width = 260,
}: {
  day: 1 | 2 | 7;
  stage?: "card";
  width?: number;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [live, setLive] = useState(false);
  const height = (width * DEVICE_H) / DEVICE_W;
  const scale = width / DEVICE_W;
  const query = `bare=1&day=${day}${stage ? `&stage=${stage}` : ""}`;

  useEffect(() => {
    const el = hostRef.current;
    if (!el || live) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setLive(true);
      },
      { rootMargin: "400px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [live]);

  useEffect(() => {
    if (!live) return;
    const frame = frameRef.current;
    if (!frame) return;
    let detach: (() => void) | undefined;

    const attach = () => {
      const doc = frame.contentDocument;
      const win = frame.contentWindow;
      if (!doc || !win) return;
      doc.documentElement.style.touchAction = "manipulation";

      const keep = (url?: string | URL | null) => {
        const next = new URL(
          url == null ? win.location.href : String(url),
          win.location.href,
        );
        next.searchParams.set("bare", "1");
        next.searchParams.set("day", String(day));
        if (stage) next.searchParams.set("stage", stage);
        return next.pathname + next.search + next.hash;
      };
      const { pushState, replaceState } = win.history;
      win.history.pushState = function (state, title, url) {
        return pushState.call(this, state, title, keep(url));
      };
      win.history.replaceState = function (state, title, url) {
        return replaceState.call(this, state, title, keep(url));
      };

      const params = new URLSearchParams(win.location.search);
      if (
        params.get("bare") !== "1" ||
        params.get("day") !== String(day) ||
        (stage && params.get("stage") !== stage)
      ) {
        frame.src = `${SRC}?${query}`;
        return;
      }

      const guard = window.setInterval(() => {
        const q = new URLSearchParams(frame.contentWindow?.location.search ?? "");
        if (q.get("bare") !== "1" || q.get("day") !== String(day)) {
          frame.src = `${SRC}?${query}`;
        }
      }, 500);

      detach = () => {
        window.clearInterval(guard);
        win.history.pushState = pushState;
        win.history.replaceState = replaceState;
      };
    };

    attach();
    frame.addEventListener("load", attach);
    return () => {
      frame.removeEventListener("load", attach);
      detach?.();
    };
  }, [day, live, query, stage]);

  return (
    <div
      ref={hostRef}
      className="mx-auto overflow-hidden rounded-[36px] border border-solid border-[#f2f2f2] bg-white shadow-[0_12px_28px_rgba(0,0,0,0.08)]"
      style={{ width, height, background: EDGE[day] ?? "#fff" }}
    >
      {live ? (
        <iframe
          ref={frameRef}
          src={`${SRC}?${query}`}
          title={`Week One Kudos — day ${day}`}
          allow="autoplay"
          scrolling="no"
          className="block border-0"
          style={{
            width: DEVICE_W,
            height: DEVICE_H,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            touchAction: "manipulation",
          }}
        />
      ) : null}
    </div>
  );
}
