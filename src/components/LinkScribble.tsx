/**
 * Hand-drawn underline that strokes on when its link is hovered. Same scribble
 * as the old Product / Experience tab switch, drawn at one fixed size (not
 * stretched to the link's width). The link needs the `scribble-link` class
 * (see globals.css).
 */
const SCRIBBLE =
  "M0.230469 17.5C16.8971 8.83333 97.4269 -2.23046 100.23 2.12065C103.034 6.47176 48.7305 22.6999 46.7305 17.5C45.8262 15.1489 99.2305 0.5 119.73 0.5C128.23 0.5 138.23 0.623512 139.73 3.14917C140.896 5.11096 129.445 8.14917 129.23 6.64917C128.945 4.64917 176.23 0.5 197.23 0.5C214.03 0.5 246.897 3.8334 261.23 5.5001";
// The same final stroke carried on further right, for a long link.
const LONG_TAIL = "C285 7.3 335 6.6 380 6.6";

export function LinkScribble({ variant }: { variant?: "trim" | "long" }) {
  // `trim` cuts off the right end so it runs only slightly past a short link;
  // `long` extends the tail so it reaches across a long one.
  const long = variant === "long";
  return (
    <span
      className={variant ? `link-scribble link-scribble--${variant}` : "link-scribble"}
      aria-hidden
    >
      <svg viewBox={long ? "0 0 381 20" : "0 0 262 20"} fill="none">
        <path d={long ? `${SCRIBBLE}${LONG_TAIL}` : SCRIBBLE} pathLength={1} />
      </svg>
    </span>
  );
}
