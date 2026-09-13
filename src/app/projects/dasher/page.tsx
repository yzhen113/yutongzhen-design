import { CaseStudyHeader } from "@/components/projects/CaseStudyChrome";
import { SiteFooter } from "@/components/SiteFooter";
import { DasherLockScreen } from "@/components/projects/DasherLockScreen";
import { isDasherUnlocked } from "@/lib/project-lock";

export const metadata = {
  title: "Yutong Zhen - Dasher: Building better delivery experiences",
  description:
    "Dasher — a DoorDash product design case study on building better delivery experiences.",
};

export default async function DasherPage() {
  const unlocked = await isDasherUnlocked();

  return (
    <div className="flex min-h-screen flex-col overflow-x-clip bg-white">
      <CaseStudyHeader title="Dasher: Building better delivery experiences" />
      {unlocked ? <DasherPlaceholder /> : <DasherLockScreen />}
      <SiteFooter compact />
    </div>
  );
}

function DasherPlaceholder() {
  return (
    <main className="mx-auto flex w-full max-w-[550px] flex-1 flex-col justify-center px-3 py-16 min-[1200px]:px-0">
      <h1 className="text-[26px] font-medium leading-[31.2px] tracking-[-1.04px] text-foreground">
        Dasher: Building better delivery experiences
      </h1>
      <p className="mt-5 text-[14px] leading-[18.2px] tracking-[0.14px] text-foreground/70">
        Case study coming soon.
      </p>
    </main>
  );
}
