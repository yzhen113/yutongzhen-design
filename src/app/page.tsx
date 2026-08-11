import { ProjectGrid } from "@/components/ProjectGrid";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <SiteHeader active="Projects" />
      <main>
        <ProjectGrid />
      </main>
      <SiteFooter />
    </div>
  );
}
