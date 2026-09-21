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
import { FramedDeviceVideo } from "@/components/projects/FramedDeviceVideo";
import { SiteFooter } from "@/components/SiteFooter";
import { isDasherUnlocked } from "@/lib/project-lock";

export const metadata = {
  title: "Yutong Zhen - Dasher: Building better delivery experiences",
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

export default async function DasherPage() {
  const unlocked = await isDasherUnlocked();

  return (
    <div className="flex min-h-screen flex-col overflow-x-clip bg-white">
      <CaseStudyHeader title="Dasher: Building better delivery experiences" />
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
              Dasher: Building better delivery experiences
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
            <div className="space-y-5">
              <Body>
                Today, after finishing a dash, new Dashers,{" "}
                <span className="text-[#7e7e7e]">the delivery drivers at DoorDash</span>,
                are left wondering whether they did well, how they can
                improve, and if they are making meaningful progress.
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
                  <p className="text-[14px] font-normal leading-[18.2px] tracking-[0.14px] text-foreground">
                    I was excited about my first dash, but DoorDash was not.
                  </p>
                  <p className="text-[14px] leading-[18.2px] tracking-[0.14px] text-[#7e7e7e]">
                    Prakash Rochlani · VP, Dasher &amp; Logistics
                  </p>
                </div>
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
                I designed three moments of celebrations as a connected arc
                within the Dashers first week. Hypothesizing that recognizing
                early wins would lift satisfaction and retention, and turn into
                online hours over time.
              </Body>
            </div>

            <div className="space-y-5">
              <Subhead>First dash celebration</Subhead>
              <FramedDeviceVideo
                src="/media/dasher/day-1-close-screen.mp4"
                poster="/media/dasher/day-1-close-screen-poster.png"
                alt="First dash recognition prototype"
              />
            </div>

            <div className="space-y-5">
              <Subhead>Day 2: First metric highlight</Subhead>
              <Body>
                Day two celebrates each Dasher’s strongest metric, benchmarked
                against nearby new Dashers. A plain-language headline explains what the rating measures
                and which actions drive future ratings and rewards.
              </Body>
              <FramedDeviceVideo
                src="/media/dasher/day-2-all-stats-screen.mp4"
                poster="/media/dasher/day-2-all-stats-screen-poster.png"
                alt="Day two metrics celebration prototype"
              />
            </div>

            <div className="space-y-5">
              <Subhead>Day 8: Week one recap</Subhead>
              <Body>
                The recap celebrates what the Dashers built, then gives an
                action moment to their next delivery.
              </Body>
              <FramedDeviceVideo
                src="/media/dasher/day-8-screen.mp4"
                poster="/media/dasher/day-8-screen-poster.png"
                alt="End-of-week recognition prototype"
              />
            </div>
          </section>

          <section
            id="system"
            className="scroll-mt-[32px] mt-10 space-y-5 border-t border-black/10 pt-10"
          >
            <SectionHeading>One configurable system</SectionHeading>
            <div className="space-y-10">
              <Body>
                To move quickly within engineering constraints, I designed a
                reusable SDUI framework that adapts to different milestones through
                configurable content — enabling rapid experimentation without
                building new components.
              </Body>
              <DasherConfigCard />
            </div>
          </section>

          <section
            id="motion"
            className="scroll-mt-[32px] mt-10 space-y-5 border-t border-black/10 pt-10"
          >
            <SectionHeading>Crafting the celebration</SectionHeading>
            <Body>
              Working with the same constraints, I created reusable Lottie
              animations from static brand illustrations to make each milestone
              feel rewarding without custom engineering.
            </Body>
            <DasherMotionGrid />
          </section>

          <section
            id="future"
            className="scroll-mt-[32px] mt-10 space-y-10 border-t border-black/10 pt-10"
          >
            <div className="space-y-5">
              <SectionHeading>Future designs</SectionHeading>
              <Body>
                If behavioral signals validated the pilot, the next question
                would be how this framework could grow beyond the first week and
                support Dashers throughout their full journey.
              </Body>
            </div>

            <div className="space-y-5">
              <Subhead>Beyond new Dashers</Subhead>
              <Body>
                We could extend recognition beyond new Dashers to celebrate
                meaningful milestones throughout a driver’s journey: such as a
                100th or 500th delivery, sustained quality, or long-term service.
              </Body>
              <FramedDeviceVideo
                src="/media/dasher/500th-dash-screen.mp4"
                poster="/media/dasher/500th-dash-screen-poster.png"
                alt="Confetti celebration recognizing a Dasher’s 500th dash"
              />
            </div>

            <div className="space-y-5">
              <Subhead>Extend earning goals into consumer app</Subhead>
              <Body>
                We could bring recognition into the consumer app to give
                customers more visibility into the person completing their
                delivery, and ultimately provide more opportunity for tips.
              </Body>
              <FramedDeviceVideo
                src="/media/dasher/earnings-goal-collapse-screen.mp4"
                poster="/media/dasher/earnings-goal-collapse-screen-poster.png"
                alt="Consumer app prototype showing a Dasher’s college tuition savings goal expanding and automatically collapsing during order tracking"
              />
            </div>

            <div className="space-y-5">
              <Subhead>More intrinsic motivators</Subhead>
              <Body>
                We could celebrate consecutive dash days and continued strong
                performance as streaks to help reinforce consistency and quality.
              </Body>
              <FramedDeviceVideo
                src="/media/dasher/streak-screen.mp4"
                poster="/media/dasher/streak-screen-poster.png"
                alt="Dasher prototype showing This dash earnings expanding into a four-day streak card"
              />
            </div>
          </section>

          <section
            id="outcome"
            className="scroll-mt-[32px] mt-10 space-y-5 border-t border-black/10 pt-10"
          >
            <SectionHeading>Outcome</SectionHeading>
            <Body>
              The experiment reached roughly 5% of Dashers. Nearly 40% of those
              exposed downloaded their recognition card, and the experiment showed
              statistically significant increases in online and active hours.
            </Body>
            <Body>
              These early behavioral signals suggest potential for long-term growth
              in Dasher hours, helping the Dasher Habituation team prioritize time
              and resources throughout H2 and into 2027.
            </Body>
            <Body>
              The results support investing in more moments of recognition across
              the Dasher journey, using intrinsic motivation to encourage more
              frequent, higher-quality deliveries and make dashing a more rewarding
              experience.
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
