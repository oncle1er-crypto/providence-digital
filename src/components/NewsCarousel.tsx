import { HCarousel } from "@/components/HCarousel";
import { news } from "@/data/site";
import { mediaPublicUrl, type NewsPost } from "@/lib/cms";
import { Play } from "lucide-react";

type NewsCarouselProps = {
  cmsNews?: NewsPost[];
};

export function NewsCarousel({ cmsNews = [] }: NewsCarouselProps) {
  const items =
    cmsNews.length > 0
      ? cmsNews.map((item) => ({
          id: item.id,
          title: item.title,
          excerpt: item.excerpt || item.body,
          category: item.category || "Actualité",
          image: mediaPublicUrl(item.image_path),
          kind: item.video_url ? ("video" as const) : ("article" as const),
        }))
      : news;

  return (
    <HCarousel
      label="Actualités et événements"
      items={items.map((item) => (
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
            <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{item.excerpt}</p>
          </div>
        </article>
      ))}
    />
  );
}
