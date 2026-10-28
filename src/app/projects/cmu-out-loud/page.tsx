import { SmoothCorners } from "@/components/SmoothCorners";
import Image from "next/image";
import Link from "next/link";
import {
  CaseStudyHeader,
  CaseStudySidebar,
  cmuOutLoudSections,
} from "@/components/projects/CaseStudyChrome";
import { CaseStudyVideo } from "@/components/projects/CaseStudyVideo";
import { ScrollShrinkCoverProvider } from "@/components/projects/ScrollShrinkCover";
import { ScrollShrinkMedia } from "@/components/projects/ScrollShrinkMedia";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata = {
  title: "Yutong Zhen - CMU Out Loud",
  description:
    "CMU Out Loud: a live outdoor experience that gives students space to feel heard and find common ground through shared messages.",
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

function Figure({
  src,
  alt,
  width,
  height,
  framed = true,
  caption,
  aspect,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  framed?: boolean;
  caption?: string;
  /** When set, crop the image to this aspect ratio (e.g. "2000 / 1650"). */
  aspect?: string;
}) {
  return (
    <figure className="w-full space-y-2">
      <SmoothCorners
        radius={framed ? 8 : 0}
        className={
          framed
            ? "w-full overflow-hidden rounded-[8px] bg-white"
            : "w-full overflow-hidden bg-white"
        }
      >
        {aspect ? (
          <div className="relative w-full" style={{ aspectRatio: aspect }}>
            <Image
              src={src}
              alt={alt}
              fill
              className="object-cover"
              sizes="(max-width: 1199px) 100vw, 1100px"
              quality={90}
            />
          </div>
        ) : (
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className="h-auto w-full"
            sizes="(max-width: 1199px) 100vw, 1100px"
            quality={90}
          />
        )}
      </SmoothCorners>
      {caption ? (
        <figcaption className="text-[13px] leading-[16.9px] tracking-[0.13px] text-foreground/60">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

function Quote({ children }: { children: React.ReactNode }) {
  return (
    <p className="border-l-2 border-solid border-[#eae9e5] pl-5 text-[14px] font-normal leading-[20px] tracking-[0.14px] text-[#7e7e7e]">
      {children}
    </p>
  );
}

export default function CmuOutLoudPage() {
  return (
    <div className="min-h-screen overflow-x-clip bg-white">
      <CaseStudyHeader title="CMU Out Loud" />

      <div className="relative -mt-[34px] h-[100svh] w-full overflow-hidden bg-[#f2f2f2]">
        <Image
          src="/media/cmu-out-loud/hero.jpg"
          alt="A student writing a message on one of the CMU Out Loud boards"
          fill
          priority
          quality={100}
          className="object-cover"
          sizes="100vw"
        />
      </div>

      <ScrollShrinkCoverProvider>
        <div className="relative mx-auto w-full max-w-[1440px] overflow-x-clip">
          <aside className="pointer-events-none absolute top-0 bottom-0 left-0 hidden w-[200px] pb-10 min-[1200px]:block">
            <div className="case-study-sidebar-pin pointer-events-auto pt-[60px] pl-20">
              <CaseStudySidebar fadeUnderMedia sections={cmuOutLoudSections} />
            </div>
          </aside>

          <article className="relative mx-auto w-full max-w-[550px] overflow-visible px-3 pt-16 pb-0 min-[1200px]:px-0 min-[1200px]:pt-[60px]">
            {/* Overview */}
            <section id="overview" className="scroll-mt-[32px] space-y-5">
              <h1 className="text-[26px] font-medium leading-[31.2px] tracking-[-1.04px] text-foreground">
                CMU Out Loud
              </h1>
              <Body muted>
                CMU Out Loud is a live outdoor experience that gives students
                space to feel heard and find common ground through shared
                messages.
              </Body>

              <div className="flex flex-col gap-[5px] pt-2 text-[14px] leading-[18.2px] tracking-[0.14px] min-[600px]:grid min-[600px]:grid-cols-2 min-[600px]:gap-x-5 min-[600px]:gap-y-5">
                <div className="flex gap-2">
                  <span className="hidden text-foreground min-[600px]:inline">
                    Team:
                  </span>
                  <span className="text-foreground/70">
                    Yutong Zhen, Jay Byun
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="hidden text-foreground min-[600px]:inline">
                    Type:
                  </span>
                  <span className="text-foreground/70">
                    Experience Design, Participatory Design, Visual Identity
                  </span>
                </div>
                <div className="flex items-center min-[600px]:contents">
                  <div className="flex gap-2 border-r border-[#eae9e5] pr-2.5 min-[600px]:border-0 min-[600px]:pr-0">
                    <span className="hidden text-foreground min-[600px]:inline">
                      Duration:
                    </span>
                    <span className="text-foreground/70">One month</span>
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

            {/* Creating Space for Campus Conversations */}
            <section
              id="conversations"
              className="scroll-mt-[32px] mt-10 space-y-5 border-t border-black/10 pt-10"
            >
              <SectionHeading>
                Creating Space for Campus Conversations
              </SectionHeading>
              <Body>
                The experience is made up of five physical message boards placed
                together in a shared campus courtyard. Each board invited
                students to respond to a different prompt, ranging from personal
                messages to campus opinions.
              </Body>

              <div className="mt-10!">
                <ScrollShrinkMedia aspect={1920 / 1080}>
                  <CaseStudyVideo
                    src="/media/cmu-out-loud/concept.mp4"
                    poster="/media/cmu-out-loud/concept-poster.jpg"
                    alt="CMU Out Loud concept video"
                    aspectClass="aspect-[1920/1080]"
                    largeControls
                  />
                </ScrollShrinkMedia>
              </div>
            </section>

            {/* Context */}
            <section
              id="context"
              className="scroll-mt-[32px] mt-10 space-y-5 border-t border-black/10 pt-10"
            >
              <SectionHeading>How did we get here?</SectionHeading>
              <Quote>
                &ldquo;Study after study tells us we are becoming lonelier, more
                isolated. Connections through a screen cannot replace time spent
                together. We believe in experiences unique enough that you want
                to discuss them with whoever is standing close by. Spaces that
                are just strange enough that you will greet them with
                &lsquo;Hello, what the heck is this?&rsquo;&rdquo;
              </Quote>
              <Body>
                We were tasked with designing an experience that people on the
                CMU campus would encounter live, outside, through joy and
                discovery.
              </Body>
            </section>

            {/* Research */}
            <section
              id="research"
              className="scroll-mt-[32px] mt-10 space-y-5 border-t border-black/10 pt-10"
            >
              <SectionHeading>Learning how strangers connect</SectionHeading>
              <Body>
                As CMU students ourselves, we began by brainstorming the
                interests, routines, and motivations that might make students
                willing to interact with someone unfamiliar. At the center of
                the whiteboard, we wrote: &ldquo;How do we get strangers to
                actually interact?&rdquo; Our ideas fell into four areas:
              </Body>

              <div className="grid grid-cols-1 gap-y-5">
                <div className="border-l-2 border-solid border-[#eae9e5] pl-4">
                  <Subhead>Discovery</Subhead>
                </div>
                <div className="border-l-2 border-solid border-[#eae9e5] pl-4">
                  <Subhead>Familiar interactions</Subhead>
                </div>
                <div className="border-l-2 border-solid border-[#eae9e5] pl-4">
                  <Subhead>Reward or exchange</Subhead>
                </div>
                <div className="border-l-2 border-solid border-[#eae9e5] pl-4">
                  <Subhead>Low-stakes participation</Subhead>
                </div>
              </div>

              <div className="mt-10! space-y-5">
                <Subhead>Beginning with co-design</Subhead>
                <Body>
                  To understand what students are naturally curious about in one
                  another, we ran a co-design session with three pairs who did
                  not previously know each other. Each pair got a different
                  conversation structure: a free-flowing chat, one supported by
                  broad topic cards, and one with a shared goal of discovering
                  three things about the other person.
                </Body>
                <Figure
                  src="/media/cmu-out-loud/process/codesign-1.jpg"
                  alt="Two students talking across a table during a co-design session"
                  width={2000}
                  height={1500}
                />
                <Body>
                  Participants looked for connection through mutual friends,
                  shared communities, majors, and reasons for being in the same
                  place. Topic cards helped only in moderation, and the pair
                  working toward a shared goal sustained the longest
                  conversation. Our takeaway: strangers didn&apos;t need more
                  topics: they needed one approachable clue that revealed a
                  shared experience and gave them a reason to keep engaging.
                </Body>
              </div>
            </section>

            {/* Explorations */}
            <section
              id="explorations"
              className="scroll-mt-[32px] mt-10 space-y-5 border-t border-black/10 pt-10"
            >
              <SectionHeading>Early explorations</SectionHeading>
              <Body>
                We began with quick sketches and bodystorming, exploring how
                physical interaction, movement, and sound might spark curiosity
                between strangers in a shared space.
              </Body>
              <div className="grid grid-cols-2 gap-x-2.5 gap-y-5 min-[600px]:gap-x-5">
                <Figure
                  src="/media/cmu-out-loud/process/early-sketch-1.jpg"
                  alt="Sketchbook spread of early concept ideas"
                  width={2000}
                  height={1650}
                  aspect="2000 / 1650"
                />
                <Figure
                  src="/media/cmu-out-loud/process/early-sketch-2.jpg"
                  alt="Exploratory sketches of early interaction concepts"
                  width={1848}
                  height={1740}
                  aspect="2000 / 1650"
                />
              </div>
              <div className="mt-10! space-y-5">
                <Subhead>Exploring physical messages</Subhead>
                <Body>
                  From there, we explored physical ways for students to exchange
                  messages, leaving notes in a shared space that others could
                  read and respond to in public.
                </Body>
                <Figure
                  src="/media/cmu-out-loud/process/moodboard.jpg"
                  alt="Moodboard of reference installations for contributing public messages"
                  width={2000}
                  height={1107}
                  caption="A moodboard from our explorations of similar message-based experiences."
                />
              </div>
            </section>

            {/* Design */}
            <section
              id="design"
              className="scroll-mt-[32px] mt-10 space-y-5 border-t border-black/10 pt-10"
            >
              <SectionHeading>Situating the experience</SectionHeading>

              <div className="space-y-5">
                <Body>
                  Fabricating several durable, human-scale cubes proved too
                  expensive, so we looked at what the campus already provided. By
                  using existing tables as the base, we only needed to build
                  lightweight, slanted writing surfaces to sit on top. A student
                  could stop, read a message, recognize something familiar, and
                  add a response.
                </Body>
                <Figure
                  src="/media/cmu-out-loud/process/site-map.jpg"
                  alt="Campus site map and photos of the courtyard we would use"
                  width={1916}
                  height={829}
                  caption="The campus courtyard and tables we chose to build on."
                />
              </div>

              <div className="mt-10! space-y-5">
                <Subhead>Arranging the experience</Subhead>
                <Body>
                  We studied different orientations for the slanted boards:
                  their visibility from approaching paths, the direction students
                  would face while writing, and whether the boards should cluster
                  or spread out. We treated the surrounding campus as part of the
                  experience rather than just a location for it.
                </Body>
                <Figure
                  src="/media/cmu-out-loud/process/orientation-studies.jpg"
                  alt="Grid of spatial studies testing board orientations in the courtyard"
                  width={1901}
                  height={964}
                />
                <Body>
                  We placed the boards in a circle with the
                  writing surfaces facing outward. Students could discover them
                  from any direction and participate without entering an enclosed
                  space or facing a crowd, while being drawn to walk around and
                  read more of what others had written.
                </Body>
                <Figure
                  src="/media/cmu-out-loud/process/circle-render.jpg"
                  alt="Render of the boards arranged in a circle in the courtyard"
                  width={2000}
                  height={1241}
                />
              </div>

              <div className="mt-10! space-y-5">
                <Subhead>Designing for continued participation</Subhead>
                <Body>
                  The installation changes as people use it. We designed the
                  structure and prompts, but students create the content and
                  decide which conversations grow. The result isn&apos;t a
                  finished display. It&apos;s a temporary record of what people
                  on campus were noticing, wondering, and appreciating at that
                  moment.
                </Body>
              </div>

              <div className="mt-10! space-y-5">
                <Subhead>Branding the experience</Subhead>
                <Body>
                  We went through four visual directions before landing on the
                  name CMU Out Loud, a playful tone that helped
                  students feel they&apos;d been given a voice. The identity uses
                  orange and white: orange to attract attention without the
                  urgency of red, and white borders to create breathing room and
                  keep focus on the handwritten responses.
                </Body>
                <Figure
                  src="/media/cmu-out-loud/process/logo.png"
                  alt="The CMU Out Loud wordmark in black and orange"
                  width={2000}
                  height={1294}
                />
                <Figure
                  src="/media/cmu-out-loud/process/visual-identity-v2.png"
                  alt="The CMU Out Loud visual identity system"
                  width={1431}
                  height={604}
                />
                <Body>
                  We printed signage to place around the area, drawing people in
                  toward the boards.
                </Body>
                <Figure
                  src="/media/cmu-out-loud/process/signage-final-1.jpg"
                  alt="Final printed signage taped to a brick wall"
                  width={2000}
                  height={1333}
                />
                <Figure
                  src="/media/cmu-out-loud/process/signage-final-2.jpg"
                  alt="Signage directing students toward the installation"
                  width={2000}
                  height={1333}
                />
              </div>
            </section>

            {/* Build */}
            <section
              id="build"
              className="scroll-mt-[32px] mt-10 space-y-5 border-t border-black/10 pt-10"
            >
              <SectionHeading>Building the boards</SectionHeading>
              <Body>
                Each campus table measured 28 by 28 inches, so we matched that
                footprint exactly, letting each board feel like an extension of
                the table. Plywood was too expensive to produce at scale, so we
                used cardboard (affordable, lightweight, and easy to transport),
                constructing each stand as a wedge with a slanted writing surface
                and laser-cut finger joints for stable assembly.
              </Body>
              <div className="grid grid-cols-2 gap-x-2.5 gap-y-5 min-[600px]:gap-x-5">
                <Figure
                  src="/media/cmu-out-loud/process/build-frames.jpg"
                  alt="Cardboard wedge frames under construction"
                  width={2000}
                  height={1500}
                />
                <Figure
                  src="/media/cmu-out-loud/process/build-wedge.jpg"
                  alt="A finished cardboard wedge stand"
                  width={2000}
                  height={1500}
                />
              </div>

              <Body>
                We also explored how to hold the marker. A protruding,
                half-rounded holder made it obvious and easy to grab, while a slit
                integrated into the base looked cleaner: a trade-off between
                visual simplicity and intuitive use.
              </Body>
              <div className="grid grid-cols-2 gap-x-2.5 gap-y-5 min-[600px]:gap-x-5">
                <Figure
                  src="/media/cmu-out-loud/process/marker-holders.jpg"
                  alt="Rounded marker holders being tested"
                  width={2000}
                  height={1500}
                />
                <Figure
                  src="/media/cmu-out-loud/process/marker-slit.jpg"
                  alt="Marker tucked into an integrated slit"
                  width={2000}
                  height={1500}
                />
              </div>

              <div className="mt-10! space-y-5">
                <Subhead>Final boards</Subhead>
                <Figure
                  src="/media/cmu-out-loud/process/final-1.jpg"
                  alt="A finished CMU Out Loud board in the courtyard with a student"
                  width={2000}
                  height={1334}
                />
                <Figure
                  src="/media/cmu-out-loud/process/final-2.jpg"
                  alt="Close-up of a board asking 'The most underrated thing at CMU is?'"
                  width={2000}
                  height={1333}
                />
              </div>

            </section>

            {/* Reflection */}
            <section
              id="reflection"
              className="scroll-mt-[32px] mt-10 space-y-5 border-t border-black/10 pt-10"
            >
              <SectionHeading>Reflections</SectionHeading>

              <div className="space-y-5">
                <Subhead>When to use technology?</Subhead>
                <Body>
                  Our process moved through responsive objects, shared paths,
                  music exchange, puzzle pieces, magnetic blocks, QR codes, a
                  projection, and finally a set of physical writing boards. Each
                  experiment helped us separate what was technologically
                  interesting from what actually served our purpose. Technology
                  can create feedback and spectacle, but it doesn&apos;t
                  automatically create a meaningful exchange.
                </Body>
                <Body>
                  There was something more human about the analog experience.
                  Students crossing campus could look up from their screens,
                  pause in front of a large board, and discover what others were
                  thinking, the changing handwriting its own form of feedback,
                  shaped by many individual voices.
                </Body>
              </div>

              <div className="mt-10! space-y-5">
                <Subhead>Working together</Subhead>
                <Body>
                  I collaborated with Jay throughout, and we often approached the
                  work from completely different perspectives. I learned that
                  collaboration is rarely as simple as dividing the work in half.
                  Before we could move forward, we had to build a shared
                  understanding of what we were making and why. Those
                  conversations forced us to articulate ideas that might otherwise
                  have stayed intuitive.
                </Body>
                <Body>
                  The final outcome was not something either of us would have made
                  alone. It emerged from negotiating differences and finding
                  common ground, much like the kind of connection we hoped CMU
                  Out Loud would create.
                </Body>
              </div>
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
            <Link
              href="/projects/turning-toward"
              className="group block space-y-2"
            >
              <div className="overflow-hidden bg-[#f5f5f5]">
                <Image
                  src="/media/turning-toward.png"
                  alt="Turning Toward"
                  width={2320}
                  height={1318}
                  quality={100}
                  className="h-auto w-full transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                />
              </div>
              <p className="text-[14px] leading-[18.2px] tracking-[0.14px]">
                Turning Toward
              </p>
              <p className="text-[14px] leading-[18.2px] tracking-[0.14px] text-foreground/70">
                Spatial Experience, Creative Tech
              </p>
            </Link>
            <Link
              href="/projects/hybrid-exhibition-james-jean"
              className="group block space-y-2"
            >
              <div className="overflow-hidden bg-[#f5f5f5]">
                <Image
                  src="/media/james-jean/cover.png"
                  alt="Hybrid Exhibition: James Jean x Hunt Institute"
                  width={2320}
                  height={1318}
                  quality={100}
                  className="h-auto w-full transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                />
              </div>
              <p className="text-[14px] leading-[18.2px] tracking-[0.14px]">
                Hybrid Exhibition: James Jean x Hunt Institute
              </p>
              <p className="text-[14px] leading-[18.2px] tracking-[0.14px] text-foreground/70">
                Exhibition Design, XR
              </p>
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
