import { createHash } from "crypto";
import { cookies } from "next/headers";

export const DASHER_HREF = "/projects/dasher";
export const DASHER_COOKIE = "dasher_unlock";

export function dasherPassword() {
  return "DASHER";
}

export function dasherUnlockToken(password: string) {
  return createHash("sha256").update(`dasher:${password}`).digest("hex");
}

export async function isDasherUnlocked() {
  const cookieStore = await cookies();
  return (
    cookieStore.get(DASHER_COOKIE)?.value === dasherUnlockToken(dasherPassword())
  );
}

export const CRIMSON_HREF = "/projects/crimson";
export const CRIMSON_COOKIE = "crimson_unlock";

export function crimsonPassword() {
  return "CRIMSON";
}

export function crimsonUnlockToken(password: string) {
  return createHash("sha256").update(`crimson:${password}`).digest("hex");
}

export async function isCrimsonUnlocked() {
  const cookieStore = await cookies();
  return (
    cookieStore.get(CRIMSON_COOKIE)?.value ===
    crimsonUnlockToken(crimsonPassword())
  );
}
