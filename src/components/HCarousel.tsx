import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Carrousel horizontal accessible : scroll natif (swipe mobile),
 * flèches et pagination synchronisées.
 */
export function HCarousel({
  items,
  label,
  itemClassName = "w-[85%] sm:w-[55%] lg:w-[32%]",
}: {
  items: ReactNode[];
  label: string;
  itemClassName?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const scrollToIndex = useCallback((i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const child = track.children[i] as HTMLElement | undefined;
    if (child) track.scrollTo({ left: child.offsetLeft - track.offsetLeft, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const children = Array.from(track.children) as HTMLElement[];
      const left = track.scrollLeft + track.offsetLeft;
      let best = 0;
      let bestDist = Infinity;
      children.forEach((c, i) => {
        const d = Math.abs(c.offsetLeft - left);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });
      setActive(best);
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative" role="group" aria-roledescription="carrousel" aria-label={label}>
      <div
        ref={trackRef}
        className="-mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-5 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item, i) => (
          <div key={i} className={`${itemClassName} shrink-0 snap-start`}>
            {item}
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between gap-4">
        <div className="flex gap-2" role="tablist" aria-label={`Pagination — ${label}`}>
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`Aller à l'élément ${i + 1}`}
              onClick={() => scrollToIndex(i)}
              className="grid h-11 w-6 place-items-center focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              <span
                className={`block h-1.5 rounded-full transition-all ${
                  i === active ? "w-6 bg-gold" : "w-2.5 bg-border"
                }`}
              />
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            aria-label="Élément précédent"
            onClick={() => scrollToIndex(Math.max(0, active - 1))}
            className="grid size-11 place-items-center rounded-full border border-border transition-colors hover:bg-secondary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            aria-label="Élément suivant"
            onClick={() => scrollToIndex(Math.min(items.length - 1, active + 1))}
            className="grid size-11 place-items-center rounded-full border border-border transition-colors hover:bg-secondary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
