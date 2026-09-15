import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

import { SITE_URL } from "@/lib/seo";

export type Crumb = { label: string; to?: string };

/**
 * Fil d'Ariane. Rend également les données structurées `BreadcrumbList`
 * (affichage dans les résultats Google + compréhension de l'arborescence).
 */
export function Breadcrumbs({ items, jsonLd = true }: { items: Crumb[]; jsonLd?: boolean }) {
  const trail: Crumb[] = [{ label: "Accueil", to: "/" }, ...items];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.to ? { item: `${SITE_URL}${item.to}` } : {}),
    })),
  };

  return (
    <nav aria-label="Fil d'Ariane" className="container-page pt-8">
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
      )}
      <ol className="flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
        {trail.map((item, index) => {
          const isLast = index === trail.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1">
              {item.to && !isLast ? (
                <Link to={item.to} className="transition-colors hover:text-primary">
                  {item.label}
                </Link>
              ) : (
                <span aria-current={isLast ? "page" : undefined} className="text-foreground">
                  {item.label}
                </span>
              )}
              {!isLast && <ChevronRight className="size-3 opacity-60" aria-hidden="true" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
