import Image from "next/image";
import Link from "next/link";
import {
  CaseStudyHeader,
  CaseStudySidebar,
  jamesJeanSections,
} from "@/components/projects/CaseStudyChrome";
import { CaseStudyVideo } from "@/components/projects/CaseStudyVideo";
import { ScrollShrinkCoverProvider } from "@/components/projects/ScrollShrinkCover";
import { ScrollShrinkMedia } from "@/components/projects/ScrollShrinkMedia";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata = {
  title: "Yutong Zhen - Hybrid Exhibition: James Jean x Hunt Institute",
  description:
    "A concept exhibition for the Hunt Institute for Botanical Documentation in collaboration with artist James Jean, using creative technology to open a dialogue between nature, art, and perception.",
};

const MEDIUM_WRITEUP =
  "https://medium.com/@zhenyutongg/artist-x-hunt-institute-for-botanical-garden-documentation-experience-design-43cd9dee13a8";

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[22px] font-medium leading-[26.4px] tracking-[-0.88px] text-foreground">
      {children}
    </h2>
  );
}

function Body({
  children,
  muted = false,
}: {
  children: React.ReactNode;
  muted?: boolean;
}) {
  return (
    <p
      className={[
        "text-[14px] font-normal leading-[18.2px] tracking-[0.14px]",
        muted ? "text-foreground/70" : "text-foreground",
      ].join(" ")}
    >
      {children}
    </p>
  );
}

function Subhead({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-[14px] font-semibold leading-[18.2px] tracking-[0.14px] text-foreground">
      {children}
    </h3>
  );
}

function VideoFigure({
  src,
  poster,
  alt,
  aspectClass = "aspect-video",
}: {
  src: string;
  poster?: string;
  alt: string;
  aspectClass?: string;
}) {
  return (
    <div className="w-full overflow-hidden rounded-[8px] border border-solid border-[#f2f2f2] bg-white">
      <video
        className={`${aspectClass} h-auto w-full object-cover`}
        src={src}
        poster={poster}
        aria-label={alt}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />
    </div>
  );
}

function Figure({
  src,
  alt,
  width,
  height,
  framed = true,
  unoptimized,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  framed?: boolean;
  unoptimized?: boolean;
}) {
  return (
    <figure className="w-full">
      <div
        className={
          framed
            ? "w-full overflow-hidden rounded-[8px] border border-solid border-[#f2f2f2] bg-white"
            : "w-full overflow-hidden bg-white"
        }
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="h-auto w-full"
          sizes="(max-width: 1199px) 100vw, 1100px"
          quality={100}
          unoptimized={unoptimized ?? !framed}
        />
      </div>
    </figure>
  );
}

export default function HybridExhibitionPage() {
  return (
    <div className="min-h-screen overflow-x-clip bg-white">
      <CaseStudyHeader title="Hybrid Exhibition: James Jean x Hunt Institute" />

      <div className="relative w-full overflow-hidden bg-[#f2f2f2]">
        <Image
          src="/media/james-jean/cover.png"
          alt="Botanical illustrations framed on walnut panels, with a James Jean mural glowing at the end of the corridor"
          width={9280}
          height={5272}
          priority
          quality={100}
          className="h-auto w-full object-cover"
          sizes="100vw"
        />
      </div>

      <ScrollShrinkCoverProvider>
      <div className="relative mx-auto w-full max-w-[1440px] overflow-x-clip">
        <aside className="pointer-events-none absolute top-0 bottom-0 left-0 hidden w-[200px] pb-10 min-[1200px]:block">
          <div className="pointer-events-auto sticky top-[52px] pt-[60px] pl-20">
            <CaseStudySidebar fadeUnderMedia sections={jamesJeanSections} />
          </div>
        </aside>

        <article className="relative mx-auto w-full max-w-[550px] overflow-visible px-3 pt-16 pb-0 min-[1200px]:px-0 min-[1200px]:pt-[60px]">
          <section id="overview" className="scroll-mt-[32px] space-y-5">
            <h1 className="text-[26px] font-medium leading-[31.2px] tracking-[-1.04px] text-foreground">
              Hybrid Exhibition: James Jean x Hunt Institute
            </h1>
            <Body muted>
              Over the course of a semester, I had the opportunity to design a
              concept experience within the Hunt Institute for Botanical Garden
              Documentation in collaboration with artist James Jean. Using
              creative technology, this project explores how interactive systems
              can create a dialogue between nature, art, and perception.
            </Body>

            <div className="flex flex-col gap-[5px] pt-2 text-[14px] leading-[18.2px] tracking-[0.14px] min-[600px]:grid min-[600px]:grid-cols-2 min-[600px]:gap-x-5 min-[600px]:gap-y-5">
              <div className="flex gap-2">
                <span className="hidden text-foreground min-[600px]:inline">
                  Role:
                </span>
                <span className="text-foreground/70">
                  Spatial Interaction Designer
                </span>
              </div>
              <div className="flex gap-2">
                <span className="hidden text-foreground min-[600px]:inline">
                  Type:
                </span>
                <span className="text-foreground/70">
                  Exhibition Design, Creative Tech
                </span>
              </div>
              <div className="flex items-center min-[600px]:contents">
                <div className="flex gap-2 border-r border-[#eae9e5] pr-2.5 min-[600px]:border-0 min-[600px]:pr-0">
                  <span className="hidden text-foreground min-[600px]:inline">
                    Duration:
                  </span>
                  <span className="text-foreground/70">4 months</span>
                </div>
                <div className="flex gap-2 pl-2.5 min-[600px]:pl-0">
                  <span className="hidden text-foreground min-[600px]:inline">
                    Year:
                  </span>
                  <span className="text-foreground/70">2025</span>
                </div>
              </div>
            </div>

            <div className="mt-10!">
              <Figure
                src="/media/james-jean/artwork.png"
                alt="James Jean painting of a figure walking beside a white peacock"
                width={1602}
                height={1200}
              />
            </div>
          </section>

          <section
            id="journey"
            className="scroll-mt-[32px] mt-10 space-y-5 border-t border-black/10 pt-10"
          >
            <SectionHeading>Journey</SectionHeading>
            <Body>
              This exhibition is organized into four zones — Archival,
              Transition, Dream, and Return — that move visitors from
              observation to imagination and back again.
            </Body>

            <div className="mt-10! space-y-5">
              <Subhead>Archival Zone</Subhead>
              <Body muted>
                Visitors begin their journey in a space with the Hunt
                Institute&apos;s collection of botanical illustrations on walnut
                panels along the wall, which highlights the precision and
                discipline of botanical study.
              </Body>
            </div>

            <ScrollShrinkMedia aspect={1920 / 1080}>
              <CaseStudyVideo
                src="/media/james-jean/archival.mp4"
                poster="/media/james-jean/archival-poster.jpg"
                alt="Mixed reality walkthrough of the archival zone"
                aspectClass="aspect-[1920/1080]"
                largeControls
              />
            </ScrollShrinkMedia>

            <Figure
              src="/media/james-jean/archival-zone.png"
              alt="Render of the archival corridor lined with framed botanical illustrations"
              width={1504}
              height={846}
            />

            <div className="mt-10! space-y-5">
              <Subhead>Prototype Demo</Subhead>
              <Figure
                src="/media/james-jean/prototype-demo.png"
                alt="Three storyboard panels showing a hand revealing plant species in mixed reality"
                width={9280}
                height={2280}
                framed={false}
                unoptimized
              />
              <Body muted>
                A mixed reality experience then invites visitors to discover
                plant species that later appear in James Jean&apos;s artworks —
                lotus, peonies, orchids, chrysanthemum — foreshadowing the
                dialogue ahead.
              </Body>
            </div>

            <div className="mt-10! space-y-5">
              <Subhead>Transition</Subhead>
              <Body muted>
                Moving forward, visitors enter a space where they can interact
                with James Jean&apos;s art projected across a curved surface,
                responding to gesture, proximity, and touch.
              </Body>
            </div>

            <Figure
              src="/media/james-jean/transition.png"
              alt="Visitor pointing at James Jean's art projected across a curved wall"
              width={1920}
              height={1080}
            />

            <Body muted>
              The structure itself guides the visitor forward: gradient light
              climbs upward, merging into the ceiling and illuminating the path
              toward the dream space.
            </Body>

            <Figure
              src="/media/james-jean/transition-light.png"
              alt="Curved ribbon structure with gradient light climbing toward the ceiling"
              width={1456}
              height={904}
            />

            <div className="mt-10! space-y-5">
              <Subhead>Dream Space</Subhead>
              <Body muted>
                Here, the space expands into a fully immersive environment
                shaped by James Jean&apos;s visual language.
              </Body>
            </div>

            <Figure
              src="/media/james-jean/dream.png"
              alt="Two visitors facing an immersive blue mural with a glowing aperture at its center"
              width={1920}
              height={1080}
            />

            <div className="mt-10! space-y-5">
              <Subhead>Return</Subhead>
              <Body muted>
                As visitors turn back toward the exit, a final wall showcases
                James Jean&apos;s sketchbooks — quick studies, watercolor notes,
                graphite experiments, and botanical observations that form the
                backbone of his larger works.
              </Body>
            </div>

            <Figure
              src="/media/james-jean/return.png"
              alt="Salon-style wall of James Jean's sketchbook studies viewed by two visitors"
              width={1920}
              height={1080}
            />
          </section>

          <section
            id="plan"
            className="scroll-mt-[32px] mt-10 space-y-5 border-t border-black/10 pt-10"
          >
            <SectionHeading>Spatial Overview</SectionHeading>
            <Body muted>
              The four zones mapped back onto the Hunt Institute&apos;s existing
              floor plan.
            </Body>
            <Figure
              src="/media/james-jean/zones.gif"
              alt="Animated diagram highlighting the archival, transition, dream, and return zones on the gallery floor plan"
              width={800}
              height={450}
              framed={false}
              unoptimized
            />
          </section>

          <section
            id="process"
            className="scroll-mt-[32px] mt-10 space-y-5 border-t border-black/10 pt-10"
          >
            <SectionHeading>Process &amp; Prototypes</SectionHeading>
            <Body>
              I began with sketches and low-fidelity mockups to explore how
              forms and scale could guide movement in space. These early
              experiments allowed me to test how visitors might physically
              approach, touch, and move through the space before introducing any
              digital interactions.
            </Body>

            <Figure
              src="/media/james-jean/floor-plan.jpg"
              alt="Annotated floor plan sketch marking walnut paneling, the hanging structure, and the interactive zones"
              width={3688}
              height={2279}
            />
            <Figure
              src="/media/james-jean/sketches.jpg"
              alt="Perspective sketches studying the curved interaction surface and vitrine lighting"
              width={3639}
              height={1485}
            />
            <Figure
              src="/media/james-jean/massing.png"
              alt="White clay render testing the scale of the curved wall against a human figure"
              width={2392}
              height={1373}
            />

            <div className="space-y-5">
              <Body>
                As the concept evolved, I built interactive prototypes in
                Blender, Unity, Grasshopper, sensors, and Arduino, to test how
                technology could add value into the experience.
              </Body>
              <VideoFigure
                src="/media/james-jean/light-box.mp4"
                poster="/media/james-jean/light-box-poster.jpg"
                alt="Hand approaching a light box prototype that responds with a shifting red glow"
                aspectClass="aspect-[786/470]"
              />
              <Figure
                src="/media/james-jean/sensor-rig.png"
                alt="Inside of the light box prototype, labeled with LED strips, a VCNL4010 proximity sensor, an Arduino Uno R4 Minima, and a breadboard"
                width={3057}
                height={2270}
              />
              <Figure
                src="/media/james-jean/structure.png"
                alt="Grasshopper study of the curved structure resolved into a triangulated lattice"
                width={1994}
                height={1592}
              />
            </div>

            <div className="mt-10! mb-10">
              <Body muted>
                Read more about my very lengthy design process{" "}
                <Link
                  href={MEDIUM_WRITEUP}
                  className="site-link"
                  target="_blank"
                >
                  here
                </Link>
                .
              </Body>
            </div>
          </section>

          <section
            id="reflection"
            className="scroll-mt-[32px] mt-10 space-y-5 border-t border-black/10 pt-10"
          >
            <SectionHeading>Reflection</SectionHeading>
            <Body>
              One of the biggest personal takeaways was learning to embrace
              ambiguity even when it raises existential questions sometimes :&apos;)
              Knowing that effective storytelling in spatial design comes from
              aligning interaction and narrative, rather than relying on flashy
              technology, it took a long process of repeated testing and
              ideating to narrow down a design that feels meaningful.
            </Body>
            <Body>
              Overall, this was an educational experience for me. It taught me
              how to design thoughtfully within constraints while still
              embracing the open-ended possibilities of creative technology.
            </Body>
            <Body muted>
              Thank you for tuning in. Here are some pictures from my semester
              showcase!
            </Body>

            <Figure
              src="/media/james-jean/showcase-1.jpg"
              alt="Semester showcase booth with the exhibition boards, a light box prototype, and a laptop demo"
              width={6240}
              height={4160}
            />
            <Figure
              src="/media/james-jean/showcase-2.jpg"
              alt="Yutong standing beside the showcase boards of process sketches and renders"
              width={5250}
              height={2946}
            />
          </section>
        </article>
      </div>
      </ScrollShrinkCoverProvider>

      <section className="mx-auto w-full max-w-[1440px] px-5 pt-[134px] pb-16 min-[1200px]:pb-[60px]">
        <div className="space-y-5 border-t border-black/10 pt-10">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-[26px] font-medium leading-[31.2px] tracking-[-1.04px] text-foreground">
              More projects
            </h2>
            <Link href="/" className="link-quiet text-[14px]">
              View all
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-x-5 gap-y-8 min-[700px]:grid-cols-2">
            <Link href="/projects/bumble" className="group block space-y-2">
              <div className="overflow-hidden bg-[#f5f5f5]">
                <Image
                  src="/media/buzz-cover.png"
                  alt="BUZZ Signal"
                  width={9280}
                  height={5272}
                  quality={100}
                  className="h-auto w-full transition-transform duration-300 ease-out group-hover:scale-105"
                />
              </div>
              <p className="text-[14px] leading-[18.2px] tracking-[0.14px]">
                BUZZ Signal
              </p>
              <p className="text-[14px] leading-[18.2px] tracking-[0.14px] text-foreground/70">
                Product, Interaction Design, iOS
              </p>
            </Link>
            <Link href="/projects/tom" className="group block space-y-2">
              <div className="overflow-hidden bg-[#f5f5f5]">
                <Image
                  src="/media/tom-cover.png"
                  alt="TOM"
                  width={9280}
                  height={5272}
                  quality={100}
                  className="h-auto w-full transition-transform duration-300 ease-out group-hover:scale-105"
                />
              </div>
              <p className="text-[14px] leading-[18.2px] tracking-[0.14px]">
                TOM: On-the-Go Food Management
              </p>
              <p className="text-[14px] leading-[18.2px] tracking-[0.14px] text-foreground/70">
                Product Design, User Research
              </p>
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
