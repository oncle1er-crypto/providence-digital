import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Section } from "@/components/Section";
import { NewsCarousel } from "@/components/NewsCarousel";
import { absoluteUrl } from "@/lib/seo";

export const Route = createFileRoute("/actualites")({
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
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/actualites") }],
  }),
  component: ActualitesPage,
});

function ActualitesPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <Section
          eyebrow="Actualités"
          title="Actualités & événements"
          description="Les temps forts de la vie de l'école, en articles, photos et vidéos courtes."
        >
          <NewsCarousel />
        </Section>
      </main>
      <Footer />
    </>
  );
}
