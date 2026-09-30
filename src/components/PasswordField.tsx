"use client";

import { useId, useState } from "react";
import { SmoothCorners, smoothCornerPath } from "@/components/SmoothCorners";
import { site } from "@/lib/site";

export function PasswordField({
  autoFocus = false,
  disabled = false,
  error = false,
  onValueChange,
}: {
  autoFocus?: boolean;
  disabled?: boolean;
  error?: boolean;
  onValueChange?: () => void;
}) {
  const inputId = useId();
  const haloMaskId = `password-halo-${useId().replace(/:/g, "")}`;
  const [focused, setFocused] = useState(false);
  const boxPath = smoothCornerPath(205, 41, 10);

  return (
    <div className="flex w-[206px] flex-col gap-2.5">
      <label
        htmlFor={inputId}
        className="text-[14px] font-semibold leading-[18.2px] tracking-[0.14px] text-black"
      >
        Password
      </label>
      <div className="relative w-[205px]">
        <SmoothCorners radius={10} className="rounded-[10px] bg-white">
          <input
            id={inputId}
            name="password"
            type="password"
            autoComplete="current-password"
            autoFocus={autoFocus}
            disabled={disabled}
            onChange={onValueChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className={[
              "block h-[41px] w-[205px] bg-white px-[14px] text-[15px] leading-[27px] font-medium text-[#1A1A1A] caret-[#0088FF] outline-none transition-[box-shadow] duration-150 disabled:opacity-60",
              error ? "is-error" : "",
              focused ? "is-focused" : "",
            ].join(" ")}
            style={{
              fontFamily:
                '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", sans-serif',
            }}
          />
        </SmoothCorners>
        <svg
          width={205}
          height={41}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-visible"
        >
          <defs>
            <mask
              id={haloMaskId}
              maskUnits="userSpaceOnUse"
              x={-12}
              y={-12}
              width={229}
              height={65}
            >
              <rect x={-12} y={-12} width={229} height={65} fill="white" />
              <path d={boxPath} fill="black" />
            </mask>
          </defs>
          {(focused || error) && (
            <path
              d={boxPath}
              fill="none"
              stroke={error ? "rgba(194,59,59,0.18)" : "rgba(0,122,255,0.22)"}
              strokeWidth={12}
              mask={`url(#${haloMaskId})`}
            />
          )}
          <path d={boxPath} fill="none" stroke={error ? "#e8a0a0" : focused ? "rgba(0,122,255,0.35)" : "rgba(0,0,0,0.08)"} strokeWidth={1.7} />
        </svg>
      </div>
      <a
        href={`mailto:${site.email}`}
        className="request-access-link w-fit"
      >
        Request access
      </a>
    </div>
  );
}
