import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CalendarDays, Play } from "lucide-react";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Section } from "@/components/Section";
import { news as fallbackNews } from "@/data/site";
import { getPublicNews, getPublicNewsBySlug, mediaPublicUrl, type NewsPost } from "@/lib/cms";
import { absoluteUrl, OG_IMAGE } from "@/lib/seo";

function toParagraphs(text: string): string[] {
  return text
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean);
}

const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

function formatDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : dateFormatter.format(date);
}

export type Article = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  paragraphs: string[];
  date: string | null;
  image?: string | undefined;
  video?: string | undefined;
};

export const Route = createFileRoute("/actualites/$slug")({
  loader: async ({ params }): Promise<{ article: Article; related: Article[] }> => {
    const slug = params.slug;
    const [cmsArticle, allNews] = await Promise.all([
      getPublicNewsBySlug(slug).catch(() => null),
      getPublicNews(12).catch(() => [] as NewsPost[]),
    ]);

    const toArticle = (item: {
      slug: string;
      title: string;
      category: string | null;
      excerpt: string | null;
      body: string;
      published_at: string | null;
      image_path: string | null;
      video_url: string | null;
    }): Article => ({
      slug: item.slug,
      title: item.title,
      category: item.category || "Actualité",
      excerpt: item.excerpt || toParagraphs(item.body)[0] || "",
      paragraphs: toParagraphs(item.body),
      date: item.published_at,
      image: mediaPublicUrl(item.image_path),
      video: item.video_url || undefined,
    });

    let article: Article | null = cmsArticle ? toArticle(cmsArticle) : null;

    if (!article) {
      const fallback = fallbackNews.find((item) => item.slug === slug);
      if (fallback) {
        article = {
          slug: fallback.slug,
          title: fallback.title,
          category: fallback.category,
          excerpt: fallback.excerpt,
          paragraphs: fallback.body,
          date: fallback.date,
          image: fallback.image,
          video: fallback.video,
        };
      }
    }

    if (!article) throw notFound();

    const related = (
      allNews.length
        ? allNews.map(toArticle)
        : fallbackNews.map((item) => ({
            slug: item.slug,
            title: item.title,
            category: item.category,
            excerpt: item.excerpt,
            paragraphs: item.body,
            date: item.date,
            image: item.image,
            video: item.video,
          }))
    )
      .filter((item) => item.slug !== article.slug)
      .slice(0, 3);

    return { article, related };
  },
  head: ({ loaderData }) => {
    const article = loaderData?.article;
    if (!article) return { meta: [{ title: "Actualité | La Providence de Don Orione" }] };

    const url = absoluteUrl(`/actualites/${article.slug}`);
    const description = article.excerpt || article.title;
    const image = article.image || OG_IMAGE.url;

    return {
      meta: [
        { title: `${article.title} | La Providence de Don Orione` },
        { name: "description", content: description },
        { property: "og:title", content: article.title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { property: "og:image", content: image },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: image },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": article.video ? "VideoObject" : "NewsArticle",
            headline: article.title,
            description,
            image: image ? [image] : undefined,
            datePublished: article.date || undefined,
            mainEntityOfPage: { "@type": "WebPage", "@id": url },
          }),
        },
      ],
    };
  },
  component: ArticlePage,
});

function ArticlePage() {
  const { article, related } = Route.useLoaderData();
  const formattedDate = article.date ? formatDate(article.date) : null;

  return (
    <>
      <Header />
      <main className="pt-20">
        <Breadcrumbs
          items={[{ label: "Actualités", to: "/actualites" }, { label: article.title }]}
        />

        <article className="container-page py-10 sm:py-14">
          <div className="mx-auto max-w-3xl">
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <span className="rounded-full bg-primary/10 px-3 py-1 font-semibold text-primary">
                {article.category}
              </span>
              {formattedDate && (
                <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                  <CalendarDays className="size-3.5" aria-hidden="true" />
                  <time dateTime={article.date ?? undefined}>{formattedDate}</time>
                </span>
              )}
            </div>

            <h1 className="mt-5 font-display text-3xl font-semibold text-balance sm:text-4xl">
              {article.title}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">{article.excerpt}</p>

            {article.image && (
              <div className="relative mt-8 overflow-hidden rounded-3xl border border-border bg-muted">
                <img
                  src={article.image}
                  alt={article.title}
                  className="aspect-[16/9] w-full object-cover"
                  loading="eager"
                  decoding="async"
                />
              </div>
            )}

            {article.video && (
              <div className="mt-8 overflow-hidden rounded-3xl border border-border bg-muted">
                <video
                  src={article.video}
                  poster={article.image}
                  controls
                  playsInline
                  preload="none"
                  className="aspect-video w-full object-cover"
                />
              </div>
            )}

            <div className="mt-8 space-y-5 text-base leading-8 text-foreground/90">
              {article.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link
                to="/actualites"
                className="btn-press rounded-full border border-border px-6 py-3 text-sm font-semibold transition-colors hover:bg-secondary"
              >
                ← Toutes les actualités
              </Link>
              <Link
                to="/admissions"
                className="btn-glow btn-press rounded-full bg-gold px-6 py-3 text-sm font-semibold text-gold-foreground"
              >
                Demander une inscription
              </Link>
            </div>
          </div>
        </article>

        {related.length > 0 && (
          <Section eyebrow="À lire aussi" title="Autres actualités">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  to="/actualites/$slug"
                  params={{ slug: item.slug }}
                  className="card-lift group overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
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
                  <div className="p-5">
                    <h3 className="font-display text-lg font-semibold">{item.title}</h3>
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                      {item.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </Section>
        )}
      </main>
      <Footer />
    </>
  );
}
