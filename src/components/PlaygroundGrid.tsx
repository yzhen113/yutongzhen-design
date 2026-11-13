import Image from "next/image";
import { AutoplayVideo } from "@/components/AutoplayVideo";
import { playgroundColumns, type PlaygroundItem } from "@/lib/playground";

function PlaygroundCard({
  item,
  priority = false,
}: {
  item: PlaygroundItem;
  priority?: boolean;
}) {
  return (
    <figure className="group relative w-full overflow-hidden">
      {item.media.type === "video" ? (
        <AutoplayVideo
          className="block h-auto w-full"
          src={item.media.src}
          width={item.media.width}
          height={item.media.height}
          preload={priority ? "auto" : "metadata"}
          aria-label={item.alt}
        />
      ) : (
        <Image
          src={item.media.src}
          alt={item.alt}
          width={item.media.width}
          height={item.media.height}
          className="h-auto w-full"
          sizes="(max-width: 1099px) 100vw, 33vw"
          quality={95}
          priority={priority}
        />
      )}

      {item.title ? (
        <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] flex translate-y-full flex-col gap-1 p-4 text-[14px] leading-[18.2px] tracking-[0.14px] text-white transition-[translate] duration-[400ms] ease-[cubic-bezier(0.44,0,0.56,1)] group-hover:translate-y-0 motion-reduce:translate-y-0">
          <p>{item.title}</p>
          {item.caption ? <p className="opacity-80">{item.caption}</p> : null}
        </figcaption>
      ) : null}
    </figure>
  );
}

/**
 * The sidebar layout uses two columns: items keep their left-to-right reading
 * order (row by row across the original three columns) and each goes into
 * whichever column is shorter so far, using the media's own proportions.
 */
const twoColumns: PlaygroundItem[][] = (() => {
  const ordered: PlaygroundItem[] = [];
  const rows = Math.max(...playgroundColumns.map((column) => column.length));
  for (let row = 0; row < rows; row++) {
    for (const column of playgroundColumns) {
      if (column[row]) ordered.push(column[row]);
    }
  }
  const packed: PlaygroundItem[][] = [[], []];
  const heights = [0, 0];
  for (const item of ordered) {
    const target = heights[0] <= heights[1] ? 0 : 1;
    packed[target].push(item);
    heights[target] += item.media.height / item.media.width;
  }
  return packed;
})();

/**
 * `inSidebar` drops the page title and outer padding so the grid sits in the
 * sidebar layout's content column (the nav already shows the current page).
 */
export function PlaygroundGrid({ inSidebar = false }: { inSidebar?: boolean }) {
  const columns = inSidebar ? twoColumns : playgroundColumns;

  return (
    <section className="w-full">
      {inSidebar ? (
        <h1 className="sr-only">Playground</h1>
      ) : (
        <div className="px-3 pt-[140px] pb-5 min-[1100px]:px-5 min-[1100px]:pt-[160px]">
          <h1 className="text-[26px] font-medium leading-[31.2px] tracking-[-1.04px] text-foreground min-[1100px]:text-[28px] min-[1100px]:leading-[33.6px] min-[1100px]:tracking-[-1.12px]">
            Playground
          </h1>
        </div>
      )}

      <div
        className={[
          "grid grid-cols-1 gap-5",
          inSidebar ? "min-[600px]:grid-cols-2" : "px-3 min-[1100px]:grid-cols-3 min-[1100px]:px-5",
        ].join(" ")}
      >
        {columns.map((column) => (
          <div
            key={column.map((item) => item.media.src).join("-")}
            className="flex flex-col gap-5"
          >
            {column.map((item, index) => (
              <PlaygroundCard
                key={item.media.src}
                item={item}
                priority={index === 0}
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
