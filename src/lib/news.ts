import type { NewsCardItem } from "@/components/NewsCardView";
import { news } from "@/data/site";
import { mediaPublicUrl, type NewsPost } from "./cms";

/**
 * Normalise les actualités du CMS en cartes affichables.
 * Retombe sur les actualités locales lorsque le CMS n'a rien publié.
 */
export function toNewsCardItems(cmsNews: NewsPost[] = []): NewsCardItem[] {
  if (cmsNews.length) {
    return cmsNews.map((item) => ({
      id: item.id,
      slug: item.slug,
      title: item.title,
      excerpt: item.excerpt || item.body,
      category: item.category || "Actualité",
      image: mediaPublicUrl(item.image_path),
      video: item.video_url || undefined,
      date: item.published_at,
    }));
  }

  return news.map((item) => ({
    id: item.id,
    slug: item.slug,
    title: item.title,
    excerpt: item.excerpt,
    category: item.category,
    image: item.image,
    video: item.video,
    date: item.date,
  }));
}
