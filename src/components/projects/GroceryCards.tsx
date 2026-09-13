"use client";

import { useRef, useState, type PointerEvent } from "react";

const MOVE_PX = 7;
const PEEL_MS = 320;

type PeelCorner = {
  originX: string;
  originY: string;
  rxSign: number;
  rySign: number;
  rzSign: number;
};

function cornerFromPoint(
  el: HTMLElement,
  clientX: number,
  clientY: number,
): PeelCorner {
  const rect = el.getBoundingClientRect();
  const fromLeft = clientX - rect.left < rect.width / 2;
  const fromTop = clientY - rect.top < rect.height / 2;
  return {
    originX: fromLeft ? "100%" : "0%",
    originY: fromTop ? "100%" : "0%",
    rxSign: fromTop ? -1 : 1,
    rySign: fromLeft ? 1 : -1,
    rzSign: fromLeft === fromTop ? -1 : 1,
  };
}

function peelTransform(
  x: number,
  y: number,
  peel: number,
  tilt: number,
  corner: PeelCorner,
) {
  const rx = corner.rxSign * 4 * peel;
  const ry = corner.rySign * 3 * peel + tilt;
  const rz = corner.rzSign * 1.2 * peel;
  const lift = -9 * peel;
  const scale = 1 + 0.04 * peel;
  return `translate(${x}px, ${y}px) translateY(${lift}px) rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rz}deg) scale(${scale})`;
}

type CardDef = {
  id: string;
  name: string;
  src: string;
  width: number;
  height: number;
  left: string;
  top: string;
  widthPct: string;
  baseZ: number;
};

// DOM order = paint order at rest: Aldi behind, Trader Joes, Whole Foods on top.
const CARDS: CardDef[] = [
  {
    id: "aldi",
    name: "Aldi",
    src: "/media/tom/card-aldi.svg",
    width: 354,
    height: 181,
    left: "21.35%",
    top: "50%",
    widthPct: "48.76%",
    baseZ: 10,
  },
  {
    id: "trader-joes",
    name: "Trader Joes",
    src: "/media/tom/card-trader-joes.svg",
    width: 370,
    height: 228,
    left: "-2.2%",
    top: "0%",
    widthPct: "50.96%",
    baseZ: 20,
  },
  {
    id: "whole-foods",
    name: "Whole Foods",
    src: "/media/tom/card-whole-foods.svg",
    width: 366,
    height: 208,
    left: "50.55%",
    top: "22%",
    widthPct: "50.41%",
    baseZ: 30,
  },
];

function Sticker({
  card,
  dimmed,
  zIndex,
  onFocusChange,
  onBringToFront,
}: {
  card: CardDef;
  dimmed: boolean;
  zIndex: number;
  onFocusChange: (id: string, focused: boolean) => void;
  onBringToFront: (id: string) => void;
}) {
  const nodeRef = useRef<HTMLButtonElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const tiltRef = useRef(0);
  const animRef = useRef<Animation | null>(null);
  const peelAnimRef = useRef<Animation | null>(null);
  const peelCornerRef = useRef<PeelCorner | null>(null);
  const drag = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    origX: number;
    origY: number;
    lastX: number;
    lastT: number;
    vx: number;
  } | null>(null);
  const [lifted, setLifted] = useState(false);
  const [peeling, setPeeling] = useState(false);
  const [sticking, setSticking] = useState(false);
  const liftedRef = useRef(false);

  function setLiftedNow(value: boolean) {
    liftedRef.current = value;
    setLifted(value);
    onFocusChange(card.id, value);
  }

  function activeCorner(): PeelCorner {
    return (
      peelCornerRef.current ?? {
        originX: "0%",
        originY: "100%",
        rxSign: -1,
        rySign: -1,
        rzSign: 1,
      }
    );
  }

  function paint(opts?: { lift?: boolean; tilt?: number }) {
    const el = nodeRef.current;
    if (!el) return;
    const lift = opts?.lift ?? liftedRef.current;
    const tilt = opts?.tilt ?? tiltRef.current;
    tiltRef.current = tilt;
    const { x, y } = pos.current;
    el.style.setProperty("--stk-tilt", String(tilt));
    // Glint tracks drag position (smooth), not velocity (noisy).
    const glint = Math.max(-30, Math.min(30, x * 0.16 + y * 0.08));
    el.style.setProperty("--stk-glint", String(glint));
    if (lift) {
      const corner = activeCorner();
      el.style.transformOrigin = `${corner.originX} ${corner.originY}`;
      el.style.transform = peelTransform(x, y, 1, tilt, corner);
    } else {
      el.style.transformOrigin = "center center";
      el.style.transform = `translate(${x}px, ${y}px)`;
    }
  }

  function finishPeel() {
    if (liftedRef.current) return;
    peelAnimRef.current?.cancel();
    peelAnimRef.current = null;
    setPeeling(false);
    setLiftedNow(true);
    try {
      navigator.vibrate?.(12);
    } catch {
      /* ignore */
    }
    paint({ lift: true });
  }

  function startPeel() {
    const el = nodeRef.current;
    if (!el || liftedRef.current) return;
    const corner = activeCorner();
    const { x, y } = pos.current;
    peelAnimRef.current?.cancel();
    el.style.transformOrigin = `${corner.originX} ${corner.originY}`;
    onBringToFront(card.id);
    onFocusChange(card.id, true);
    setPeeling(true);
    const anim = el.animate(
      [
        { transform: peelTransform(x, y, 0, 0, corner) },
        { transform: peelTransform(x, y, 1, 0, corner) },
      ],
      {
        duration: PEEL_MS,
        // Slow give, then the adhesive lets go.
        easing: "cubic-bezier(0.55, 0.04, 0.18, 1)",
        fill: "forwards",
      },
    );
    peelAnimRef.current = anim;
    anim.onfinish = () => {
      if (peelAnimRef.current !== anim) return;
      peelAnimRef.current = null;
      finishPeel();
    };
  }

  function reversePeel() {
    const el = nodeRef.current;
    if (!el) return;
    const corner = activeCorner();
    const { x, y } = pos.current;
    const running = peelAnimRef.current;
    const progress = running
      ? Math.min(((Number(running.currentTime) || 0) / PEEL_MS), 1)
      : 1;
    running?.cancel();
    peelAnimRef.current = null;
    if (progress < 0.04) {
      setPeeling(false);
      onFocusChange(card.id, false);
      paint({ lift: false, tilt: 0 });
      return;
    }
    const anim = el.animate(
      [
        { transform: peelTransform(x, y, progress, 0, corner) },
        { transform: peelTransform(x, y, 0, 0, corner) },
      ],
      {
        duration: 140 + progress * 120,
        easing: "cubic-bezier(0.4, 0, 0.2, 1)",
        fill: "forwards",
      },
    );
    peelAnimRef.current = anim;
    anim.onfinish = () => {
      if (peelAnimRef.current !== anim) return;
      peelAnimRef.current = null;
      el.style.transformOrigin = "center center";
      el.style.transform = `translate(${x}px, ${y}px)`;
      setPeeling(false);
      onFocusChange(card.id, false);
    };
  }

  function stickDown() {
    const el = nodeRef.current;
    if (!el) return;
    const { x, y } = pos.current;
    const tilt = tiltRef.current;
    const corner = activeCorner();
    setLiftedNow(false);
    setPeeling(false);
    try {
      navigator.vibrate?.(8);
    } catch {
      /* ignore */
    }
    animRef.current?.cancel();
    setSticking(true);
    el.style.transformOrigin = `${corner.originX} ${corner.originY}`;
    const anim = el.animate(
      [
        {
          transform: peelTransform(x, y, 1, tilt, corner),
          offset: 0,
        },
        {
          transform: `translate(${x}px, ${y}px) translateY(3px) scale(0.94) rotateX(${corner.rxSign * 1}deg) rotateZ(${corner.rzSign * 0.5}deg)`,
          offset: 0.28,
        },
        {
          transform: `translate(${x}px, ${y}px) scale(1.03)`,
          offset: 0.58,
        },
        {
          transform: `translate(${x}px, ${y}px) scale(1)`,
          offset: 1,
        },
      ],
      {
        duration: 480,
        easing: "linear",
        fill: "forwards",
      },
    );
    animRef.current = anim;
    anim.onfinish = () => {
      anim.commitStyles();
      anim.cancel();
      el.style.transformOrigin = "center center";
      el.style.transform = `translate(${x}px, ${y}px)`;
      tiltRef.current = 0;
      setSticking(false);
      animRef.current = null;
    };
  }

  function endDrag(e: PointerEvent<HTMLButtonElement>) {
    const d = drag.current;
    if (!d || d.pointerId !== e.pointerId) return;
    drag.current = null;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    if (liftedRef.current) {
      stickDown();
      return;
    }
    reversePeel();
  }

  function onPointerDown(e: PointerEvent<HTMLButtonElement>) {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    e.preventDefault();
    animRef.current?.cancel();
    peelAnimRef.current?.cancel();
    setSticking(false);
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      /* pointer may already be released */
    }
    peelCornerRef.current = cornerFromPoint(
      e.currentTarget,
      e.clientX,
      e.clientY,
    );
    drag.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      origX: pos.current.x,
      origY: pos.current.y,
      lastX: e.clientX,
      lastT: performance.now(),
      vx: 0,
    };
    startPeel();
  }

  function onPointerMove(e: PointerEvent<HTMLButtonElement>) {
    const d = drag.current;
    if (!d || d.pointerId !== e.pointerId) return;
    const dx = e.clientX - d.startX;
    const dy = e.clientY - d.startY;
    if (!liftedRef.current) {
      if (Math.hypot(dx, dy) > MOVE_PX) {
        finishPeel();
      } else {
        return;
      }
    }
    const now = performance.now();
    const dt = Math.max(now - d.lastT, 8);
    // Exponential moving average: raw per-event velocity is too jittery.
    const rawV = (e.clientX - d.lastX) / dt;
    d.vx = d.vx * 0.72 + rawV * 0.28;
    d.lastX = e.clientX;
    d.lastT = now;
    pos.current = { x: d.origX + dx, y: d.origY + dy };
    const targetTilt = Math.max(-2.5, Math.min(2.5, d.vx * 4));
    const tilt = tiltRef.current + (targetTilt - tiltRef.current) * 0.3;
    paint({ lift: true, tilt });
  }

  const maskValue = `url(${card.src})`;

  return (
    <button
      ref={nodeRef}
      type="button"
      aria-label={`Move ${card.name} sticker`}
      aria-grabbed={lifted}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onContextMenu={(e) => e.preventDefault()}
      className={[
        "sticker absolute m-0 border-0 bg-transparent p-0 select-none",
        lifted ? "cursor-grabbing" : "cursor-grab",
        peeling ? "is-peeling" : "",
        sticking ? "is-sticking" : "",
      ].join(" ")}
      style={{
        left: card.left,
        top: card.top,
        width: card.widthPct,
        zIndex,
        opacity: dimmed ? 0.45 : 1,
        transition: "opacity 220ms ease",
        touchAction: "none",
        transformStyle: "preserve-3d",
      }}
    >
      <img
        src={card.src}
        alt=""
        width={card.width}
        height={card.height}
        draggable={false}
        className="pointer-events-none h-auto w-full"
      />
      <span
        aria-hidden
        className="sticker-face"
        style={{ WebkitMaskImage: maskValue, maskImage: maskValue }}
      >
        <span className="sticker-holo" />
        <span className="sticker-sheen" />
      </span>
    </button>
  );
}

export function GroceryCards() {
  const [focusedId, setFocusedId] = useState<string | null>(null);
  // Last card picked up wins the top slot; in-memory only, so a reload
  // restores the original stacking.
  const [stack, setStack] = useState<Record<string, number>>({});

  function handleFocusChange(id: string, focused: boolean) {
    setFocusedId((current) => {
      if (focused) return id;
      return current === id ? null : current;
    });
  }

  function bringToFront(id: string) {
    setStack((prev) => {
      const highest = Math.max(
        ...CARDS.map((c) => prev[c.id] ?? c.baseZ),
      );
      if ((prev[id] ?? 0) === highest) return prev;
      return { ...prev, [id]: highest + 1 };
    });
  }

  return (
    <div className="mb-0! overflow-visible">
      <div
        className="relative w-full overflow-visible"
        style={{ aspectRatio: "726 / 295", perspective: "900px" }}
        role="img"
        aria-label="Trader Joes, Aldi, and Whole Foods grocery list cards"
      >
        {CARDS.map((card) => (
          <Sticker
            key={card.id}
            card={card}
            dimmed={focusedId !== null && focusedId !== card.id}
            zIndex={stack[card.id] ?? card.baseZ}
            onFocusChange={handleFocusChange}
            onBringToFront={bringToFront}
          />
        ))}
      </div>
    </div>
  );
}
