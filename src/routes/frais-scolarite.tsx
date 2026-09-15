import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Info, Minus } from "lucide-react";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Section } from "@/components/Section";
import {
  tuitionIncluded,
  tuitionNotIncluded,
  tuitionNote,
  tuitionPayment,
  tuitionRows,
  tuitionYear,
} from "@/data/frais";
import { absoluteUrl, OG_IMAGE } from "@/lib/seo";

const faqs = [
  {
    question: "Les frais de scolarité sont-ils publiés sur le site ?",
    answer:
      "Les montants ne sont pas diffusés en ligne. Le secrétariat les communique directement aux familles, avec la grille correspondant au cycle demandé et l'échéancier de paiement.",
  },
  {
    question: "Peut-on régler la scolarité en plusieurs fois ?",
    answer:
      "Oui. Un échéancier est remis lors de l'inscription ; il tient compte du cycle et de la date d'arrivée de l'élève. Chaque versement donne lieu à un reçu.",
  },
  {
    question: "L'uniforme et les fournitures sont-ils compris ?",
    answer:
      "Non. L'uniforme, disponible à l'école selon le cycle, ainsi que les fournitures et les manuels restent à la charge des familles. Les frais de sorties pédagogiques et d'examens officiels ne sont pas inclus non plus.",
  },
  {
    question: "Existe-t-il des réductions pour les fratries ?",
    answer:
      "Les situations particulières — fratries, demandes exceptionnelles — sont étudiées par la direction. Le plus simple est d'en parler au secrétariat lors du dépôt du dossier.",
  },
];

const columns = [
  { key: "inscription" as const, label: "Inscription / dossier" },
  { key: "scolarite" as const, label: "Scolarité" },
  { key: "restauration" as const, label: "Restauration" },
  { key: "transport" as const, label: "Transport" },
];

export const Route = createFileRoute("/frais-scolarite")({
  head: () => ({
    meta: [
      { title: `Frais de scolarité ${tuitionYear} | La Providence de Don Orione` },
      {
        name: "description",
        content:
          "Frais de scolarité du Complexe Scolaire La Providence de Don Orione à Bonoua : ce que comprennent les frais, modalités de paiement et échéancier.",
      },
      { property: "og:title", content: "Frais de scolarité — La Providence de Don Orione" },
      {
        property: "og:description",
        content: "Ce que comprennent les frais, modalités de paiement et échéancier.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absoluteUrl("/frais-scolarite") },
      { property: "og:image", content: OG_IMAGE.url },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/frais-scolarite") }],
  }),
  component: FraisPage,
});

function FraisPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      <Header />
      <main className="pt-20">
        <Breadcrumbs items={[{ label: "Frais de scolarité" }]} />

        <Section
          eyebrow="Familles"
          as="h1"
          title={`Frais de scolarité ${tuitionYear}`}
          description="Transparence et simplicité : voici ce que recouvrent les frais, ce qui reste à la charge des familles et comment s'organise le paiement."
        >
          <div className="flex gap-3 rounded-2xl border border-gold/40 bg-gold/10 p-5 text-sm">
            <Info className="mt-0.5 size-5 shrink-0 text-gold" aria-hidden="true" />
            <p className="text-foreground/85">{tuitionNote}</p>
          </div>

          <div className="mt-8 overflow-x-auto rounded-2xl border border-border bg-card">
            <table className="w-full min-w-[36rem] text-left text-sm">
              <caption className="sr-only">
                Frais de scolarité par cycle pour l'année {tuitionYear}
              </caption>
              <thead className="border-b border-border bg-secondary/60">
                <tr>
                  <th scope="col" className="px-5 py-4 font-semibold">
                    Cycle
                  </th>
                  {columns.map((column) => (
                    <th key={column.key} scope="col" className="px-5 py-4 font-semibold">
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {tuitionRows.map((row) => (
                  <tr key={row.cycle}>
                    <th scope="row" className="px-5 py-4 font-display text-base font-semibold">
                      {row.cycle}
                    </th>
                    {columns.map((column) => (
                      <td key={column.key} className="px-5 py-4 text-muted-foreground">
                        {row[column.key] ?? (
                          <span className="inline-flex items-center gap-1.5 italic opacity-80">
                            <Minus className="size-3.5" aria-hidden="true" />
                            Nous consulter
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="font-display text-xl font-semibold">Ce que comprennent les frais</h2>
              <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
                {tuitionIncluded.map((item) => (
                  <li key={item} className="flex gap-2">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="font-display text-xl font-semibold">À prévoir en plus</h2>
              <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
                {tuitionNotIncluded.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-gold" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        <div className="bg-secondary/50">
          <Section eyebrow="Paiement" title="Modalités et échéancier">
            <ol className="grid gap-4 sm:grid-cols-2">
              {tuitionPayment.map((item, index) => (
                <li
                  key={item}
                  className="flex gap-4 rounded-2xl border border-border bg-card p-5 text-sm text-muted-foreground"
                >
                  <span className="font-display text-2xl font-semibold text-gold">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {item}
                </li>
              ))}
            </ol>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="btn-glow btn-press rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-gold-foreground"
              >
                Demander la grille tarifaire
              </Link>
              <Link
                to="/admissions"
                className="btn-press rounded-full border border-border px-7 py-3.5 text-sm font-semibold transition-colors hover:bg-secondary"
              >
                Voir la procédure d'admission
              </Link>
            </div>
          </Section>
        </div>

        <Section eyebrow="Questions fréquentes" title="Ce que les familles demandent">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
            }}
          />
          <dl className="mx-auto max-w-3xl divide-y divide-border rounded-3xl border border-border bg-card">
            {faqs.map((item) => (
              <div key={item.question} className="p-6 sm:p-7">
                <dt className="font-display text-lg font-semibold">{item.question}</dt>
                <dd className="mt-2 text-sm leading-7 text-muted-foreground">{item.answer}</dd>
              </div>
            ))}
          </dl>
        </Section>
      </main>
      <Footer />
    </>
  );
}
