import Image from "next/image";
import Link from "next/link";
import {
  CaseStudyHeader,
  CaseStudySidebar,
  tomSections,
} from "@/components/projects/CaseStudyChrome";
import { GroceryCards } from "@/components/projects/GroceryCards";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata = {
  title: "Yutong Zhen - TOM: On-the-Go Food Management",
  description:
    "TOM — a mobile product design case study for simplifying grocery shopping and food inventory for young adults.",
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
        muted ? "text-[#7e7e7e]" : "text-foreground",
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

function VideoFigure({
  src,
  poster,
  alt,
  aspectClass = "aspect-square",
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

const FIGMA_RESEARCH =
  "https://www.figma.com/design/37ZJr14NEkopzhXfvQ25Cd/TOM-DESIGN?node-id=756-2945&t=4EIIuETHagbR70mQ-1";
const FIGMA_PROCESS =
  "https://www.figma.com/design/37ZJr14NEkopzhXfvQ25Cd/TOM-DESIGN?node-id=15-2&t=2lpHaGDpwhAifQTM-1";
const FIGMA_BROCCOLI =
  "https://www.figma.com/design/37ZJr14NEkopzhXfvQ25Cd/TOM-DESIGN?node-id=223-739&t=E6pTWYlGmWueqPLE-1";

export default function TomPage() {
  return (
    <div className="min-h-screen overflow-x-clip bg-white">
      <CaseStudyHeader title="TOM: On-the-Go Food Management" />

      <div className="relative w-full overflow-hidden bg-[#f2f2f2]">
        <Image
          src="/media/tom/cover.png"
          alt="TOM cover"
          width={9280}
          height={5272}
          priority
          quality={100}
          className="h-auto w-full object-cover"
          sizes="100vw"
        />
      </div>

      <div className="relative mx-auto w-full max-w-[1440px] overflow-x-clip">
        <aside className="pointer-events-none absolute top-0 bottom-0 left-0 hidden w-[200px] pb-10 min-[1200px]:block">
          <div className="pointer-events-auto sticky top-[52px] pt-[60px] pl-20">
            <CaseStudySidebar sections={tomSections} />
          </div>
        </aside>

        <article className="relative mx-auto w-full max-w-[550px] overflow-visible px-3 pt-16 pb-0 min-[1200px]:px-0 min-[1200px]:pt-[60px]">
          <section id="overview" className="scroll-mt-[32px] space-y-5">
            <h1 className="text-[26px] font-medium leading-[31.2px] tracking-[-1.04px] text-foreground">
              TOM: On-the-Go Food Management
            </h1>
            <Body muted>
              TOM is a mobile app designed for young adults to simplify the
              grocery shopping experience and manage food inventory with smart
              organization, reminders, and a playful, easy-to-use interface.
            </Body>

            {/* Phone: values only, duration | year. ≥600px: labeled 2×2 grid */}
            <div className="flex flex-col gap-[5px] pt-2 text-[14px] leading-[18.2px] tracking-[0.14px] min-[600px]:grid min-[600px]:grid-cols-2 min-[600px]:gap-x-5 min-[600px]:gap-y-5">
              <div className="flex gap-2">
                <span className="hidden text-foreground min-[600px]:inline">
                  Role:
                </span>
                <span className="text-[#7e7e7e]">Full-stack Designer</span>
              </div>
              <div className="flex gap-2">
                <span className="hidden text-foreground min-[600px]:inline">
                  Type:
                </span>
                <span className="text-[#7e7e7e]">
                  Product Design, User Research
                </span>
              </div>
              <div className="flex items-center min-[600px]:contents">
                <div className="flex gap-2 border-r border-[#eae9e5] pr-2.5 min-[600px]:border-0 min-[600px]:pr-0">
                  <span className="hidden text-foreground min-[600px]:inline">
                    Duration:
                  </span>
                  <span className="text-[#7e7e7e]">One Month</span>
                </div>
                <div className="flex gap-2 pl-2.5 min-[600px]:pl-0">
                  <span className="hidden text-foreground min-[600px]:inline">
                    Year:
                  </span>
                  <span className="text-[#7e7e7e]">2025</span>
                </div>
              </div>
            </div>

            <div className="hidden min-[600px]:block">
              <GroceryCards />
              <p className="mt-0 mb-5 text-[14px] font-normal leading-[18.2px] tracking-[0.14px] text-[#7e7e7e]">
                Drag them around!
              </p>
            </div>

            <div className="mt-10! space-y-5 border-t border-black/10 pt-10 min-[600px]:mt-0!">
              <SectionHeading>
                Young adults are learning to manage food as a part of growing
                up…
              </SectionHeading>
              <Body>
                Existing tools are built for people with more time: they either
                lack a seamless flow across shopping, storing, and planning, or
                are overly function-driven and misaligned with real-life
                behaviors.
              </Body>
              <Highlight>
                How might we help young adults turn the scattered chores of food
                management into a smooth and rewarding routine?
              </Highlight>
              <div className="mt-10! space-y-5">
                <p className="text-[14px] font-normal leading-[18.2px] tracking-[0.14px] text-foreground">
                  High-level goals that defined my design
                </p>
                <div className="grid grid-cols-1 gap-x-[30px] gap-y-5 min-[600px]:grid-cols-3">
                  <p className="border-l-2 border-solid border-[#eae9e5] pl-5 text-[13px] font-normal leading-[16.9px] text-foreground">
                    Bridge what users buy, have, and need.
                  </p>
                  <p className="border-l-2 border-solid border-[#eae9e5] pl-5 text-[13px] font-normal leading-[16.9px] text-foreground">
                    Combine convenience with delightful interface.
                  </p>
                  <p className="border-l-2 border-solid border-[#eae9e5] pl-5 text-[13px] font-normal leading-[16.9px] text-foreground">
                    Give users better visibility into their food.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section
            id="solution"
            className="scroll-mt-[32px] mt-10 space-y-10 border-t border-black/10 pt-10"
          >
            <div className="space-y-5">
              <SectionHeading>
                TOM streamlines grocery shopping and food tracking by turning
                shared lists into a smart inventory
              </SectionHeading>
              <Figure
                src="/media/tom/onboarding-cover.png"
                alt="TOM onboarding flow"
                width={7116}
                height={4448}
              />
            </div>

            <div className="space-y-5">
              <Subhead>On-the-go Grocery Lists</Subhead>
              <Figure
                src="/media/tom/grocery-lists.png"
                alt="On-the-go grocery list screens"
                width={5344}
                height={4448}
                unoptimized
              />
              <Body>
                Tom integrates a shop view that allows users to create
                checklists sorted by grocery stores, share with friends to edit
                in real time, and check out once purchased.
              </Body>
            </div>

            <div className="space-y-5">
              <Subhead>Inventory &amp; Freshness Tracking</Subhead>
              <Figure
                src="/media/tom/inventory.png"
                alt="Inventory and freshness tracking screens"
                width={5344}
                height={4448}
                unoptimized
              />
              <Body>
                The built-in smart inventory system keeps track of your
                checked-out grocery items and sends reminders before items
                expire.
              </Body>
            </div>
          </section>

          <section
            id="research"
            className="relative scroll-mt-[32px] mt-10 overflow-visible border-t border-b border-black/10 pt-10 pb-10"
          >
            <div className="space-y-5">
              <SectionHeading>Research</SectionHeading>
              <Body>
                We conducted interviews and sent out a survey to 20 young adults
                (ages 20–30) across the U.S. to understand how young adults manage
                food (or don’t).
              </Body>
              <Body>
                Through asking open-ended questions, we gathered information that
                addressed our users’ overarching lifestyles, food management +
                grocery shopping behaviors.
              </Body>
              <Subhead>Patterns</Subhead>
              <div className="grid grid-cols-1 gap-x-5 gap-y-6 min-[600px]:grid-cols-3">
                <div className="flex flex-col gap-2.5 border-l-2 border-solid border-[#eae9e5] pl-5">
                  <p className="text-[24px] font-medium leading-[28.8px] tracking-[-0.96px] text-foreground">
                    70%
                  </p>
                  <p className="text-[13px] font-normal leading-[16.9px] text-[#7e7e7e]">
                    reported finding expired food at home “very often” or
                    “sometimes.”
                  </p>
                </div>
                <div className="flex flex-col gap-2.5 border-l-2 border-solid border-[#eae9e5] pl-5">
                  <p className="text-[24px] font-medium leading-[28.8px] tracking-[-0.96px] text-foreground">
                    &gt; 50%
                  </p>
                  <p className="text-[13px] font-normal leading-[16.9px] text-[#7e7e7e]">
                    admitted to duplicate purchases &amp; found the process
                    frustrating.
                  </p>
                </div>
                <div className="flex flex-col gap-2.5 border-l-2 border-solid border-[#eae9e5] pl-5">
                  <p className="text-[24px] font-medium leading-[28.8px] tracking-[-0.96px] text-foreground">
                    75%
                  </p>
                  <p className="text-[13px] font-normal leading-[16.9px] text-[#7e7e7e]">
                    relied on mental notes or nothing to track lists.
                  </p>
                </div>
              </div>
              <p className="text-[14px] font-normal leading-[18.2px] tracking-[0.14px] text-[#7e7e7e]">
                Read more about user research and competitive analysis{" "}
                <Link href={FIGMA_RESEARCH} className="site-link" target="_blank">
                  here
                </Link>
                .
              </p>
            </div>
            {/* Framer: ~124×130, feet on research bottom border, hangs past column */}
            <Link
              href={FIGMA_BROCCOLI}
              target="_blank"
              aria-label="Open related Figma file"
              className="absolute right-[-114px] bottom-[-2px] z-10 hidden overflow-visible min-[1200px]:block"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/media/tom/broccoli.svg"
                alt=""
                width={126}
                height={130}
                className="h-[130px] w-[126px] max-w-none"
                aria-hidden
              />
            </Link>
          </section>

          <section
            id="explorations"
            className="scroll-mt-[32px] space-y-10 pt-10"
          >
            <SectionHeading>Design Explorations</SectionHeading>

            <div className="space-y-5">
              <Subhead>Navigating between tabs</Subhead>
              <Body>
                Before landing on the bottom navigation bar, I explored a
                card-only interaction structure for the app&apos;s core flows to
                keep a visually simple interface.
              </Body>
              <VideoFigure
                src="/media/tom/nav-explore.mp4"
                poster="/media/tom/nav-explore-poster.jpg"
                alt="Card-only navigation exploration"
              />
              <Body>
                While this approach reduced clutter, a nav bar worked better for
                switching within a single context than for moving across the
                broader product.
              </Body>
            </div>

            <div className="space-y-5">
              <Subhead>Shop List Layout Designs</Subhead>
              <Body>
                The shop function started as my personal frustration with
                documenting loose grocery lists into the notes app every time I
                go shopping. Although it was quick, there was no way to organize
                the items, resulting in a collection of messy lists and loose
                items.
              </Body>
              <Body>My design principles for this section are:</Body>
              <div className="grid grid-cols-1 gap-x-5 gap-y-4 min-[600px]:grid-cols-2">
                <Highlight>Prioritize on-the-go usage</Highlight>
                <Highlight>Incorporating core organizational methods</Highlight>
              </div>
              <Figure
                src="/media/tom/shop-layouts.png"
                alt="Shop list layout design explorations"
                width={4820}
                height={4820}
                unoptimized
              />
            </div>

            <div className="space-y-5">
              <Subhead>Data Visualizations</Subhead>
              <Body>
                Existing inventory views make it easy to check single items, but
                fail to show the bigger picture of stock and expiration. One of
                our research participants claimed,
              </Body>
              <Highlight>
                I want a high-level visual summary that highlights key categories
                and expiring categories without scanning every item.
              </Highlight>
              <VideoFigure
                src="/media/tom/data-viz.mp4"
                poster="/media/tom/data-viz-poster.jpg"
                alt="Data visualization exploration"
              />
              <Body>
                I explored representational, abstract, and elementary shapes to
                represent various food categories.
              </Body>
              <Figure
                src="/media/tom/shapes.png"
                alt="Food category shape explorations"
                width={5800}
                height={2460}
                unoptimized
              />
              <Body>
                Then, to balance playfulness with clarity, I experimented with
                various layouts to find the right balance between a &quot;fun&quot;
                aesthetic and functional data.
              </Body>
              <Figure
                src="/media/tom/viz-layouts.png"
                alt="Data visualization layout experiments"
                width={7132}
                height={4320}
                unoptimized
              />
              <Body>
                I redirected back to the abstracted food-inspired shapes for a
                more on-brand but also scalable system.
              </Body>
              <Figure
                src="/media/tom/final-shapes.png"
                alt="Final abstracted food-inspired shapes"
                width={5812}
                height={4820}
                unoptimized
              />
            </div>

            <div className="space-y-5">
              <Subhead>Branding Fun</Subhead>
              <VideoFigure
                src="/media/tom/hero.mp4"
                poster="/media/tom/hero-poster.jpg"
                alt="TOM app overview"
                aspectClass="aspect-[2472/1372]"
              />
              <div className="pt-5 pb-2.5">
                <div className="mx-auto w-[90%]">
                  <Figure
                    src="/media/tom/branding.png"
                    alt="TOM food character branding illustrations"
                    width={7139}
                    height={2699}
                    framed={false}
                    unoptimized
                  />
                </div>
              </div>
              <div className="border-y border-black/10 py-5">
                <p className="text-[14px] font-normal leading-[18.2px] tracking-[0.14px] text-[#7e7e7e]">
                  Check out my process &amp; prototypes in this{" "}
                  <Link
                    href={FIGMA_PROCESS}
                    className="site-link"
                    target="_blank"
                  >
                    Figma file
                  </Link>
                  !
                </p>
              </div>
            </div>
          </section>

          <section
            id="next-steps"
            className="scroll-mt-[32px] space-y-5 pt-10"
          >
            <SectionHeading>Next Steps</SectionHeading>
            <Body>
              While TOM remains a concept idea, we want to understand and
              quantify how it could perform in real life. The next phase will
              focus on structured user testing and data-informed interactions.
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
                  className="h-auto w-full transition-transform duration-300 ease-out group-hover:scale-105"
                />
              </div>
              <p className="text-[14px] leading-[18.2px] tracking-[0.14px]">
                Turning Toward
              </p>
              <p className="text-[14px] leading-[18.2px] tracking-[0.14px] text-foreground/70">
                Spatial Experience, Creative Tech
              </p>
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
