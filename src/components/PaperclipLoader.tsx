import styles from "./PaperclipLoader.module.css";

const CLIP =
  "M54 175L124 432C131 472 148 525 200 526C250 527 272 495 268 452L216 72C210 38 186 14 152 14C116 14 94 42 95 78L88 380C87 412 108 432 138 432C168 432 188 412 187 380L182 155";

export function PaperclipLoader({ className }: { className?: string }) {
  return (
    <svg
      className={[styles.loader, className].filter(Boolean).join(" ")}
      viewBox="34 -6 258 552"
      role="progressbar"
      aria-label="Loading"
    >
      <path className={styles.track} d={CLIP} pathLength={1} />
      <path className={styles.thread} d={CLIP} pathLength={1} />
    </svg>
  );
}
