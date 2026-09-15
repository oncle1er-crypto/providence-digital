import { HCarousel } from "@/components/HCarousel";
import { NewsCardView } from "@/components/NewsCardView";
import { toNewsCardItems } from "@/lib/news";
import type { NewsPost } from "@/lib/cms";

type NewsCarouselProps = {
  cmsNews?: NewsPost[];
};

export function NewsCarousel({ cmsNews = [] }: NewsCarouselProps) {
  const items = toNewsCardItems(cmsNews);

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
      items={items.map((item) => (
        <NewsCardView key={item.id} item={item} />
      ))}
    />
  );
}
