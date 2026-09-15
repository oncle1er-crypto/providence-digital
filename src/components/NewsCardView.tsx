import { Link } from "@tanstack/react-router";
import { CalendarDays, Play } from "lucide-react";

export type NewsCardItem = {
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

function formatNewsDate(value?: string | null) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : dateFormatter.format(date);
}

/** Carte d'actualité, partagée entre le carrousel de l'accueil et la grille filtrée. */
export function NewsCardView({ item, className = "" }: { item: NewsCardItem; className?: string }) {
  const formattedDate = formatNewsDate(item.date);

  return (
    <Link
      to="/actualites/$slug"
      params={{ slug: item.slug }}
      className={`group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-lg ${className}`}
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
            <time dateTime={item.date || undefined}>{formattedDate}</time>
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
}
