import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarDays, Info } from "lucide-react";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { calendarNote, calendarPeriods, calendarYear, periodLabels } from "@/data/calendrier";
import { absoluteUrl, OG_IMAGE } from "@/lib/seo";

const kindStyles: Record<(typeof calendarPeriods)[number]["kind"], string> = {
  rentree: "bg-gold/15 text-gold-foreground border-gold/40",
  trimestre: "bg-primary/10 text-primary border-primary/20",
  vacances: "bg-secondary text-secondary-foreground border-border",
  examens: "bg-destructive/10 text-destructive border-destructive/20",
  inscriptions: "bg-emerald-500/10 text-emerald-700 border-emerald-500/25",
};

export const Route = createFileRoute("/calendrier")({
  head: () => ({
    meta: [
      { title: `Calendrier scolaire ${calendarYear} | La Providence de Don Orione` },
      {
        name: "description",
        content:
          "Calendrier scolaire du Complexe Scolaire La Providence de Don Orione à Bonoua : rentrée, trimestres, vacances, examens nationaux et périodes d'inscription.",
      },
      { property: "og:title", content: `Calendrier scolaire ${calendarYear}` },
      {
        property: "og:description",
        content: "Rentrée, trimestres, vacances, examens et inscriptions.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absoluteUrl("/calendrier") },
      { property: "og:image", content: OG_IMAGE.url },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/calendrier") }],
  }),
  component: CalendrierPage,
});

function CalendrierPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <Breadcrumbs items={[{ label: "Calendrier scolaire" }]} />

        <Section
          eyebrow="Année scolaire"
          as="h1"
          title={`Calendrier scolaire ${calendarYear}`}
          description="Les grandes périodes de l'année : rentrée, trimestres, congés, examens nationaux et campagne d'inscription."
        >
          <div className="flex gap-3 rounded-2xl border border-gold/40 bg-gold/10 p-5 text-sm">
            <Info className="mt-0.5 size-5 shrink-0 text-gold" aria-hidden="true" />
            <p className="text-foreground/85">{calendarNote}</p>
          </div>

          <ol className="mt-10 space-y-4">
            {calendarPeriods.map((period, index) => (
              <Reveal
                key={period.id}
                delay={index * 50}
                className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm sm:flex-row sm:items-start"
              >
                <div className="flex shrink-0 items-center gap-3 sm:w-52 sm:flex-col sm:items-start sm:gap-2">
                  <span
                    className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${kindStyles[period.kind]}`}
                  >
                    {periodLabels[period.kind]}
                  </span>
                  <p className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground">
                    <CalendarDays className="size-4 text-gold" aria-hidden="true" />
                    {period.period}
                  </p>
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="font-display text-xl font-semibold">{period.title}</h2>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">
                    {period.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </Section>

        <div className="bg-primary text-primary-foreground">
          <Section
            eyebrow="Anticiper"
            title="Inscriptions et visites"
            description="Les places sont limitées par niveau : les familles sont invitées à se manifester dès l'ouverture de la campagne d'inscription, et à visiter l'établissement sur rendez-vous."
          >
            <div className="flex flex-wrap gap-3">
              <Link
                to="/admissions"
                className="btn-glow btn-press rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-gold-foreground"
              >
                Demander une inscription
              </Link>
              <Link
                to="/contact"
                className="btn-press rounded-full border border-primary-foreground/45 px-7 py-3.5 text-sm font-semibold transition-colors hover:bg-primary-foreground/10"
              >
                Prendre rendez-vous
              </Link>
              <Link
                to="/frais-scolarite"
                className="btn-press rounded-full border border-primary-foreground/45 px-7 py-3.5 text-sm font-semibold transition-colors hover:bg-primary-foreground/10"
              >
                Frais de scolarité
              </Link>
            </div>
          </Section>
        </div>
      </main>
      <Footer />
    </>
  );
}
