import Link from "next/link";

export default function PlaygroundPage() {
  return (
    <main className="px-3 py-16 min-[1100px]:px-5">
      <p className="max-w-[453px] text-[14px] leading-[18.2px] tracking-[0.14px]">
        Playground page coming next.{" "}
        <Link href="/" className="site-link">
          Back to projects
        </Link>
        .
      </p>
    </main>
  );
}
