import Image from "next/image";
import Link from "next/link";
import { AutoplayVideo } from "@/components/AutoplayVideo";
import {
  CaseStudyHeader,
  CaseStudySidebar,
} from "@/components/projects/CaseStudyChrome";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata = {
  title: "Yutong Zhen - BUZZ Signal",
  description:
    "BUZZ Signal — a Bumble product and interaction design case study exploring intentional, location-based meetups.",
};

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

/** Light grey left rule for key sentences / principles (Framer callout) */
function Highlight({
  children,
  bold = false,
}: {
  children: React.ReactNode;
  bold?: boolean;
}) {
  return (
    <p
      className={[
        "border-l-2 border-solid border-black/10 pl-3 text-[14px] leading-[18.2px] tracking-[0.14px] text-foreground",
        bold ? "font-semibold" : "font-normal",
      ].join(" ")}
    >
      {children}
    </p>
  );
}

function Figure({
  src,
  alt,
  width,
  height,
  framed = true,
  caption,
  unoptimized,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Demo/media frames get a light border + radius; charts stay borderless */
  framed?: boolean;
  caption?: string;
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
          // Charts stay unoptimized so thin lines/type stay crisp
          unoptimized={unoptimized ?? !framed}
        />
      </div>
      {caption ? (
        <figcaption className="mt-3 text-[14px] font-normal leading-[18.2px] tracking-[0.14px] text-[#7e7e7e]">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

function VideoFigure({
  src,
  poster,
  alt,
}: {
  src: string;
  poster?: string;
  alt: string;
}) {
  return (
    <div className="w-full overflow-hidden rounded-[8px] border border-solid border-[#f2f2f2] bg-white">
      <AutoplayVideo
        className="aspect-square h-auto w-full object-cover"
        src={src}
        poster={poster}
        aria-label={alt}
        preload="metadata"
      />
    </div>
  );
}

export default function BumblePage() {
  return (
    <div className="min-h-screen overflow-x-clip bg-white">
      <CaseStudyHeader title="BUZZ Signal" />

      {/* Hero — cover video (logo included in video); phones get the static cover instead */}
      <div className="relative flex w-full items-center justify-center bg-[#f2f2f2] px-0 py-0 min-[600px]:px-4 min-[600px]:py-10 min-[1200px]:h-[620px] min-[1200px]:px-0 min-[1200px]:py-0">
        <div className="relative w-full max-w-[1020px] overflow-hidden">
          <Image
            className="aspect-[2992/1700] h-auto w-full object-contain min-[600px]:hidden"
            src="/media/bumble/cover-mobile.png"
            alt="BUZZ Signal shown on three phones: searching for a signal, the BUZZ activity feed, and walking directions to a meetup"
            width={2048}
            height={1163}
            loading="eager"
            sizes="(min-width: 600px) 1px, 100vw"
          />
          <AutoplayVideo
            className="hidden aspect-[2992/1700] h-auto w-full object-contain min-[600px]:block"
            src="/media/buzz.mp4"
            poster="/media/buzz-poster.jpg"
            preload="auto"
          />
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-[1440px] overflow-x-clip">
        {/* Sticky sidebar — desktop only (≥1200px). Bottom pad keeps gap above More projects. */}
        <aside className="pointer-events-none absolute top-0 bottom-0 left-0 hidden w-[200px] pb-10 min-[1200px]:block">
          <div className="pointer-events-auto sticky top-[52px] pt-[60px] pl-20">
            <CaseStudySidebar />
          </div>
        </aside>

        {/* Decorative bee is placed in the Solution intro */}

        <article className="mx-auto w-full max-w-[550px] px-3 pt-16 pb-0 min-[1200px]:px-0 min-[1200px]:pt-[60px]">
          <section id="overview" className="scroll-mt-[32px] space-y-5">
            <h1 className="text-[26px] font-medium leading-[31.2px] tracking-[-1.04px] text-foreground">
              BUZZ Signal
            </h1>
            <Body muted>
              Bumble is a social app designed to help people find connections
              through its dating, friendship, and professional networking modes.
              This project explores how Bumble could extend its mission through
              integrating precision location notifications.
            </Body>

            {/* Phone: values only, duration | year. ≥600px: labeled 2×2 grid */}
            <div className="flex flex-col gap-[5px] pt-2 text-[14px] leading-[18.2px] tracking-[0.14px] min-[600px]:grid min-[600px]:grid-cols-2 min-[600px]:gap-x-5 min-[600px]:gap-y-5">
              <div className="flex gap-2">
                <span className="hidden text-foreground min-[600px]:inline">
                  Client:
                </span>
                <span className="text-foreground/70">Bumble</span>
              </div>
              <div className="flex gap-2">
                <span className="hidden text-foreground min-[600px]:inline">
                  Type:
                </span>
                <span className="text-foreground/70">
                  Product, Interaction Design, iOS
                </span>
              </div>
              <div className="flex items-center min-[600px]:contents">
                <div className="flex gap-2 border-r border-[#eae9e5] pr-2.5 min-[600px]:border-0 min-[600px]:pr-0">
                  <span className="hidden text-foreground min-[600px]:inline">
                    Duration:
                  </span>
                  <span className="text-foreground/70">2 Months</span>
                </div>
                <div className="flex gap-2 pl-2.5 min-[600px]:pl-0">
                  <span className="hidden text-foreground min-[600px]:inline">
                    Year:
                  </span>
                  <span className="text-foreground/70">2025</span>
                </div>
              </div>
            </div>
          </section>

          <section id="challenge" className="scroll-mt-[32px] mt-10 border-t border-black/10 pt-10 space-y-5">
            <SectionHeading>Challenge</SectionHeading>
            <Body>
              I was given a design brief, functional specifications, and user
              data from Bumble to design a screen-based application that
              leverages precise location notifications to increase premium
              subscriptions.
            </Body>
            <Body>
              While feasible, passive alerts alone risked feeling intrusive and
              lacked the context or intent needed to spark meaningful
              connection, and so I asked:
            </Body>

            <Highlight bold>
              How might we design location-based meetups that feel intentional,
              safe, and user-controlled?
            </Highlight>
          </section>

          <section id="solution" className="scroll-mt-[32px] mt-10 space-y-10 border-t border-black/10 pt-10">
            <div className="relative space-y-5">
              <h2 className="text-[22px] font-medium leading-[26.4px] tracking-[-0.88px] text-foreground">
                Helping young adults turn online matches into casual,
                real-world connections.
              </h2>
              <div className="relative">
                <Body>
                  Based on research insights, I designed BUZZ as a feature
                  within Bumble to address declining adoption and retention
                  rates.
                </Body>
                {/* Matches Framer: 157×96, overlaps end of body line */}
                <Image
                  src="/media/bumble/bee.png"
                  alt=""
                  width={313}
                  height={191}
                  aria-hidden
                  className="pointer-events-none absolute -top-3 left-[452px] z-10 hidden h-auto w-[157px] min-[1200px]:block"
                />
              </div>
            </div>

            <div className="space-y-5">
              <Subhead>Activity-Oriented Opt-In</Subhead>
              <VideoFigure
                src="/media/bumble/create-buzz.mp4"
                poster="/media/bumble/create-buzz-poster.jpg"
                alt="Activity-oriented opt-in phone screens"
              />
              <Body>
                Users start by indicating availability for specific activities,
                then defining intent through details including availability,
                energy level, and Bumble-approved venues.
              </Body>
            </div>

            <div className="space-y-5">
              <Subhead>Map-based Discovery</Subhead>
              <Body>
                BUZZ integrates with a map feature to suggest nearby events
                started by other Bumble users around the area.
              </Body>
              <VideoFigure
                src="/media/bumble/match.mp4"
                poster="/media/bumble/match-poster.jpg"
                alt="Match confirmation animation"
              />
              <VideoFigure
                src="/media/bumble/map.mp4"
                poster="/media/bumble/map-poster.jpg"
                alt="Map-based discovery interface"
              />
              <Body>
                From match to navigation, users select and show up in person all
                within one app, lowering barriers to action and increasing
                follow-through from intent to meetup.
              </Body>
              <Figure
                src="/media/bumble/map-discovery.png"
                alt="Map discovery and navigation screens"
                width={5812}
                height={4820}
              />
            </div>

            <div className="space-y-5">
              <Subhead>Real-Time Notifications</Subhead>
              <Body>
                When users agree on an activity, BUZZ activates a Dynamic Island
                live activity that shows each participant’s real-time progress
                toward the meetup location.
              </Body>
              <VideoFigure
                src="/media/bumble/dynamic-island.mp4"
                poster="/media/bumble/dynamic-island-poster.jpg"
                alt="Dynamic Island live activity demo"
              />
              <Body>
                The same information is translated to a lock screen widget that
                shows live meetup status and participant progress at a glance.
              </Body>
              <Figure
                src="/media/bumble/notifications.png"
                alt="Lock screen and Dynamic Island live activity"
                width={5504}
                height={2460}
              />
            </div>

            <div className="space-y-5">
              <Subhead>Auto-Generated BUZZ Moments</Subhead>
              <Body>
                I extended this concept further by exploring how AI integration
                could reduce friction.
              </Body>
              <Figure
                src="/media/bumble/ai-moments.png"
                alt="Auto-generated BUZZ moments"
                width={4820}
                height={4820}
              />
              <Body>
                Here, by linking their calendar, BUZZ detects open time windows
                and suggests context-aware activities at the right moment.
                Instead of starting from scratch, users receive an auto-populated
                BUZZ ready to review and send.
              </Body>
            </div>
          </section>

          <section id="research" className="scroll-mt-[32px] mt-10 border-t border-black/10 pt-10 space-y-5">
            <SectionHeading>Research</SectionHeading>
            <Body>
              Before designing, I analyzed users, competitors, and existing
              data.
            </Body>

            <Figure
              src="/media/bumble/research-table.png"
              alt="Proximity Alert adoption and retention data table"
              width={9280}
              height={4352}
              unoptimized
              caption="Adoption, retention, and engagement data from existing Bumble features, including Proximity Alerts and Map Integration."
            />

            <Body>Here are some key takeaways:</Body>

            <div className="space-y-5">
              <Figure
                src="/media/bumble/research-1.png"
                alt="Research insight chart showing retention decline"
                width={2200}
                height={999}
                framed={false}
              />
              <Highlight>
                Passive proximity alerts were not enough to sustain ongoing
                engagement.
              </Highlight>
              <Body>
                BUZZ addresses this by making interactions activity-driven:
                shifted from &quot;nearby&quot; alerts to shared activities to
                drive repeat engagement.
              </Body>
            </div>

            <div className="space-y-5">
              <Figure
                src="/media/bumble/research-2.png"
                alt="BFF users convert best insight"
                width={2200}
                height={1035}
                framed={false}
              />
              <Highlight>BFF Users Convert Best</Highlight>
              <Body>
                BUZZ optimizes the flow for casual, spontaneous fun rather than
                professional networking.
              </Body>
            </div>
          </section>

          <section id="explorations" className="scroll-mt-[32px] mt-10 space-y-10 border-t border-black/10 pt-10">
            <div className="space-y-5">
              <SectionHeading>Design Explorations</SectionHeading>
              <Body>
                To align every decision with Bumble’s mission, I developed
                product-specific design principles:
              </Body>
              <div className="grid grid-cols-1 gap-x-5 gap-y-4 min-[600px]:grid-cols-3">
                <Highlight>User-controlled proximity</Highlight>
                <Highlight>Glanceable, low-pressure discovery</Highlight>
                <Highlight>Lower friction to real-world action</Highlight>
              </div>
            </div>
            <div className="space-y-5">
              <Subhead>Loading Screen Animation</Subhead>
              <Body>
                I used the loading screen as an opportunity to incorporate soft
                pulses &amp; gradients to create reassurance with supportive
                microcopy, helping users understand the purpose of the loading
                moment.
              </Body>
              <VideoFigure
                src="/media/bumble/loading.mp4"
                poster="/media/bumble/loading-poster.jpg"
                alt="Loading screen animation"
              />
            </div>

            <div className="space-y-5">
              <Subhead>Bottom Nav Bar</Subhead>
              <Body>
                To ensure an intuitive user flow that felt familiar and
                well-connected, I experimented with different entry points in
                the bottom navigation for BUZZ.
              </Body>
              <Figure
                src="/media/bumble/bottom-nav.png"
                alt="Bottom navigation explorations"
                width={9228}
                height={3136}
                unoptimized
              />
              <Body>
                Considering the priorities of Bumble&apos;s features and the
                already crowded existing nav bar, the first two explorations
                risk breaking the retention loop of Bumble&apos;s main matching
                feature.
              </Body>
              <Body>
                Since Discovery &amp; BUZZ serve a similar core purpose, I
                settled on this version to maintain overall visual balance and
                minimize friction change.
              </Body>
              <Figure
                src="/media/bumble/bottom-nav-chosen.png"
                alt="Final bottom navigation with Buzz selected"
                width={1024}
                height={506}
              />
            </div>

            <div className="space-y-5">
              <Subhead>Scaling Details</Subhead>
              <Body>
                Moving away from rigid scrolling, I experimented with fluid
                scaling interaction for the activity circle and slider to
                translate the dynamic energy that BUZZ facilitates into motion.
              </Body>
              <VideoFigure
                src="/media/bumble/details.mp4"
                poster="/media/bumble/details-poster.jpg"
                alt="Scaling interaction explorations"
              />
            </div>

            <div className="space-y-5">
              <Subhead>Card Layout &amp; Visual Hierarchy</Subhead>
              <Body>
                On Create a Buzz, I aimed to display the minimum information
                required for an intuitive, low-friction experience while keeping
                a high-energy interface. Here are some of my fun experiments that
                did not make it to the end.
              </Body>
              <Figure
                src="/media/bumble/card-layout.png"
                alt="Create a Buzz card layout experiments"
                width={7240}
                height={4820}
              />
              <Body>
                On Feed, my design moved from a standard list to be more dynamic
                and playful to highlight the spontaneous concept of BUZZ.
                Although visually chaotic, I had fun exploring :)
              </Body>
              <Figure
                src="/media/bumble/layouts.png"
                alt="Feed card layout explorations"
                width={7236}
                height={4608}
              />
            </div>
          </section>

          <section id="next-steps" className="scroll-mt-[32px] mt-10 space-y-5 border-t border-black/10 pt-10">
            <SectionHeading>Next Steps</SectionHeading>
            <Body>
              Consider cross-platform experiences: Android interfaces and Apple
              Watch.
            </Body>
          </section>
        </article>
      </div>

      {/* Full-width — outside case-study column / TOC sidebar */}
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
            <Link href="/projects/cmused" className="group block space-y-2">
              <div className="overflow-hidden bg-[#f5f5f5]">
                <Image
                  src="/media/cmused/project-thumbnail.png"
                  alt="CMUsed"
                  width={9372}
                  height={5324}
                  quality={100}
                  unoptimized
                  className="h-auto w-full transition-transform duration-300 ease-out group-hover:scale-105"
                />
              </div>
              <p className="text-[14px] leading-[18.2px] tracking-[0.14px]">
                CMUsed: A Student-to-Student Marketplace at Carnegie Mellon
                University
              </p>
              <p className="text-[14px] leading-[18.2px] tracking-[0.14px] text-foreground/70">
                Product Design, Web
              </p>
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
