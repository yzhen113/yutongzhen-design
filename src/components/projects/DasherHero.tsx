import Image from "next/image";

export function DasherHero() {
  return (
    <div className="relative w-full overflow-hidden bg-[#191919]">
      <Image
        src="/media/dasher/hero.png"
        alt="DoorDash Dasher app on three phones: a busy nearby map, an on-time delivery moment, and a dash streak"
        width={9280}
        height={5272}
        priority
        quality={100}
        unoptimized
        className="h-auto w-full object-cover"
        sizes="100vw"
      />
    </div>
  );
}
