import { Link } from "@tanstack/react-router";
import { CalendarDays, Play } from "lucide-react";

import { HCarousel } from "@/components/HCarousel";
import { news } from "@/data/site";
import { mediaPublicUrl, type NewsPost } from "@/lib/cms";

type NewsCarouselProps = {
  cmsNews?: NewsPost[];
};

type NewsCard = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  image?: string | undefined;
  video?: string | undefined;
  date?: string | null;
};

const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

function formatDate(value?: string | null) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : dateFormatter.format(date);
}

export function NewsCarousel({ cmsNews = [] }: NewsCarouselProps) {
  const items: NewsCard[] = cmsNews.length
    ? cmsNews.map((item) => ({
        id: item.id,
        slug: item.slug,
        title: item.title,
        excerpt: item.excerpt || item.body,
        category: item.category || "Actualité",
        image: mediaPublicUrl(item.image_path),
        video: item.video_url || undefined,
        date: item.published_at,
      }))
    : news.map((item) => ({
        id: item.id,
        slug: item.slug,
        title: item.title,
        excerpt: item.excerpt,
        category: item.category,
        image: item.image,
        video: item.video,
        date: item.date,
      }));

  if (!items.length) {
    return (
      <p className="rounded-2xl border border-dashed border-border bg-card/50 p-8 text-center text-sm text-muted-foreground">
        Aucune actualité publiée pour le moment. Les temps forts de l'école seront bientôt en ligne.
      </p>
    );
  }

  return (
    <HCarousel
      label="Actualités et événements"
      items={items.map((item) => {
        const formattedDate = formatDate(item.date);

        return (
          <Link
            key={item.id}
            to="/actualites/$slug"
            params={{ slug: item.slug }}
            className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-lg"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-muted">
              {item.image && (
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                />
              )}
              <span className="absolute top-3 left-3 rounded-full bg-primary/85 px-3 py-1 text-xs font-medium text-primary-foreground">
                {item.category}
              </span>
              {item.video && (
                <span className="absolute right-3 bottom-3 grid size-10 place-items-center rounded-full bg-gold text-gold-foreground">
                  <Play className="size-4" aria-hidden="true" />
                </span>
              )}
            </div>
            <div className="flex flex-1 flex-col p-5">
              {formattedDate && (
                <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <CalendarDays className="size-3.5" aria-hidden="true" />
                  <time dateTime={item.date ?? undefined}>{formattedDate}</time>
                </p>
              )}
              <h3 className="mt-2 font-display text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{item.excerpt}</p>
              <span className="mt-4 text-sm font-semibold text-primary underline-offset-4 group-hover:underline">
                Lire la suite
              </span>
            </div>
          </Link>
        );
      })}
    />
  );
}
