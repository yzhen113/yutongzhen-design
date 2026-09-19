import Image from "next/image";
import { DeviceVideo } from "@/components/projects/DeviceVideo";

const demos = [
  {
    name: "day-2-all-stats",
    alt: "Day two: rotating delivery metric celebrations",
  },
  {
    name: "day-1",
    alt: "First dash: dash summary opening into a celebration",
  },
  {
    name: "day-8",
    alt: "Day eight: first-week delivery recap celebration",
  },
];

export function DasherHero() {
  return (
    <div
      className="relative w-full overflow-hidden bg-[#202020]"
      style={{ aspectRatio: "9280 / 5272" }}
      aria-label="DoorDash for Dashers prototype demos"
    >
      <div className="absolute top-[15.6%] left-[18%] flex w-[64%] items-start justify-between">
        {demos.map(({ name, alt }) => (
          <div key={name} className="w-[29.84375%] shrink-0">
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
        className="absolute bottom-[6.7%] left-1/2 h-auto w-[17.5%] -translate-x-1/2"
      />
    </div>
  );
}
