import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Section } from "@/components/Section";
import { SchoolLevels } from "@/components/SchoolLevels";
import { AdmissionsCTA } from "@/components/AdmissionsCTA";

export const Route = createFileRoute("/formations")({
  head: () => ({
    meta: [
      { title: "Formations : Maternelle, Primaire, Collège | La Providence de Don Orione" },
      {
        name: "description",
        content:
          "Découvrez les niveaux d'enseignement du Complexe Scolaire La Providence de Don Orione à Bonoua : maternelle, primaire et collège.",
      },
      { property: "og:title", content: "Nos formations — La Providence de Don Orione" },
      { property: "og:description", content: "Maternelle, primaire et collège à Bonoua." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/formations" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/formations" }],
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
          description="Un parcours cohérent de la maternelle au collège, où chaque étape prépare la suivante."
        >
          <SchoolLevels />
        </Section>
        <AdmissionsCTA />
      </main>
      <Footer />
    </>
  );
}
