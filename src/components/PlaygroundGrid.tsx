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

export function PlaygroundGrid() {
  return (
    <section className="w-full">
      <div className="px-3 pt-[140px] pb-5 min-[1100px]:px-5 min-[1100px]:pt-[160px]">
        <h1 className="text-[26px] font-medium leading-[31.2px] tracking-[-1.04px] text-foreground min-[1100px]:text-[28px] min-[1100px]:leading-[33.6px] min-[1100px]:tracking-[-1.12px]">
          Playground
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-5 px-3 min-[1100px]:grid-cols-3 min-[1100px]:px-5">
        {playgroundColumns.map((column) => (
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
