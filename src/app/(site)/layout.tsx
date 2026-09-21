import { Suspense } from "react";
import { ProjectsHeading } from "@/components/ProjectsHeading";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen overflow-x-clip bg-white">
      <SiteHeader />
      <ProjectsHeading />
      <Suspense fallback={null}>{children}</Suspense>
      <SiteFooter />
    </div>
  );
}
