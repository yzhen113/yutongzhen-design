"use client";

import { useId, useState } from "react";
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
  const [focused, setFocused] = useState(false);

  return (
    <div className="flex w-[206px] flex-col gap-2.5">
      <label
        htmlFor={inputId}
        className="text-[14px] font-semibold leading-[18.2px] tracking-[0.14px] text-black"
      >
        Password
      </label>
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
          "macos-text-field h-[41px] w-[205px] rounded-[10px] bg-white px-[14px] text-[15px] leading-[27px] font-medium text-[#1A1A1A] caret-[#0088FF] outline-none transition-[box-shadow] duration-150 disabled:opacity-60",
          error ? "is-error" : "",
          focused ? "is-focused" : "",
        ].join(" ")}
        style={{
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", sans-serif',
        }}
      />
      <a
        href={`mailto:${site.email}`}
        className="request-access-link w-fit"
      >
        Request access
      </a>
    </div>
  );
}
