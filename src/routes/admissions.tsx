import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Section } from "@/components/Section";
import { admissionSteps, admissionDocs, uniforms } from "@/data/site";
import { absoluteUrl } from "@/lib/seo";
import { AdmissionsFaq } from "@/components/AdmissionsFaq";
import { PreRegistrationForm } from "@/components/PreRegistrationForm";

export const Route = createFileRoute("/admissions")({
  head: () => ({
    meta: [
      { title: "Admissions — La Providence de Don Orione" },
      {
        name: "description",
        content:
          "Procédure d'inscription au Complexe Scolaire La Providence de Don Orione : contact, dossier, test d'entrée et inscription.",
      },
      { property: "og:title", content: "Admissions — La Providence de Don Orione" },
      {
        property: "og:description",
        content: "Les étapes pour inscrire votre enfant à La Providence de Don Orione.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: absoluteUrl("/admissions") },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/admissions") }],
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
          as="h1"
          title="Admissions : inscrire votre enfant à La Providence de Don Orione"
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
              Contacter l'administration
            </Link>
          </div>
        </Section>

        <Section eyebrow="Dossiers" title="Pièces à fournir">
          <div className="grid gap-6 sm:grid-cols-3">
            {admissionDocs.map((d) => (
              <div key={d.level} className="rounded-xl border border-border bg-card p-6">
                <h3 className="font-display text-lg font-semibold">{d.level}</h3>
                <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                  {d.items.map((i) => (
                    <li key={i} className="flex gap-2">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-gold" />
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm font-semibold">
            Le test d'entrée est obligatoire. Places limitées pour garantir la qualité.
          </p>
        </Section>

        <Section eyebrow="Uniformes" title="Règles d'habillement" className="pb-24">
          <div className="grid gap-6 sm:grid-cols-3">
            {uniforms.map((u) => (
              <div key={u.level} className="rounded-xl border border-border bg-card p-6">
                <h3 className="font-display text-lg font-semibold">{u.level}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{u.text}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            Chaussures fermées, cheveux courts ou bien tressés sans perles, uniforme propre
            obligatoire.
          </p>
        </Section>

        <div className="bg-secondary/55">
          <Section
            eyebrow="Questions fréquentes"
            title="Tout savoir avant de déposer votre demande"
            description="Retrouvez les réponses aux questions les plus fréquentes des familles concernant l'admission à La Providence."
          >
            <AdmissionsFaq />
          </Section>
        </div>

        <div id="preinscription" className="bg-primary text-primary-foreground">
          <Section
            eyebrow="Préinscription"
            title="Formulaire de préinscription"
            description="Complétez ce formulaire pour être recontacté par notre équipe administrative. Les champs marqués d'un astérisque sont obligatoires."
            className="py-20 sm:py-24"
          >
            <div className="text-foreground">
              <PreRegistrationForm />
            </div>
          </Section>
        </div>
      </main>
      <Footer />
    </>
  );
}
