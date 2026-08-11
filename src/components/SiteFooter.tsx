import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-[80px] w-full min-[1100px]:mt-[100px]">
      <div className="mx-3 h-px bg-[var(--line)] min-[1100px]:mx-5" />

      <div className="grid grid-cols-2 gap-x-5 gap-y-8 px-3 py-6 min-[1100px]:grid-cols-4 min-[1100px]:px-5 min-[1100px]:py-[25px]">
        <div className="flex flex-col gap-1">
          <p className="text-[14px] leading-[18.2px] tracking-[0.14px]">Contact</p>
          <a className="underline-link" href={`mailto:${site.email}`}>
            {site.email}
          </a>
        </div>

        <div className="flex flex-col gap-2">
          <a
            className="underline-link"
            href={site.resume}
            target="_blank"
            rel="noreferrer"
          >
            Resume
          </a>
          <a
            className="underline-link"
            href={site.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
        </div>

        <div className="flex flex-col gap-2">
          <a
            className="underline-link"
            href={site.medium}
            target="_blank"
            rel="noreferrer"
          >
            Medium
          </a>
          <a className="underline-link" href={site.x} target="_blank" rel="noreferrer">
            X
          </a>
        </div>

        <div className="flex items-start gap-1 text-foreground min-[1100px]:justify-end">
          <span className="text-[14px] leading-[18.2px] tracking-[0.14px]">©</span>
          <span
            className="text-[12px] leading-[15.6px] tracking-[-0.24px]"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            2026
          </span>
        </div>
      </div>

      <div className="h-11" />
    </footer>
  );
}
