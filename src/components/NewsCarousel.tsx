import { HCarousel } from "@/components/HCarousel";
import { news } from "@/data/site";
import { Play } from "lucide-react";

export function NewsCarousel() {
  return (
    <HCarousel
      label="Actualités et événements"
      items={news.map((item) => (
        <article
          key={item.id}
          className="h-full overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
        >
          <div className="relative aspect-[4/3] overflow-hidden bg-muted">
            {item.image && (
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                decoding="async"
                className="size-full object-cover"
              />
            )}
            <span className="absolute top-3 left-3 rounded-full bg-primary/85 px-3 py-1 text-xs font-medium text-primary-foreground">
              {item.category}
            </span>
            {item.kind === "video" && (
              <span className="absolute right-3 bottom-3 grid size-10 place-items-center rounded-full bg-gold text-gold-foreground">
                <Play className="size-4" />
              </span>
            )}
          </div>
          <div className="p-5">
            <h3 className="font-display text-lg font-semibold">{item.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{item.excerpt}</p>
          </div>
        </article>
      ))}
    />
  );
}
