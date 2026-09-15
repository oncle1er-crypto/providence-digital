import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Carrousel horizontal accessible : scroll natif (swipe mobile),
 * flèches et pagination synchronisées, navigation au clavier (flèches ← →).
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

  const step = useCallback(
    (direction: 1 | -1) => {
      setActive((current) => {
        const next = Math.min(items.length - 1, Math.max(0, current + direction));
        if (next !== current) scrollToIndex(next);
        return next;
      });
    },
    [items.length, scrollToIndex],
  );

  return (
    <div
      className="relative"
      role="group"
      aria-roledescription="carrousel"
      aria-label={label}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") {
          event.preventDefault();
          step(1);
        } else if (event.key === "ArrowLeft") {
          event.preventDefault();
          step(-1);
        }
      }}
    >
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

      <p aria-live="polite" className="sr-only">
        Élément {active + 1} sur {items.length} — {label}
      </p>

      <div className="mt-4 flex items-center justify-between gap-4">
        <div className="flex gap-2" aria-label={`Pagination — ${label}`}>
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-current={i === active ? "true" : undefined}
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
            disabled={active === 0}
            onClick={() => step(-1)}
            className="grid size-11 place-items-center rounded-full border border-border transition-colors hover:bg-secondary disabled:pointer-events-none disabled:opacity-40 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            aria-label="Élément suivant"
            disabled={active >= items.length - 1}
            onClick={() => step(1)}
            className="grid size-11 place-items-center rounded-full border border-border transition-colors hover:bg-secondary disabled:pointer-events-none disabled:opacity-40 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
