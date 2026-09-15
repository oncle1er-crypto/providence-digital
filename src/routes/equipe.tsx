import { createFileRoute, Link } from "@tanstack/react-router";
import { buttonStyles } from "@/components/Button";
import { Quote } from "lucide-react";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { KeyStats } from "@/components/KeyStats";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { congregation, directionMessage, teamPoles } from "@/data/equipe";
import { PHOTO } from "@/data/site";
import { absoluteUrl, OG_IMAGE } from "@/lib/seo";

export const Route = createFileRoute("/equipe")({
  head: () => ({
    meta: [
      { title: "Équipe éducative & projet | La Providence de Don Orione" },
      {
        name: "description",
        content:
          "Mot de la direction, équipe éducative par pôle et héritage de saint Louis Orione : découvrez celles et ceux qui accompagnent les élèves du Complexe Scolaire La Providence de Don Orione à Bonoua.",
      },
      { property: "og:title", content: "Équipe éducative — La Providence de Don Orione" },
      {
        property: "og:description",
        content: "Mot de la direction, pôles de l'équipe éducative et spiritualité orionine.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absoluteUrl("/equipe") },
      { property: "og:image", content: OG_IMAGE.url },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/equipe") }],
  }),
  component: EquipePage,
});

function EquipePage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <Breadcrumbs items={[{ label: "Équipe éducative" }]} />

        <Section
          eyebrow="Notre équipe"
          as="h1"
          title="Une équipe éducative au service de chaque élève"
          description="Direction, enseignants, vie scolaire et services : des femmes et des hommes réunis autour d'un même projet éducatif, de la maternelle à la terminale."
        >
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:items-center">
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                {directionMessage.eyebrow}
              </p>
              <div className="mt-4 rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
                <Quote className="size-7 text-gold" aria-hidden="true" />
                <div className="mt-4 space-y-4 text-sm leading-7 text-foreground/90">
                  {directionMessage.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                <p className="mt-6 border-t border-border pt-5 text-sm font-semibold text-primary">
                  {directionMessage.signature}
                </p>
              </div>
            </div>
            <div className="overflow-hidden rounded-3xl border border-border bg-muted shadow-lg">
              <img
                src={PHOTO.administration}
                alt="Bâtiment administratif du Complexe Scolaire La Providence de Don Orione"
                className="aspect-[4/3] w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </Section>

        <KeyStats />

        {/* Pôles de l'équipe */}
        <div className="bg-secondary/50">
          <Section
            eyebrow="Organisation"
            title="Les pôles de l'établissement"
            description="Chaque pôle contribue au suivi des élèves : enseignement, vie scolaire, santé et services généraux travaillent ensemble autour de la direction."
          >
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {teamPoles.map((pole, index) => (
                <Reveal
                  key={pole.title}
                  delay={index * 70}
                  className="card-lift flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm"
                >
                  <h3 className="font-display text-xl font-semibold">{pole.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{pole.description}</p>
                </Reveal>
              ))}
            </div>
            <p className="mt-8 text-sm text-muted-foreground">
              Les enseignants sont joignables par l'intermédiaire du secrétariat, qui organise les
              rendez-vous avec les familles pendant les heures d'ouverture.
            </p>
          </Section>
        </div>

        {/* Congrégation */}
        <div className="bg-primary text-primary-foreground">
          <Section
            eyebrow="Notre congrégation"
            title={congregation.name}
            description={congregation.intro}
          >
            <blockquote className="rounded-3xl border border-gold/40 bg-primary-foreground/5 p-6 sm:p-8">
              <p className="font-display text-2xl font-semibold text-gold sm:text-3xl">
                {congregation.quote}
              </p>
              <footer className="mt-3 text-sm text-primary-foreground/75">
                Saint Louis Orione, {congregation.founder}
              </footer>
            </blockquote>

            <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {congregation.milestones.map((milestone, index) => (
                <Reveal
                  key={milestone.year}
                  delay={index * 60}
                  className="rounded-2xl border border-primary-foreground/15 bg-primary-foreground/5 p-5"
                >
                  <p className="font-display text-2xl font-semibold text-gold">{milestone.year}</p>
                  <p className="mt-2 text-sm text-primary-foreground/80">{milestone.text}</p>
                </Reveal>
              ))}
            </ol>

            <ul className="mt-10 grid gap-3 sm:grid-cols-3">
              {congregation.heritage.map((item) => (
                <li
                  key={item}
                  className="rounded-2xl border border-primary-foreground/15 bg-primary-foreground/5 p-5 text-sm text-primary-foreground/85"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Section>
        </div>

        {/* Rejoindre / contact */}
        <Section
          eyebrow="Nous rencontrer"
          title="Une question, une candidature ?"
          description="Les familles comme les candidats à un poste peuvent s'adresser directement à l'administration de l'établissement."
        >
          <div className="flex flex-wrap gap-3">
            <Link to="/contact" className={buttonStyles({ variant: "gold", size: "lg" })}>
              Contacter le secrétariat
            </Link>
            <Link to="/admissions" className={buttonStyles({ variant: "outline", size: "lg" })}>
              Inscrire mon enfant
            </Link>
            <Link to="/notre-ecole" className={buttonStyles({ variant: "outline", size: "lg" })}>
              Découvrir le projet éducatif
            </Link>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
