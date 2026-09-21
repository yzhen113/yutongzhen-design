import { site } from "@/lib/site";

export function SiteFooter({ compact = false }: { compact?: boolean }) {
  return (
    <footer
      className={
        compact ? "w-full" : "mt-[80px] w-full min-[1100px]:mt-[100px]"
      }
    >
      <div className="mx-3 h-px bg-black/10 min-[1100px]:mx-5" />

      <div className="flex flex-col gap-9 px-3 py-6 min-[1100px]:grid min-[1100px]:grid-cols-4 min-[1100px]:gap-x-5 min-[1100px]:gap-y-8 min-[1100px]:px-5 min-[1100px]:py-[25px]">
        <div className="flex flex-col gap-1">
          <p className="text-[14px] leading-[18.2px] tracking-[0.14px]">Contact</p>
          <a className="footer-link" href={`mailto:${site.email}`}>
            {site.email}
          </a>
        </div>

        <div className="flex flex-col gap-1">
          <a
            className="footer-link"
            href={site.resume}
            target="_blank"
            rel="noreferrer"
          >
            Resume
          </a>
          <a
            className="footer-link"
            href={site.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
        </div>

        <div className="flex flex-col gap-1">
          <a
            className="footer-link"
            href={site.medium}
            target="_blank"
            rel="noreferrer"
          >
            Medium
          </a>
          <a className="footer-link" href={site.x} target="_blank" rel="noreferrer">
            X
          </a>
        </div>

        <div className="flex items-start justify-end gap-1 self-end text-foreground min-[1100px]:self-auto">
          <span className="text-[14px] leading-[18.2px] tracking-[0.14px]">©</span>
          <span
            className="text-[12px] leading-[15.6px] tracking-[-0.24px]"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            2026
          </span>
        </div>
      </div>

      {compact ? null : <div className="h-11" />}
    </footer>
  );
}
