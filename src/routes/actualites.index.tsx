import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { NewsGrid } from "@/components/NewsGrid";
import { Section } from "@/components/Section";
import { getPublicNews } from "@/lib/cms";
import { toNewsCardItems } from "@/lib/news";
import { absoluteUrl, OG_IMAGE } from "@/lib/seo";

export const Route = createFileRoute("/actualites/")({
  loader: () => getPublicNews(50).catch(() => []),
  head: () => ({
    meta: [
      { title: "Actualités & événements | La Providence de Don Orione" },
      {
        name: "description",
        content:
          "Rentrée, fête de Saint Luigi Orione, sorties pédagogiques, tournois et retraites : la vie du Complexe Scolaire La Providence de Don Orione à Bonoua.",
      },
      { property: "og:title", content: "Actualités & événements — La Providence de Don Orione" },
      { property: "og:description", content: "Les temps forts de la vie de l'école à Bonoua." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absoluteUrl("/actualites") },
      { property: "og:image", content: OG_IMAGE.url },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/actualites") }],
  }),
  component: ActualitesPage,
});

function ActualitesPage() {
  const cmsNews = Route.useLoaderData();
  const items = toNewsCardItems(cmsNews);

  return (
    <>
      <Header />
      <main className="pt-20">
        <Breadcrumbs items={[{ label: "Actualités" }]} />

        <Section
          eyebrow="Actualités"
          as="h1"
          title="Actualités & événements de La Providence de Don Orione"
          description="Les temps forts de la vie de l'école, en articles, photos et vidéos courtes. Filtrez par catégorie pour retrouver un sujet."
        >
          <NewsGrid items={items} />
        </Section>
      </main>
      <Footer />
    </>
  );
}
