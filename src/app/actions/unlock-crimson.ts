"use server";

import { createHash, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import {
  CRIMSON_COOKIE,
  crimsonPassword,
  crimsonUnlockToken,
} from "@/lib/project-lock";

function sameSecret(left: string, right: string) {
  const a = createHash("sha256").update(left).digest();
  const b = createHash("sha256").update(right).digest();
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function unlockCrimson(password: string) {
  if (!sameSecret(password, crimsonPassword())) {
    return { ok: false as const, error: "Incorrect password." };
  }

  const cookieStore = await cookies();
  cookieStore.set(CRIMSON_COOKIE, crimsonUnlockToken(password), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  return { ok: true as const };
}
