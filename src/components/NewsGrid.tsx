import { useMemo, useState } from "react";

import { NewsCardView, type NewsCardItem } from "@/components/NewsCardView";

const ALL = "Toutes";

/** Grille d'actualités avec filtres par catégorie. */
export function NewsGrid({ items }: { items: NewsCardItem[] }) {
  const categories = useMemo(
    () => [ALL, ...Array.from(new Set(items.map((item) => item.category)))],
    [items],
  );
  const [active, setActive] = useState<string>(ALL);

  const filtered = active === ALL ? items : items.filter((item) => item.category === active);

  if (!items.length) {
    return (
      <p className="rounded-2xl border border-dashed border-border bg-card/50 p-8 text-center text-sm text-muted-foreground">
        Aucune actualité publiée pour le moment. Les temps forts de l'école seront bientôt en ligne.
      </p>
    );
  }

  return (
    <div>
      <div
        className="flex flex-wrap items-center gap-2"
        role="group"
        aria-label="Filtrer les actualités"
      >
        {categories.map((category) => {
          const isActive = category === active;
          const count =
            category === ALL
              ? items.length
              : items.filter((item) => item.category === category).length;

          return (
            <button
              key={category}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActive(category)}
              className={`btn-press rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none ${
                isActive
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:bg-secondary"
              }`}
            >
              {category}
              <span className={isActive ? "ml-1.5 opacity-70" : "ml-1.5 opacity-60"}>{count}</span>
            </button>
          );
        })}
      </div>

      <p aria-live="polite" className="mt-4 text-sm text-muted-foreground">
        {filtered.length} actualité{filtered.length > 1 ? "s" : ""}
        {active !== ALL ? ` dans « ${active} »` : ""}
      </p>

      {filtered.length ? (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <NewsCardView key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <p className="mt-6 rounded-2xl border border-dashed border-border bg-card/50 p-8 text-center text-sm text-muted-foreground">
          Aucune actualité dans cette catégorie pour le moment.
        </p>
      )}
    </div>
  );
}
