import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <SiteHeader active="About" />
      <main className="px-3 py-16 min-[1100px]:px-5">
        <p className="max-w-[453px] text-[14px] leading-[18.2px] tracking-[0.14px]">
          About page coming next.{" "}
          <Link href="/" className="site-link">
            Back to projects
          </Link>
          .
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
