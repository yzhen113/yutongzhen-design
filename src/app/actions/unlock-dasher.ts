"use server";

import { createHash, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import {
  DASHER_COOKIE,
  dasherPassword,
  dasherUnlockToken,
} from "@/lib/project-lock";

function sameSecret(left: string, right: string) {
  const a = createHash("sha256").update(left).digest();
  const b = createHash("sha256").update(right).digest();
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function unlockDasher(password: string) {
  if (!sameSecret(password, dasherPassword())) {
    return { ok: false as const, error: "Incorrect password." };
  }

  const cookieStore = await cookies();
  cookieStore.set(DASHER_COOKIE, dasherUnlockToken(password), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  return { ok: true as const };
}
