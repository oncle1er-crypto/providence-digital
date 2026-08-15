import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Section } from "@/components/Section";
import { SchoolLevels } from "@/components/SchoolLevels";
import { AdmissionsCTA } from "@/components/AdmissionsCTA";
import { absoluteUrl } from "@/lib/seo";

export const Route = createFileRoute("/formations")({
  head: () => ({
    meta: [
      { title: "Formations : Maternelle, Primaire, Collège, Lycée | La Providence" },
      {
        name: "description",
        content:
          "Découvrez les niveaux d'enseignement du Complexe Scolaire La Providence de Don Orione à Bonoua : maternelle, primaire, collège et lycée.",
      },
      { property: "og:title", content: "Nos formations — La Providence de Don Orione" },
      { property: "og:description", content: "Maternelle, primaire, collège et lycée à Bonoua." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absoluteUrl("/formations") },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/formations") }],
  }),
  component: FormationsPage,
});

function FormationsPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <Section
          eyebrow="Formations"
          title="Nos niveaux d'enseignement"
          description="Un parcours cohérent de la maternelle au lycée, où chaque étape prépare la suivante."
        >
          <SchoolLevels />
        </Section>
        <AdmissionsCTA />
      </main>
      <Footer />
    </>
  );
}
