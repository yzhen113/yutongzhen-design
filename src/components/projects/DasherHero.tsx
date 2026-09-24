import Image from "next/image";
import { DeviceVideo } from "@/components/projects/DeviceVideo";

const demos = [
  {
    name: "stats-only",
    alt: "Day two: delivery metric celebrations",
  },
  {
    name: "day-1-close",
    alt: "First dash: dash summary opening into a celebration",
  },
  {
    name: "day-8",
    alt: "Day eight: first-week delivery recap celebration",
  },
];

function DasherHeroStage({ thumbnail }: { thumbnail: boolean }) {
  return (
    <div
      className={`relative w-full overflow-hidden ${thumbnail ? "bg-[#F2F2F2]" : "bg-[#202020]"}`}
      style={{ aspectRatio: thumbnail ? "9280 / 5272" : "2992 / 1700" }}
      aria-label="DoorDash for Dashers prototype demos"
    >
      <div className="absolute top-[7.7%] inset-x-0 flex items-start justify-center gap-[2.34%]">
        {demos.map(({ name, alt }) => (
          <div key={name} className="w-[22.96%] shrink-0">
            <DeviceVideo
              src={`/media/dasher/${name}-screen.mp4`}
              poster={`/media/dasher/${name}-screen-poster.png`}
              alt={alt}
            />
          </div>
        ))}
      </div>
      <Image
        src="/media/dasher/doordash-for-dashers-white.png"
        alt="DoorDash for Dashers"
        width={810}
        height={130}
        priority
        unoptimized
        className={`absolute bottom-[3.53%] left-1/2 h-auto w-[15%] -translate-x-1/2 ${thumbnail ? "brightness-0" : ""}`}
      />
    </div>
  );
}

export function DasherHero({ thumbnail = false }: { thumbnail?: boolean }) {
  if (thumbnail) {
    return <DasherHeroStage thumbnail />;
  }

  return (
    <div className="relative flex w-full items-center justify-center bg-[#202020] px-0 min-[600px]:px-4 min-[1200px]:h-[620px] min-[1200px]:px-0">
      <div className="relative w-full max-w-[1020px] overflow-hidden">
        <DasherHeroStage thumbnail={false} />
      </div>
    </div>
  );
}
