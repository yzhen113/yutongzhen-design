import Image from "next/image";
import Link from "next/link";
import { CaseStudyHeader } from "@/components/projects/CaseStudyChrome";
import { BehindScenesFigure } from "@/components/projects/BehindScenesFigure";
import { CaseStudyVideo } from "@/components/projects/CaseStudyVideo";
import { ScrollShrinkMedia } from "@/components/projects/ScrollShrinkMedia";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata = {
  title: "Yutong Zhen - Turning Toward",
  description:
    "Turning Toward — a spatial experience and creative tech case study exploring how body orientation shapes personal and shared soundscapes in home workspaces.",
};

const NOTION_RESEARCH =
  "https://www.notion.so/Studio-Home-User-Research-2f422b491e22805698d6f2b054c0e984?source=copy_link";

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

function Accent({ children }: { children: React.ReactNode }) {
  return <span className="text-[var(--nav-active)]">{children}</span>;
}

function IconPeople() {
  return (
    <svg
      viewBox="0 0 49.599 22.529"
      className="h-[23px] w-[50px] shrink-0"
      aria-hidden
    >
      <path
        fill="currentColor"
        d="M 49.599 20.908 C 49.599 21.914 48.819 22.528 47.539 22.528 L 36.485 22.528 C 36.784 22.041 36.939 21.479 36.933 20.908 C 36.933 18.756 35.64 16.331 33.351 14.508 C 34.919 13.702 36.836 13.193 39.033 13.193 C 45.547 13.193 49.599 17.666 49.599 20.908 Z M 44.043 5.39 C 44.043 8.525 41.758 10.937 39.043 10.937 C 36.328 10.937 34.043 8.525 34.043 5.41 C 34.043 2.373 36.347 0 39.043 0 C 41.738 0 44.043 2.333 44.043 5.39 Z"
      />
      <path
        fill="currentColor"
        d="M 35.371 20.908 C 35.371 21.914 34.59 22.528 33.32 22.528 L 22.247 22.528 C 22.546 22.041 22.701 21.479 22.695 20.908 C 22.695 18.758 21.403 16.334 19.117 14.511 C 20.685 13.703 22.605 13.193 24.804 13.193 C 31.318 13.193 35.371 17.666 35.371 20.908 Z M 29.824 5.39 C 29.824 8.525 27.539 10.937 24.824 10.937 C 22.099 10.937 19.814 8.525 19.814 5.41 C 19.814 2.373 22.119 0 24.824 0 C 27.519 0 29.824 2.333 29.824 5.39 Z"
      />
      <path
        fill="currentColor"
        d="M 10.586 10.937 C 13.301 10.937 15.586 8.525 15.586 5.39 C 15.586 2.334 13.281 0 10.586 0 C 7.881 0 5.586 2.373 5.586 5.41 C 5.586 8.525 7.871 10.937 10.586 10.937 Z M 2.06 22.529 L 19.082 22.529 C 20.362 22.529 21.142 21.914 21.142 20.908 C 21.142 17.666 17.08 13.193 10.566 13.193 C 4.062 13.193 0 17.666 0 20.908 C 0 21.914 0.781 22.528 2.06 22.528 Z"
      />
    </svg>
  );
}

function IconCamera() {
  return (
    <svg
      viewBox="0 0 31.638 24.552"
      className="h-[25px] w-[32px] shrink-0"
      aria-hidden
    >
      <path
        fill="currentColor"
        d="M 26.67 9.717 C 25.802 9.717 25.097 9.012 25.097 8.133 C 25.097 7.265 25.803 6.56 26.671 6.56 C 27.539 6.56 28.255 7.265 28.255 8.133 C 28.255 9.012 27.538 9.717 26.67 9.717 Z M 3.927 24.552 L 27.711 24.552 C 30.315 24.552 31.638 23.24 31.638 20.667 L 31.638 7.003 C 31.638 4.44 30.315 3.118 27.711 3.118 L 23.927 3.118 C 22.887 3.118 22.595 2.956 21.98 2.27 L 20.91 1.069 C 20.243 0.343 19.617 0 18.304 0 L 13.179 0 C 11.867 0 11.242 0.343 10.575 1.069 L 9.507 2.27 C 8.911 2.937 8.589 3.118 7.559 3.118 L 3.927 3.118 C 1.322 3.119 0 4.441 0 7.004 L 0 20.667 C 0 23.24 1.323 24.552 3.926 24.552 Z M 15.824 20.858 C 13.929 20.864 12.109 20.114 10.769 18.772 C 9.429 17.431 8.68 15.61 8.689 13.714 C 8.678 11.817 9.425 9.993 10.765 8.65 C 12.105 7.306 13.927 6.554 15.824 6.56 C 19.789 6.56 22.959 9.728 22.959 13.713 C 22.968 15.609 22.22 17.431 20.88 18.772 C 19.54 20.114 17.72 20.865 15.824 20.859 Z M 15.824 19.153 C 18.821 19.153 21.253 16.731 21.253 13.713 C 21.258 12.27 20.689 10.884 19.67 9.862 C 18.651 8.839 17.268 8.265 15.824 8.265 C 14.38 8.262 12.993 8.836 11.972 9.859 C 10.952 10.881 10.38 12.268 10.385 13.713 C 10.384 15.156 10.957 16.541 11.977 17.561 C 12.997 18.581 14.381 19.154 15.824 19.153 Z"
      />
    </svg>
  );
}

function IconNotes() {
  return (
    <svg
      viewBox="0 0 27.558 32.31"
      className="h-[33px] w-[28px] shrink-0"
      aria-hidden
    >
      <path
        fill="currentColor"
        d="M 21.52 3.9 L 21.52 13.332 L 16.291 19.551 C 16.176 19.48 16.043 19.443 15.908 19.445 L 5.634 19.445 C 5.439 19.441 5.251 19.516 5.113 19.655 C 4.975 19.793 4.899 19.981 4.903 20.176 C 4.903 20.577 5.214 20.888 5.634 20.888 L 15.167 20.888 L 9.505 27.623 L 3.869 27.623 C 1.303 27.623 0 26.31 0 23.724 L 0 3.9 C 0 1.314 1.303 0 3.869 0 L 17.661 0 C 20.227 0 21.52 1.314 21.52 3.9 Z M 5.634 14.805 C 5.214 14.805 4.903 15.115 4.903 15.516 C 4.899 15.711 4.975 15.899 5.113 16.037 C 5.251 16.175 5.439 16.251 5.634 16.248 L 15.908 16.248 C 16.318 16.248 16.629 15.926 16.629 15.516 C 16.631 15.325 16.556 15.141 16.419 15.007 C 16.283 14.873 16.098 14.8 15.907 14.805 Z M 5.634 10.184 C 5.214 10.184 4.903 10.494 4.903 10.895 C 4.903 11.296 5.214 11.617 5.634 11.617 L 15.908 11.617 C 16.318 11.617 16.629 11.297 16.629 10.895 C 16.631 10.704 16.556 10.52 16.419 10.386 C 16.283 10.252 16.098 10.179 15.907 10.184 Z M 5.634 5.543 C 5.214 5.543 4.903 5.854 4.903 6.255 C 4.903 6.656 5.214 6.977 5.634 6.977 L 15.908 6.977 C 16.318 6.977 16.629 6.656 16.629 6.254 C 16.631 6.063 16.556 5.879 16.419 5.745 C 16.283 5.611 16.098 5.538 15.907 5.543 Z M 12.55 30.911 L 25.139 15.916 L 22.973 14.092 L 10.375 29.077 L 9.412 31.842 C 9.322 32.124 9.633 32.414 9.904 32.274 Z M 26.081 14.823 L 27.162 13.561 C 27.714 12.909 27.684 12.278 27.103 11.776 L 26.722 11.456 C 26.14 10.974 25.509 11.085 24.967 11.716 L 23.885 12.979 Z"
      />
    </svg>
  );
}

function MethodCard({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2.5 border-l-2 border-solid border-[#eae9e5] pl-5 text-[var(--nav-active)]">
      {icon}
      <p className="text-[14px] font-normal leading-[18.2px] tracking-[0.14px] text-[#7e7e7e]">
        {children}
      </p>
    </div>
  );
}

export default function TurningTowardPage() {
  return (
    <div className="min-h-screen overflow-x-clip bg-white">
      <CaseStudyHeader title="Turning Toward" />

      <div className="relative w-full overflow-hidden bg-[#f2f2f2]">
        <Image
          src="/media/turning-toward/cover.png"
          alt="Turning Toward cover"
          width={2320}
          height={1318}
          priority
          quality={100}
          className="h-auto w-full object-cover"
          sizes="100vw"
        />
      </div>

      <div className="relative mx-auto w-full max-w-[1440px]">
        <article className="relative mx-auto w-full max-w-[550px] overflow-visible px-3 pt-16 pb-0 min-[1200px]:px-0 min-[1200px]:pt-[60px]">
          <section id="overview" className="scroll-mt-[32px] space-y-5">
            <h1 className="text-[26px] font-medium leading-[31.2px] tracking-[-1.04px] text-foreground">
              Turning Toward
            </h1>
            <Body muted>
              This project explores how people orient themselves in shared home
              workspaces, proposing a concept where body orientation shapes
              personal and shared soundscapes, allowing focus zones to subtly
              expand or merge as people turn toward one another.
            </Body>

            <div className="flex flex-col gap-[5px] pt-2 text-[14px] leading-[18.2px] tracking-[0.14px] min-[600px]:grid min-[600px]:grid-cols-2 min-[600px]:gap-x-5 min-[600px]:gap-y-5">
              <div className="flex gap-2">
                <span className="hidden text-foreground min-[600px]:inline">
                  Role:
                </span>
                <span className="text-foreground/70">Spatial IxD Designer</span>
              </div>
              <div className="flex gap-2">
                <span className="hidden text-foreground min-[600px]:inline">
                  Type:
                </span>
                <span className="text-foreground/70">
                  Spatial Experience, Creative Tech
                </span>
              </div>
              <div className="flex items-center min-[600px]:contents">
                <div className="flex gap-2 border-r border-[#eae9e5] pr-2.5 min-[600px]:border-0 min-[600px]:pr-0">
                  <span className="hidden text-foreground min-[600px]:inline">
                    Duration:
                  </span>
                  <span className="text-foreground/70">2 months</span>
                </div>
                <div className="flex gap-2 pl-2.5 min-[600px]:pl-0">
                  <span className="hidden text-foreground min-[600px]:inline">
                    Year:
                  </span>
                  <span className="text-foreground/70">2026</span>
                </div>
              </div>
            </div>
          </section>

          <section
            id="context"
            className="scroll-mt-[32px] mt-10 space-y-5 border-t border-black/10 pt-10"
          >
            <SectionHeading>
              Designing Shared Home Space Through{" "}
              <Accent>Orientation</Accent>, <Accent>Proximity</Accent>, and{" "}
              <Accent>Ambient Sound</Accent>
            </SectionHeading>
            <Body>
              Remote work and study have made homes multifunctional environments
              where work, rest, and social life coexist.
            </Body>
            <Body>
              However, home spaces lack the implicit cues that help people
              indicate when someone is focused, available, or open to
              collaboration, often resulting in awkward transitions such as
              repeatedly switching headphones on and off.
            </Body>
            <div className="mt-10!">
              <ScrollShrinkMedia aspect={1920 / 1080}>
                <CaseStudyVideo
                  src="/media/turning-toward/research-method.mp4"
                  poster="/media/turning-toward/research-method-poster.jpg"
                  alt="Navigating Shared Space Through Sound"
                  aspectClass="aspect-[1920/1080]"
                  largeControls
                />
              </ScrollShrinkMedia>
            </div>
            <div className="mt-10!">
              <Body>
                Turning Toward introduces a space where people&apos;s orientation
                defines their personal and shared soundscapes. As individuals turn
                toward one another, their audio environments gradually blend,
                allowing focus zones to expand or merge into shared coworking
                atmospheres.
              </Body>
            </div>
            <Figure
              src="/media/turning-toward/concept.png"
              alt="Concept render of a shared desk with orientation-based soundscapes"
              width={1920}
              height={1080}
            />
          </section>

          <section
            id="research"
            className="scroll-mt-[32px] mt-10 space-y-10 border-t border-black/10 pt-10"
          >
            <Body>
              To better understand these dynamics at home, I developed a{" "}
              <Link
                href={NOTION_RESEARCH}
                className="site-link"
                target="_blank"
              >
                research protocol
              </Link>{" "}
              to delve further into the topic.
            </Body>

            <div className="flex flex-col gap-5 min-[600px]:gap-10">
              <SectionHeading>
                How do people orient themselves differently when sharing a home
                workspace with others?
              </SectionHeading>

              <div className="hidden grid-cols-3 gap-x-2.5 min-[600px]:grid">
                <MethodCard icon={<IconPeople />}>
                  3 rommates in shared living space
                </MethodCard>
                <MethodCard icon={<IconCamera />}>
                  capture orientation of attention /15min
                </MethodCard>
                <MethodCard icon={<IconNotes />}>
                  a short reflection on notable feelings
                </MethodCard>
              </div>

              <Body>
                From my{" "}
                <Link
                  href={NOTION_RESEARCH}
                  className="site-link"
                  target="_blank"
                >
                  research documentation
                </Link>
                , I found a few notable insights:
              </Body>
            </div>

            <div className="grid grid-cols-2 items-center gap-x-2.5 gap-y-5 min-[600px]:gap-x-5">
              <Figure
                src="/media/turning-toward/research-1.png"
                alt="Attention mapping overlays on laptop screens"
                width={1808}
                height={988}
                framed={false}
              />
              <div className="space-y-2.5">
                <Subhead>Attention and Spatial Awareness</Subhead>
                <Body>
                  In shared spaces, participants showed wider peripheral
                  awareness of others. When alone, attention was more narrowly
                  focused on task surfaces.
                </Body>
              </div>
            </div>

            <div className="grid grid-cols-2 items-center gap-x-2.5 gap-y-5 min-[600px]:gap-x-5">
              <div className="space-y-2.5">
                <Subhead>Body Doubling</Subhead>
                <Body>
                  All participants reported that, working alongside others
                  improves focus and accountability, although not actively
                  engaging in collaboration.
                </Body>
              </div>
              <Figure
                src="/media/turning-toward/research-2.png"
                alt="Two people working across from each other at a shared table"
                width={1772}
                height={988}
              />
            </div>

            <div className="grid grid-cols-2 items-center gap-x-2.5 gap-y-5 min-[600px]:gap-x-5">
              <div className="flex flex-col gap-6">
                <svg
                  viewBox="0 0 28.306 17.864"
                  className="h-[18px] w-[28px] text-[#7e7e7e]"
                  aria-hidden
                >
                  <path
                    fill="currentColor"
                    d="M 12.861 11.677 C 12.861 8.254 10.321 5.519 7.028 5.519 C 5.387 5.506 3.824 6.218 2.755 7.464 L 2.41 7.464 C 3.089 4.973 5.407 2.643 8.558 1.802 C 8.932 1.681 9.216 1.59 9.378 1.458 C 9.601 1.326 9.752 1.135 9.752 0.84 C 9.752 0.334 9.369 0 8.811 0 C 8.396 0 8.052 0.081 7.514 0.253 C 5.691 0.82 4.051 1.843 2.806 3.169 C 1.063 4.982 0 7.402 0 10.249 C 0 15.08 3.059 17.864 6.643 17.864 C 10.188 17.864 12.861 15.16 12.861 11.677 Z M 28.306 11.677 C 28.306 8.254 25.764 5.519 22.473 5.519 C 20.892 5.519 19.333 6.148 18.209 7.464 L 17.855 7.464 C 18.533 4.973 20.852 2.643 23.992 1.802 C 24.366 1.681 24.66 1.59 24.821 1.458 C 25.055 1.342 25.198 1.1 25.187 0.84 C 25.187 0.334 24.823 0 24.265 0 C 23.829 0 23.505 0.081 22.948 0.253 C 21.156 0.81 19.536 1.814 18.239 3.169 C 16.508 4.982 15.454 7.402 15.454 10.249 C 15.454 15.08 18.503 17.864 22.098 17.864 C 25.643 17.864 28.306 15.16 28.306 11.677 Z"
                  />
                </svg>
                <p className="border-l-2 border-solid border-[#eae9e5] pl-5 text-[14px] font-normal leading-[18.2px] tracking-[0.14px] text-[#7e7e7e]">
                  Sometimes I use noise canceling headphones when I want to
                  listen to music that I think my roomies may not appreciate.
                </p>
                <p className="ml-auto max-w-[92%] border-r-2 border-solid border-[#eae9e5] pr-5 text-right text-[14px] font-normal leading-[18.2px] tracking-[0.14px] text-[#7e7e7e]">
                  Shared music usually helps with productivity, kinda like cafe
                  ambience
                </p>
              </div>
              <div className="space-y-2.5">
                <Subhead>Role of Shared Sound</Subhead>
                <Body>
                  Participants frequently used shared ambient music or
                  noise-canceling headphones to manage distraction or control
                  exposure to household sounds.
                </Body>
              </div>
            </div>
          </section>

          <section
            id="solution"
            className="scroll-mt-[32px] mt-10 space-y-5 border-t border-black/10 pt-10"
          >
            <SectionHeading>
              Turning Toward:
              <br />
              Sound-Mediated Shared Space
            </SectionHeading>
            <Body>
              From my research, I propose a design for shared home spaces where
              people&apos;s orientation defines their personal/social
              soundscapes, designed for shared living spaces.
            </Body>
            <Figure
              src="/media/turning-toward/cover.png"
              alt="Turning Toward concept overview"
              width={2320}
              height={1318}
            />
            <Body muted>How this unfold in detail?</Body>
            <Figure
              src="/media/turning-toward/interaction.png"
              alt="Detailed interaction diagram for orientation-based soundscapes"
              width={11856}
              height={6877}
              framed={false}
              unoptimized
            />
          </section>

          <section
            id="process"
            className="scroll-mt-[32px] mt-10 space-y-5 border-t border-black/10 pt-10"
          >
            <SectionHeading>Process &amp; Prototyping</SectionHeading>
            <Body>
              I began exploring possible design directions through synthesizing
              research findings, quick sketches and bodystorming exercises.
            </Body>

            <Figure
              src="/media/turning-toward/process-photo.jpg"
              alt="Sketchbook spread exploring orientation and configuration for shared ambient sound"
              width={3534}
              height={2827}
            />

            <div className="mt-10! flex flex-col gap-5">
              <Subhead>Behind the scenes</Subhead>
              <Body>
                I prototyped with 3D printed objects using Unity and motion
                trackers to mirror a person&apos;s orientation in relation to
                another.
              </Body>
            </div>
            <BehindScenesFigure />
            <Body>
              Orientation experiments with motion tracked objects in the
              Spacial Experience Lab (turn volume on!) :
            </Body>
            <CaseStudyVideo
              src="/media/turning-toward/process-1.mp4"
              poster="/media/turning-toward/process-1-poster.jpg"
              alt="Process prototyping video 1"
              aspectClass="aspect-[1920/1080]"
            />
            <CaseStudyVideo
              src="/media/turning-toward/process-2.mp4"
              poster="/media/turning-toward/process-2-poster.jpg"
              alt="Process prototyping video 2"
              aspectClass="aspect-[1512/948]"
            />
          </section>

          <section
            id="reflection"
            className="scroll-mt-[32px] mt-10 space-y-5 border-t border-black/10 pt-10"
          >
            <SectionHeading>Reflection</SectionHeading>
            <Body>
              Through research and prototyping, my main objective for this
              project was to explore how to integrate designed spatial
              interaction that fits into people&apos;s existing behavior and body
              language, which emerged from my research. In the current society,
              where our homes are already filled with physical tech gadgets, this
              project explores how to design a more natural method of social
              signaling and collaboration into spatial behavior rather than
              relying on additional interfaces or explicit devices like
              noise-cancelling headphones.
            </Body>
            <Body>
              Overall, this was a meaningful project for me because it is closely
              relevant to my current living situation, where I live with other
              design students in a shared house, and we often use the living room
              as a common space. Observing how we naturally position ourselves
              while working in this environment helped me better understand how
              spatial behavior emerges in everyday life rather than in controlled
              settings.
            </Body>
          </section>
        </article>
      </div>

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
