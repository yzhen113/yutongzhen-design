"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { unlockDasher } from "@/app/actions/unlock-dasher";
import { PasswordField } from "@/components/PasswordField";

export function DasherLockScreen() {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [pending, startTransition] = useTransition();

  return (
    <main className="flex flex-1 items-center justify-center px-3 py-16">
      <form
        className={error ? "animate-password-shake" : undefined}
        onSubmit={(event) => {
          event.preventDefault();
          const form = event.currentTarget;
          const password = String(new FormData(form).get("password") ?? "");
          startTransition(async () => {
            const result = await unlockDasher(password);
            if (!result.ok) {
              setError(true);
              form.querySelector("input")?.select();
              return;
            }
            router.refresh();
          });
        }}
      >
        <PasswordField
          disabled={pending}
          error={error}
          onValueChange={() => setError(false)}
        />
      </form>
    </main>
  );
}
