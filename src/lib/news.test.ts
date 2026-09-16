import { describe, expect, it } from "vitest";

import type { NewsPost } from "./cms";
import { toNewsCardItems } from "./news";
import { news } from "@/data/site";

const cmsItem: NewsPost = {
  id: "1",
  slug: "une-actualite",
  title: "Une actualité",
  excerpt: null,
  body: "Corps de l'article",
  category: null,
  image_path: null,
  video_url: null,
  status: "published",
  published_at: "2026-09-01T08:00:00.000Z",
  sort_order: 0,
  created_by: null,
  updated_by: null,
  created_at: "2026-09-01T08:00:00.000Z",
  updated_at: "2026-09-01T08:00:00.000Z",
};

describe("toNewsCardItems", () => {
  it("retombe sur les actualités locales sans contenu CMS", () => {
    const items = toNewsCardItems([]);
    expect(items).toHaveLength(news.length);
    expect(items[0]?.slug).toBe(news[0]?.slug);
  });

  it("utilise le contenu du CMS lorsqu'il existe", () => {
    const items = toNewsCardItems([cmsItem]);
    expect(items).toHaveLength(1);
    expect(items[0]).toMatchObject({
      slug: "une-actualite",
      title: "Une actualité",
      category: "Actualité",
      date: "2026-09-01T08:00:00.000Z",
    });
  });

  it("retombe sur le corps quand l'extrait est vide", () => {
    const [item] = toNewsCardItems([cmsItem]);
    expect(item?.excerpt).toBe("Corps de l'article");
  });

  it("fournit toujours un slug exploitable pour la page de détail", () => {
    const items = toNewsCardItems([cmsItem]);
    for (const item of items) {
      expect(item.slug).toMatch(/^[a-z0-9-]+$/);
    }
  });
});
