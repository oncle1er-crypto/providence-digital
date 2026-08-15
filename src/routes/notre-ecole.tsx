import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Section } from "@/components/Section";
import { LevelCards } from "@/components/LevelCards";
import { values } from "@/data/site";

export const Route = createFileRoute("/notre-ecole")({
  head: () => ({
    meta: [
      { title: "Notre école — La Providence de Don Orione" },
      {
        name: "description",
        content:
          "Projet éducatif, valeurs orionines et niveaux d'enseignement du Complexe Scolaire La Providence de Don Orione.",
      },
      { property: "og:title", content: "Notre école — La Providence de Don Orione" },
      {
        property: "og:description",
        content: "Projet éducatif, valeurs et niveaux d'enseignement de l'établissement.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/notre-ecole" },
    ],
    links: [{ rel: "canonical", href: "/notre-ecole" }],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <Header />
      <main>
        <Section
          eyebrow="Notre école"
          title="Un projet éducatif complet"
          description="Le Complexe Scolaire La Providence de Don Orione accueille les élèves de la maternelle au collège, avec l'ambition d'unir formation humaine et réussite scolaire."
        >
          <div className="grid gap-6 sm:grid-cols-2">
            {values.map((v) => (
              <div key={v.title} className="rounded-xl border border-border bg-card p-6">
                <h3 className="font-display text-lg font-semibold">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.text}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section eyebrow="Enseignement" title="Nos niveaux">
          <LevelCards />
        </Section>
      </main>
      <Footer />
    </>
  );
}
