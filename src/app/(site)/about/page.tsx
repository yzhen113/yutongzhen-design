import Image from "next/image";
import { RecentTravelsMark } from "@/components/RecentTravelsMark";
import { site } from "@/lib/site";

export const metadata = {
  title: "Yutong Zhen - About",
  description:
    "Yutong Zhen is an interaction designer studying Design, HCI, and Physical Computing at Carnegie Mellon. Previously designing at DoorDash.",
};

function StudyLinks() {
  return (
    <>
      <a
        className="plain-link"
        href={site.links.design}
        target="_blank"
        rel="noreferrer"
      >
        Design
      </a>
      ,{" "}
      <a
        className="plain-link"
        href={site.links.hci}
        target="_blank"
        rel="noreferrer"
      >
        HCI
      </a>
      ,{" "}
      <a
        className="plain-link"
        href={site.links.physicalComputing}
        target="_blank"
        rel="noreferrer"
      >
        Physical Computing
      </a>{" "}
      @ Carnegie Mellon. Previously, designing @{" "}
      <a
        className="plain-link"
        href={site.links.doordash}
        target="_blank"
        rel="noreferrer"
      >
        DoorDash
      </a>
    </>
  );
}

const TRAVEL_LEFT = [
  {
    src: "/media/about/travel-l1.jpg",
    alt: "Tokyo Tower seen through trees",
    title: "Tokyo",
    width: 1365,
    height: 2048,
    portrait: true,
  },
  {
    src: "/media/about/travel-l2.jpg",
    alt: "Torii gate and paper streamers in Enoshima",
    title: "Enoshima",
    width: 2048,
    height: 1365,
    portrait: false,
  },
  {
    src: "/media/about/travel-l3.jpg",
    alt: "Two dogs resting on the sand in Kenting",
    title: "Kenting",
    width: 1365,
    height: 2048,
    portrait: true,
  },
  {
    src: "/media/about/travel-otaru.jpg",
    alt: "Snow-covered Otaru seen from above the harbor",
    title: "Otaru",
    width: 2048,
    height: 1365,
    portrait: false,
  },
] as const;

const TRAVEL_RIGHT = [
  {
    src: "/media/about/travel-r1.jpg",
    alt: "Sunset silhouettes along the water in Kamakura",
    title: "Kamakura",
    width: 2048,
    height: 1365,
    portrait: false,
  },
  {
    src: "/media/about/travel-r2.jpg",
    alt: "Niagara Falls from the water's edge",
    title: "Niagara Falls",
    width: 1365,
    height: 2048,
    portrait: true,
  },
  {
    src: "/media/about/travel-r3.jpg",
    alt: "Orange cat on a sidewalk in Tainan",
    title: "Tainan",
    width: 2048,
    height: 1365,
    portrait: false,
  },
  {
    src: "/media/about/travel-r4.jpg",
    alt: "Corner apartment building and yellow cab in NYC",
    title: "NYC",
    width: 2048,
    height: 3072,
    portrait: true,
  },
] as const;

function TravelPhoto({
  src,
  alt,
  title,
  width,
  height,
  portrait,
}: {
  src: string;
  alt: string;
  title?: string;
  width: number;
  height: number;
  portrait: boolean;
}) {
  return (
    <figure
      className={`group relative w-full overflow-hidden ${portrait ? "aspect-[2/3]" : "aspect-[3/2]"}`}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="h-full w-full object-cover"
        sizes="(max-width: 809px) 100vw, 50vw"
        quality={95}
      />
      {title ? (
        <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] flex translate-y-full flex-col gap-1 p-4 text-[14px] leading-[18.2px] tracking-[0.14px] text-white transition-[translate] duration-[400ms] ease-[cubic-bezier(0.44,0,0.56,1)] group-hover:translate-y-0 motion-reduce:translate-y-0">
          <p>{title}</p>
        </figcaption>
      ) : null}
    </figure>
  );
}

export default function AboutPage() {
  return (
    <main>
        <div className="px-3 pt-[146px] min-[810px]:px-5 min-[810px]:pt-[122px]">
          <h1 className="text-[26px] font-medium leading-[31.2px] tracking-[-1.04px] text-foreground min-[810px]:text-[28px] min-[810px]:leading-[33.6px] min-[810px]:tracking-[-1.12px]">
            About
          </h1>
        </div>

        <div className="flex flex-col gap-7 px-3 pt-7 text-[14px] leading-[18.2px] tracking-[0.14px] text-foreground min-[810px]:hidden">
          <div className="flex flex-col gap-[17px]">
            <p>Hello again!</p>
            <p>
              My name is Yutong Zhen. I am a interaction designer interested in
              translating the expanding role of technology into intuitive,
              meaningful, and fun user interfaces.
            </p>
            <p>
              Currently, I&apos;m studying <StudyLinks />
            </p>
            <p>
              Outside of studio, I enjoy traveling around the world searching
              for good food, and taking photos on my Fujifilm X-S20.
            </p>
          </div>
          <div className="relative aspect-[3/2] w-full overflow-hidden">
            <Image
              src="/media/about/hero.jpg"
              alt="Yutong Zhen standing in the snow"
              width={2048}
              height={1365}
              priority
              className="h-full w-full object-cover"
              sizes="100vw"
              quality={95}
            />
          </div>
        </div>

        <div className="hidden px-5 pt-5 min-[810px]:grid min-[810px]:grid-cols-2 min-[810px]:gap-5">
          <div className="relative aspect-[3/2] w-full overflow-hidden">
            <Image
              src="/media/about/hero.jpg"
              alt="Yutong Zhen standing in the snow"
              width={2048}
              height={1365}
              priority
              className="h-full w-full object-cover"
              sizes="50vw"
              quality={95}
            />
          </div>

          <div className="grid grid-cols-3 gap-5 text-[14px] leading-[18.2px] tracking-[0.14px] text-foreground">
            <p>Hello again!</p>
            <div className="flex flex-col gap-5">
              <p>
                My name is Yutong Zhen. I am a interaction designer interested
                in translating the expanding role of technology into intuitive,
                meaningful, and fun user interfaces.
              </p>
              <p>
                Currently, I&apos;m studying <StudyLinks />
              </p>
            </div>
            <p>
              Outside of studio, I enjoy traveling around the world searching
              for good food, and taking photos on my Fujifilm X-S20.
            </p>
          </div>
        </div>

        <section className="hidden px-5 pt-[99px] min-[810px]:block">
          <RecentTravelsMark />
          <div className="mt-3 grid grid-cols-2 gap-5">
            <div className="flex flex-col gap-5">
              {TRAVEL_LEFT.map((photo) => (
                <TravelPhoto key={photo.src} {...photo} />
              ))}
            </div>
            <div className="flex flex-col gap-5">
              {TRAVEL_RIGHT.map((photo) => (
                <TravelPhoto key={photo.src} {...photo} />
              ))}
            </div>
          </div>
        </section>
    </main>
  );
}
