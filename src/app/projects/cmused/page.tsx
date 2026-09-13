import Image from "next/image";
import Link from "next/link";
import { CaseStudyHeader } from "@/components/projects/CaseStudyChrome";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata = {
  title: "Yutong Zhen - CMUsed",
  description:
    "CMUsed is a campus marketplace designed for CMU students to easily buy and sell secondhand items within their community through verified accounts, streamlined listings, search, and direct messaging.",
};

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[22px] font-medium leading-[26.4px] tracking-[-0.88px] text-foreground">
      {children}
    </h2>
  );
}

function Subhead({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-[14px] font-semibold leading-[18.2px] tracking-[0.14px] text-foreground">
      {children}
    </h3>
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

export default function CmusedPage() {
  return (
    <div className="min-h-screen overflow-x-clip bg-white">
      <CaseStudyHeader title="CMUsed" />

      <div className="relative w-full overflow-hidden bg-[#f2f2f2]">
        <Image
          src="/media/cmused/hero.png"
          alt="CMUsed marketplace on a laptop, showing clothing and furniture listings"
          width={7029}
          height={3606}
          priority
          quality={100}
          className="h-auto w-full object-cover"
          sizes="100vw"
        />
      </div>

      <div className="relative mx-auto w-full max-w-[1440px] overflow-x-clip">
        <article className="mx-auto w-full max-w-[550px] px-3 pt-16 pb-0 min-[1200px]:px-0 min-[1200px]:pt-[60px]">
          <section id="overview" className="scroll-mt-[32px] space-y-5">
            <h1 className="text-[26px] font-medium leading-[31.2px] tracking-[-1.04px] text-foreground">
              CMUsed: A Student-to-Student Marketplace at Carnegie Mellon
              University
            </h1>
            <Body muted>
              CMUsed is a campus marketplace designed for CMU students to easily
              buy and sell secondhand items within their community through
              verified accounts, streamlined listings, search, and direct
              messaging.
            </Body>

            <div className="flex flex-col gap-[5px] pt-2 text-[14px] leading-[18.2px] tracking-[0.14px] min-[600px]:grid min-[600px]:grid-cols-2 min-[600px]:gap-x-5 min-[600px]:gap-y-5">
              <div className="flex gap-2">
                <span className="hidden text-foreground min-[600px]:inline">
                  Client:
                </span>
                <span className="text-[#7e7e7e]">BTG Product Studio</span>
              </div>
              <div className="flex gap-2">
                <span className="hidden text-foreground min-[600px]:inline">
                  Type:
                </span>
                <span className="text-[#7e7e7e]">Product Design, Web</span>
              </div>
              <div className="flex gap-2">
                <span className="hidden text-foreground min-[600px]:inline">
                  Year:
                </span>
                <span className="text-[#7e7e7e]">2025–2026</span>
              </div>
              <div className="flex gap-2">
                <span className="hidden text-foreground min-[600px]:inline">
                  Team:
                </span>
                <span className="text-[#7e7e7e]">
                  Bryan Huang, Annabelle Chow, Amy Cha, Andrea Guo
                </span>
              </div>
            </div>
          </section>
        </article>
      </div>

      <div className="relative mx-auto w-full max-w-[1440px] overflow-x-clip">
        <article className="mx-auto w-full max-w-[550px] px-3 pt-10 pb-0 min-[1200px]:px-0 min-[1200px]:pt-10">
          <section className="space-y-5 border-t border-black/10 pt-10">
            <SectionHeading>Why CMUsed?</SectionHeading>
            <Body>
              Buying and selling secondhand items is already common among CMU
              students, but these exchanges are often scattered across group
              chats, social media, and general-purpose marketplaces that
              weren&apos;t designed around the trust dynamics of a university
              community.
            </Body>
            <Body>
              CMUsed brings these exchanges into one centralized platform built
              specifically around CMU students.
            </Body>
          </section>
        </article>
      </div>

      <div className="relative mx-auto w-full max-w-[1440px] overflow-x-clip">
        <div className="mx-auto w-full max-w-[550px] px-3 pt-10 min-[1200px]:px-0">
          <div className="border-t border-black/10" />
        </div>
      </div>

      <div className="w-full bg-white px-5 pt-10">
        <div className="relative w-full overflow-hidden bg-[#f2f2f2]">
          <Image
            src="/media/cmused/screens-2.png"
            alt="CMUsed screens: product detail, discovery feed, and search with filters"
            width={20864}
            height={10316}
            quality={100}
            unoptimized
            className="h-auto w-full"
            sizes="100vw"
          />
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-[1440px] overflow-x-clip">
        <article className="mx-auto w-full max-w-[550px] px-3 pt-10 pb-5 min-[1200px]:px-0">
          <section className="space-y-5">
            <SectionHeading>
              Building the foundation for browsing
            </SectionHeading>
            <Body>
              We broke down the buyer experience into its essential moments, then
              explored how discovery, search, and item pages could work together
              to help students move seamlessly from browsing to finding the right
              item.
            </Body>
            <Subhead>layouts:</Subhead>
          </section>
        </article>
      </div>

      <div className="w-full bg-white px-5">
        <div className="relative w-full overflow-hidden bg-[#f2f2f2]">
          <Image
            src="/media/cmused/layouts-updated.png"
            alt="Layout explorations for the item page, discovery feed, and search results"
            width={20732}
            height={8888}
            quality={100}
            unoptimized
            className="h-auto w-full"
            sizes="100vw"
          />
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-[1440px] overflow-x-clip">
        <article className="mx-auto w-full max-w-[550px] px-3 pt-10 pb-10 min-[1200px]:px-0">
          <section className="space-y-5">
            <Subhead>Designing for quick decisions</Subhead>
            <Body>
              We designed the item card around the information buyers need most
              while browsing—image, item name, price, condition, and seller
              context—creating a clear hierarchy that makes listings easy to scan
              and compare at a glance.
            </Body>
            <Image
              src="/media/cmused/item-card-5.png"
              alt="Item card anatomy: condition tag, product image, name and price, and contact and save actions"
              width={3145}
              height={2516}
              quality={100}
              className="h-auto w-full"
              sizes="(max-width: 1199px) 100vw, 550px"
            />
            <Subhead>Expanding information</Subhead>
            <Body>
              The item card surfaces only what buyers need to make a quick
              decision while browsing. Once an item captures their interest, the
              product detail page expands that information, providing additional
              photos, descriptions, seller details, and other context needed to
              confidently move forward. We carried this hierarchy across mobile
              and web breakpoints.
            </Body>
          </section>
        </article>
      </div>

      <div className="w-full bg-white px-5">
        <div className="relative w-full overflow-hidden bg-[#f2f2f2]">
          <Image
            src="/media/cmused/product-detail-3.png"
            alt="CMUsed product detail pages across mobile and web breakpoints"
            width={19316}
            height={9964}
            quality={100}
            unoptimized
            className="h-auto w-full"
            sizes="100vw"
          />
        </div>
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
