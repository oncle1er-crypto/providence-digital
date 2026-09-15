import { useCallback, useState } from "react";
import { ZoomIn } from "lucide-react";

import { Lightbox, type LightboxImage } from "@/components/Lightbox";
import { useLightbox } from "@/hooks/use-lightbox";
import { Reveal } from "@/components/Reveal";
import { Parallax } from "@/components/Parallax";
import { campusGallery } from "@/data/site";

export function CampusGallery() {
  const { index, setIndex, close } = useLightbox();

  const images: LightboxImage[] = campusGallery.map((item) => ({
    src: item.src,
    title: item.title,
    text: item.text,
    alt: `${item.title} — Complexe Scolaire La Providence de Don Orione, Bonoua`,
  }));

  const onIndexChange = useCallback((next: number) => setIndex(next), [setIndex]);

  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {campusGallery.map((item, i) => (
          <Reveal
            as="figure"
            key={item.title}
            delay={i * 90}
            variant="zoom"
            className={`card-lift group overflow-hidden rounded-3xl border border-border bg-card shadow-sm ${
              i === 0 ? "lg:col-span-2" : ""
            }`}
          >
            <button
              type="button"
              onClick={() => setIndex(i)}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(i)}
              onBlur={() => setHovered(null)}
              aria-label={`Agrandir la photo : ${item.title}`}
              className="relative block w-full cursor-zoom-in focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none"
            >
              <Parallax distance={34} className={`${i === 0 ? "aspect-[16/9]" : "aspect-[4/3]"}`}>
                <img
                  src={item.src}
                  alt={`${item.title} — Complexe Scolaire La Providence de Don Orione, Bonoua`}
                  loading="lazy"
                  decoding="async"
                  className="size-full scale-[1.08] object-cover transition-transform duration-700 group-hover:scale-[1.14]"
                />
              </Parallax>
              <span
                aria-hidden="true"
                className={`pointer-events-none absolute right-3 bottom-3 grid size-10 place-items-center rounded-full bg-primary/85 text-primary-foreground transition-opacity duration-300 ${
                  hovered === i ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                }`}
              >
                <ZoomIn className="size-5" />
              </span>
            </button>
            <figcaption className="p-5">
              <h3 className="font-display text-lg font-semibold">{item.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{item.text}</p>
            </figcaption>
          </Reveal>
        ))}
      </div>

      <Lightbox images={images} index={index} onIndexChange={onIndexChange} onClose={close} />
    </>
  );
}
