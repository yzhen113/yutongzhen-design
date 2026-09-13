"use client";

import { useId } from "react";

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

  return (
    <div className="flex w-[206px] flex-col gap-2">
      <label
        htmlFor={inputId}
        className="text-[14px] font-semibold leading-[18.2px] tracking-[0.14px] text-black"
      >
        Password
      </label>
      <div
        className={[
          "flex h-[42px] items-center rounded-[10px] border border-solid p-[3px]",
          error ? "border-[#c23b3b]" : "border-[#1451A6]",
        ].join(" ")}
      >
        <div className="flex h-full w-full items-center rounded-lg bg-[#F2F2F7]">
          <input
            id={inputId}
            name="password"
            type="password"
            autoComplete="current-password"
            autoFocus={autoFocus}
            disabled={disabled}
            onChange={onValueChange}
            className="h-full w-full bg-transparent px-3 text-[14px] leading-[18.2px] tracking-[0.14px] text-foreground outline-none disabled:opacity-60"
          />
        </div>
      </div>
    </div>
  );
}
