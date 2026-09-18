import Image from "next/image";
import Link from "next/link";
import {
  CaseStudyHeader,
  CaseStudySidebar,
  dasherSections,
} from "@/components/projects/CaseStudyChrome";
import { DasherConfigCard } from "@/components/projects/DasherConfigCard";
import { DasherHero } from "@/components/projects/DasherHero";
import { DasherLockScreen } from "@/components/projects/DasherLockScreen";
import { DasherMotionGrid } from "@/components/projects/DasherMotionGrid";
import { AutoplayVideo } from "@/components/AutoplayVideo";
import { KudosPhone } from "@/components/projects/KudosPhone";
import { SiteFooter } from "@/components/SiteFooter";
import { isDasherUnlocked } from "@/lib/project-lock";

export const metadata = {
  title: "Yutong Zhen - Dasher: Making Dashers feel seen",
  description:
    "A DoorDash experiment on whether recognition can motivate new Dashers without paying them more.",
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

export default async function DasherPage() {
  const unlocked = await isDasherUnlocked();

  return (
    <div className="flex min-h-screen flex-col overflow-x-clip bg-white">
      <CaseStudyHeader title="Dasher: Making Dashers feel seen" />
      {unlocked ? <DasherCaseStudy /> : <DasherLockScreen />}
      <SiteFooter compact={!unlocked} />
    </div>
  );
}

function DasherCaseStudy() {
  return (
    <>
      <DasherHero />

      <div className="relative mx-auto w-full max-w-[1440px] overflow-x-clip">
        <aside className="pointer-events-none absolute top-0 bottom-0 left-0 hidden w-[200px] pb-10 min-[1200px]:block">
          <div className="pointer-events-auto sticky top-[52px] pt-[60px] pl-20">
            <CaseStudySidebar sections={dasherSections} />
          </div>
        </aside>

        <article className="mx-auto w-full max-w-[550px] px-3 pt-16 pb-0 min-[1200px]:px-0 min-[1200px]:pt-[60px]">
          <section id="overview" className="scroll-mt-[32px] space-y-5">
            <h1 className="text-[26px] font-medium leading-[31.2px] tracking-[-1.04px] text-foreground">
              Dasher: Making Dashers feel seen
            </h1>
            <Body muted>
              A 0→1 experiment exploring whether recognition and progress can
              build long-term Dasher habits without relying on monetary
              incentives.
            </Body>

            <div className="flex flex-col gap-[5px] pt-2 text-[14px] leading-[18.2px] tracking-[0.14px] min-[600px]:grid min-[600px]:grid-cols-2 min-[600px]:gap-x-5 min-[600px]:gap-y-5">
              <div className="flex gap-2">
                <span className="hidden text-foreground min-[600px]:inline">
                  Client:
                </span>
                <span className="text-foreground/70">DoorDash</span>
              </div>
              <div className="flex gap-2">
                <span className="hidden text-foreground min-[600px]:inline">
                  Type:
                </span>
                <span className="text-foreground/70">
                  Mobile, Product, B2C
                </span>
              </div>
              <div className="flex items-center min-[600px]:contents">
                <div className="flex gap-2 border-r border-[#eae9e5] pr-2.5 min-[600px]:border-0 min-[600px]:pr-0">
                  <span className="hidden text-foreground min-[600px]:inline">
                    Duration:
                  </span>
                  <span className="text-foreground/70">1 Month</span>
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
            id="challenge"
            className="scroll-mt-[32px] mt-10 space-y-5 border-t border-black/10 pt-10"
          >
            <SectionHeading>Challenge</SectionHeading>
            <Body>
              Today, after finishing a dash, new Dashers are often left
              wondering whether they did well, how they can improve, and if they
              are making meaningful progress.
            </Body>

            <div className="flex items-start gap-3 border-l-2 border-solid border-black/10 pl-3">
              <Image
                src="/media/dasher/prakash.png"
                alt=""
                width={160}
                height={160}
                quality={100}
                sizes="40px"
                unoptimized
                className="size-10 shrink-0 rounded-full object-cover"
              />
              <div className="space-y-2">
                <p className="text-[14px] leading-[18.2px] tracking-[0.14px] text-foreground">
                  I was excited about my first dash, but DoorDash was not.
                </p>
                <p className="text-[14px] leading-[18.2px] tracking-[0.14px] text-[#7e7e7e]">
                  Prakash Rochlani · VP, Dasher &amp; Logistics
                </p>
              </div>
            </div>

            <div className="mt-10!">
              <Body>
                DoorDash has traditionally motivated Dashers through extrinsic
                means. We also wanted to explore whether intrinsic recognition
                could be another way to encourage long-term engagement.
              </Body>
            </div>
          </section>

          <section
            id="solution"
            className="scroll-mt-[32px] mt-10 space-y-10 border-t border-black/10 pt-10"
          >
            <div className="space-y-5">
              <SectionHeading>
                Three moments of recognition in week one
              </SectionHeading>
              <Body>
                I designed recognition as a connected arc within the Dashers
                first week: celebrate getting started, put an early metric in
                context, then close the week with a recap that leads into the
                next dash.
              </Body>
            </div>

            <div className="space-y-5">
              <Subhead>First dash celebration</Subhead>
              <div className="w-full overflow-hidden rounded-[8px] border border-solid border-[#f2f2f2] bg-white">
                <AutoplayVideo
                  className="aspect-square h-auto w-full object-cover"
                  src="/media/dasher/day-1.mp4?v=casestudy"
                  poster="/media/dasher/day-1-poster.jpg?v=casestudy"
                  aria-label="First dash recognition prototype"
                  preload="auto"
                  playWhenVisible
                />
              </div>
            </div>

            <div className="space-y-5">
              <Subhead>Day two</Subhead>
              <Body>
                Day two celebrates their strongest metric and benchmarks it
                against nearby new Dashers, turning recognition into clear,
                actionable progress.
              </Body>
              <KudosPhone day={2} />
              <Body muted>
                Tap through: push notification → home → 96% on-time card → save
                / share.
              </Body>
            </div>

            <div className="space-y-5">
              <Subhead>End of week one</Subhead>
              <Body>
                End of week one is the decision point for whether dashing
                becomes a habit. The recap celebrates what they built, then
                gives the moment somewhere to go: the next dash gets scheduled
                right there.
              </Body>
              <KudosPhone day={7} />
              <Body muted>
                Tap through: push → home → week recap → save / share → schedule
                the next dash.
              </Body>
            </div>
          </section>

          <section
            id="system"
            className="scroll-mt-[32px] mt-10 space-y-5 border-t border-black/10 pt-10"
          >
            <SectionHeading>One configurable system</SectionHeading>
            <Body>
              Engineering was building in parallel, so I designed a reusable
              SDUI card instead of three custom celebrations. Illustration,
              headline, metric, benchmark, and action are all content slots —
              a new milestone is a payload change, not a new component.
            </Body>
            <DasherConfigCard />
            <Highlight>
              The tradeoff is per-moment art direction. Every card shares one
              layout, which bought a two-week lead time and the ability to
              change content without an app release.
            </Highlight>
          </section>

          <section
            id="motion"
            className="scroll-mt-[32px] mt-10 space-y-5 border-t border-black/10 pt-10"
          >
            <SectionHeading>Crafting the celebration</SectionHeading>
            <Body>
              To work within those same constraints, I created reusable Lottie
              animations that made each milestone feel rewarding without custom
              engineering. The cupcake, for example, had to land as a
              celebration rather than a bounce for bounce&apos;s sake: entrance,
              a short hold, then rest on the settled illustration.
            </Body>
            <DasherMotionGrid />
          </section>

          <section
            id="outcome"
            className="scroll-mt-[32px] mt-10 space-y-5 border-t border-black/10 pt-10"
          >
            <SectionHeading>Outcome</SectionHeading>
            <Body>
              The experiment went live after a two-week engineering lead time.
              Incremental Dasher hours was the north star, but a pilot was never
              expected to move it — so we watched leading indicators at 7, 14,
              and 30 days: week-one return, whether people saved the card, and
              whether recognition started to feel like pressure.
            </Body>
            <Highlight>
              The Dx achievement recognition work has surprised us all. We&apos;ve
              exposed the experiment to roughly 5% of Dx and nearly 40% of them
              download the image asset. It&apos;s also shown a statistically
              significant increase in online hours and active hours.
            </Highlight>
            <p className="text-[14px] leading-[18.2px] tracking-[0.14px] text-[#7e7e7e]">
              Manager, after the experiment launched
            </p>
            <Body>
              What I would keep: a connected system, not one celebration, and
              cards that reflect real work rather than badges or streaks. What I
              would refine: giving each milestone a little more visual identity
              without giving up the configurable shell that made the experiment
              possible.
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
    </>
  );
}
