import { Suspense } from "react";

/**
 * Home routes (/, /product, /experience) use the sidebar layout, so they skip
 * the (site) group's header and footer. Other pages keep the original chrome.
 */
export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen overflow-x-clip bg-white">
      <Suspense fallback={null}>{children}</Suspense>
    </div>
  );
}
