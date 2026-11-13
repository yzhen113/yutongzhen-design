import { Suspense } from "react";
import { SidebarShell } from "@/components/SidebarShell";

/**
 * Home, Product, Experience, About and Playground share the sidebar layout.
 * Keeping it in the layout means the sidebar stays mounted between pages.
 */
export default function SidebarLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen overflow-x-clip bg-white">
      <SidebarShell>
        <Suspense fallback={null}>{children}</Suspense>
      </SidebarShell>
    </div>
  );
}
