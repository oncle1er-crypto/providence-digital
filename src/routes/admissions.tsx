import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Section } from "@/components/Section";
import { admissionSteps } from "@/data/site";

export const Route = createFileRoute("/admissions")({
  head: () => ({
    meta: [
      { title: "Admissions — La Providence de Don Orione" },
      {
        name: "description",
        content:
          "Procédure d'inscription au Complexe Scolaire La Providence de Don Orione : contact, dossier, entretien et inscription.",
      },
      { property: "og:title", content: "Admissions — La Providence de Don Orione" },
      {
        property: "og:description",
        content: "Les étapes pour inscrire votre enfant à La Providence de Don Orione.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/admissions" },
    ],
    links: [{ rel: "canonical", href: "/admissions" }],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <Section
          eyebrow="Admissions"
          title="Inscrire votre enfant"
          description="Les places sont limitées par niveau. Le secrétariat vous informe des disponibilités et des pièces à fournir."
        >
          <ol className="grid gap-6 sm:grid-cols-2">
            {admissionSteps.map((s) => (
              <li key={s.step} className="rounded-xl border border-border bg-card p-6">
                <span className="font-display text-3xl font-semibold text-gold">{s.step}</span>
                <h3 className="mt-3 font-display text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
              </li>
            ))}
          </ol>

          <div className="mt-10">
            <Link
              to="/contact"
              className="inline-flex rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Contacter le secrétariat
            </Link>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
