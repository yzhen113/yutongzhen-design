"use client";

import { getSvgPath } from "figma-squircle";
import { useId, useLayoutEffect, useRef, type ComponentPropsWithRef } from "react";

export const CORNER_SMOOTHING = 0.6;

export function smoothCornerPath(width: number, height: number, radius: number) {
  return getSvgPath({ width, height, cornerRadius: radius, cornerSmoothing: CORNER_SMOOTHING });
}

/** Responsive Figma-style corners, including a border that follows the same curve. */
export function SmoothCorners({
  radius = 8,
  ref,
  children,
  style,
  ...props
}: ComponentPropsWithRef<"div"> & { radius?: number }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);
  const cornerClipRef = useRef<SVGPathElement>(null);
  const cornerClipId = useId();
  const pathRef = useRef<SVGPathElement>(null);

  useLayoutEffect(() => {
    const host = hostRef.current;
    const border = borderRef.current;
    const path = pathRef.current;
    const cornerClip = cornerClipRef.current;
    if (!host || !border || !path || !cornerClip || radius <= 0) return;
    const computed = getComputedStyle(host);
    const borderWidth = parseFloat(computed.borderTopWidth) || 0;
    const borderColor = computed.borderTopColor;

    const update = (width: number, height: number) => {
      if (!width || !height) return;
      const d = smoothCornerPath(width, height, radius);
      host.style.setProperty("--smooth-clip", `path('${d}')`);
      host.dataset.cornersReady = "true";
      border.style.width = `${width}px`;
      border.style.height = `${height}px`;
      border.style.left = `${-borderWidth}px`;
      border.style.top = `${-borderWidth}px`;
      // CSS paints the straight edges. SVG only draws the four smoothed
      // corners, avoiding Safari's uneven rasterization of long SVG strokes.
      const inset = borderWidth;
      const corner = Math.min(Math.ceil(radius * (1 + CORNER_SMOOTHING)) + borderWidth, width / 2, height / 2);
      border.style.setProperty("--outline-width", `${borderWidth}px`);
      border.style.setProperty("--outline-inset", `${inset - borderWidth / 2}px`);
      border.style.setProperty("--outline-corner", `${corner}px`);
      border.style.setProperty("--outline-color", borderColor);
      cornerClip.setAttribute("d", [
        `M0 0H${corner}V${corner}H0Z`,
        `M${width - corner} 0H${width}V${corner}H${width - corner}Z`,
        `M0 ${height - corner}H${corner}V${height}H0Z`,
        `M${width - corner} ${height - corner}H${width}V${height}H${width - corner}Z`,
      ].join(" "));
      path.setAttribute("d", smoothCornerPath(
        Math.max(0, width - inset * 2),
        Math.max(0, height - inset * 2),
        Math.max(0, radius - inset),
      ));
      path.setAttribute("transform", `translate(${inset} ${inset})`);
      path.setAttribute("stroke", borderColor);
      path.setAttribute("stroke-width", String(borderWidth));
    };
    update(parseFloat(computed.width), parseFloat(computed.height));
    const observer = new ResizeObserver(([entry]) => {
      const box = entry.borderBoxSize[0];
      if (box) update(box.inlineSize, box.blockSize);
    });
    observer.observe(host);
    return () => {
      observer.disconnect();
      delete host.dataset.cornersReady;
      host.style.removeProperty("--smooth-clip");
    };
  }, [radius]);

  return (
    <div
      {...props}
      ref={(node) => {
        hostRef.current = node;
        if (typeof ref === "function") return ref(node);
        if (ref) ref.current = node;
      }}
      data-smooth-corners={radius > 0 ? "0.6" : undefined}
      style={{ ...style }}
    >
      {children}
      {radius > 0 && (
        <div ref={borderRef} aria-hidden="true" className="smooth-corner-border">
          <span className="smooth-border-top" />
          <span className="smooth-border-right" />
          <span className="smooth-border-bottom" />
          <span className="smooth-border-left" />
          <svg width="100%" height="100%">
            <defs><clipPath id={cornerClipId}><path ref={cornerClipRef} /></clipPath></defs>
            <g clipPath={`url(#${cornerClipId})`}><path ref={pathRef} fill="none" /></g>
          </svg>
        </div>
      )}
    </div>
  );
}
