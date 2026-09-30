import Image from "next/image";
import { CaseStudyHeader } from "@/components/projects/CaseStudyChrome";
import { CrimsonLockScreen } from "@/components/projects/CrimsonLockScreen";
import { SiteFooter } from "@/components/SiteFooter";
import { isCrimsonUnlocked } from "@/lib/project-lock";

export const metadata = {
  title: "Yutong Zhen - Crimson: From payouts to everyday banking",
};

export default async function CrimsonPage() {
  const unlocked = await isCrimsonUnlocked();

  return (
    <div className="flex min-h-screen flex-col overflow-x-clip bg-white">
      <CaseStudyHeader title="Crimson: From payouts to everyday banking" />
      {unlocked ? (
        <div className="relative w-full overflow-hidden bg-[#f2f2f2]">
          <Image
            src="/media/crimson/cover.png"
            alt="DoorDash Crimson on three phones, showing the bank account, direct deposit, and balance screens"
            width={9280}
            height={5272}
            priority
            quality={100}
            unoptimized
            className="h-auto w-full object-cover"
            sizes="100vw"
          />
        </div>
      ) : (
        <CrimsonLockScreen />
      )}
      <SiteFooter compact={!unlocked} />
    </div>
  );
}
