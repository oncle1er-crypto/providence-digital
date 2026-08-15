import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Section } from "@/components/Section";
import { SchoolLevels } from "@/components/SchoolLevels";
import { CampusGallery } from "@/components/CampusGallery";
import { values } from "@/data/site";
import { absoluteUrl } from "@/lib/seo";

export const Route = createFileRoute("/notre-ecole")({
  head: () => ({
    meta: [
      { title: "Notre école — La Providence de Don Orione" },
      {
        name: "description",
        content:
          "Projet éducatif, valeurs orionines et niveaux d'enseignement du Complexe Scolaire La Providence de Don Orione à Bonoua.",
      },
      { property: "og:title", content: "Notre école — La Providence de Don Orione" },
      {
        property: "og:description",
        content: "Projet éducatif, valeurs et niveaux d'enseignement de l'établissement.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: absoluteUrl("/notre-ecole") },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/notre-ecole") }],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <Section
          eyebrow="Notre école"
          title="Un projet éducatif complet"
          description="Le Complexe Scolaire La Providence de Don Orione accueille les élèves de la maternelle au lycée, avec l'ambition d'unir formation humaine et réussite scolaire."
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

        <Section
          eyebrow="Campus"
          title="Nos infrastructures en images"
          description="Administration, salles de classe, préau, infirmerie : un cadre neuf et adapté, au service des élèves."
        >
          <CampusGallery />
        </Section>

        <Section eyebrow="Enseignement" title="Nos niveaux">
          <SchoolLevels />
        </Section>

      </main>
      <Footer />
    </>
  );
}
