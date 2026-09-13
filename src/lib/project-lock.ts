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
