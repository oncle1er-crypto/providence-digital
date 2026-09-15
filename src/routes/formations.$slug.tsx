import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CalendarClock, CheckCircle2, GraduationCap, Users } from "lucide-react";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { levelDetails, type LevelDetail } from "@/data/site";
import { absoluteUrl, OG_IMAGE } from "@/lib/seo";

export const Route = createFileRoute("/formations/$slug")({
  loader: ({ params }): { level: LevelDetail; others: LevelDetail[] } => {
    const level = levelDetails.find((item) => item.slug === params.slug);
    if (!level) throw notFound();

    return {
      level,
      others: levelDetails.filter((item) => item.slug !== level.slug),
    };
  },
  head: ({ loaderData }) => {
    const level = loaderData?.level;
    if (!level) return { meta: [{ title: "Formations | La Providence de Don Orione" }] };

    const url = absoluteUrl(`/formations/${level.slug}`);
    const description = `${level.title} au Complexe Scolaire La Providence de Don Orione à Bonoua : ${level.classes}. ${level.intro}`;

    return {
      meta: [
        { title: `${level.title} | La Providence de Don Orione` },
        { name: "description", content: description },
        { property: "og:title", content: `${level.title} — La Providence de Don Orione` },
        { property: "og:description", content: level.intro },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
        { property: "og:image", content: OG_IMAGE.url },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            name: `${level.title} — Complexe Scolaire La Providence de Don Orione`,
            description: level.intro,
            provider: {
              "@type": "School",
              name: "Complexe Scolaire La Providence de Don Orione",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Bonoua",
                addressCountry: "CI",
              },
            },
            url,
            ...(level.exam ? { educationalCredentialAwarded: level.exam } : {}),
          }),
        },
      ],
    };
  },
  component: LevelPage,
});

function LevelPage() {
  const { level, others } = Route.useLoaderData();

  const facts = [
    { icon: Users, label: "Âges", value: level.ages },
    { icon: GraduationCap, label: "Classes", value: level.classes },
    { icon: CalendarClock, label: "Horaires", value: level.schedule },
    ...(level.exam ? [{ icon: CheckCircle2, label: "Examen préparé", value: level.exam }] : []),
  ];

  return (
    <>
      <Header />
      <main className="pt-20">
        <Breadcrumbs items={[{ label: "Formations", to: "/formations" }, { label: level.title }]} />

        {/* En-tête du cycle */}
        <section className="container-page py-10 sm:py-14">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                Formation
              </p>
              <h1 className="mt-3 font-display text-4xl font-semibold text-balance sm:text-5xl">
                {level.title}
              </h1>
              <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{level.intro}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/admissions"
                  className="btn-glow btn-press rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-gold-foreground"
                >
                  Demander une inscription
                </Link>
                <Link
                  to="/contact"
                  className="btn-press rounded-full border border-border px-7 py-3.5 text-sm font-semibold transition-colors hover:bg-secondary"
                >
                  Visiter l'école
                </Link>
              </div>
            </div>
            <div className="overflow-hidden rounded-3xl border border-border bg-muted shadow-lg">
              <img
                src={level.image}
                alt={`Élèves en ${level.title.toLowerCase()} au Complexe Scolaire La Providence de Don Orione`}
                className="aspect-[4/3] w-full object-cover"
                loading="eager"
                decoding="async"
              />
            </div>
          </div>

          <dl className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {facts.map((fact) => (
              <div key={fact.label} className="rounded-2xl border border-border bg-card p-5">
                <dt className="flex items-center gap-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                  <fact.icon className="size-4 text-gold" aria-hidden="true" />
                  {fact.label}
                </dt>
                <dd className="mt-2 text-sm font-semibold text-foreground">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Programme */}
        <div className="bg-secondary/50">
          <Section
            eyebrow="Programme"
            title={`Ce que vos enfants travaillent en ${level.title.toLowerCase()}`}
            description="Les contenus s'inscrivent dans les programmes officiels de l'enseignement en Côte d'Ivoire, complétés par la formation humaine et spirituelle propre au projet orionin."
          >
            <div className="grid gap-6 md:grid-cols-3">
              {level.programme.map((block, index) => (
                <Reveal
                  key={block.title}
                  delay={index * 90}
                  className="card-lift h-full rounded-2xl border border-border bg-card p-6 shadow-sm"
                >
                  <h3 className="font-display text-xl font-semibold">{block.title}</h3>
                  <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
                    {block.items.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-gold" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
          </Section>
        </div>

        {/* Points forts */}
        <Section eyebrow="Nos engagements" title={`Pourquoi ce cycle à La Providence ?`}>
          <ul className="grid gap-4 sm:grid-cols-2">
            {level.highlights.map((highlight) => (
              <li
                key={highlight}
                className="flex gap-3 rounded-2xl border border-border bg-card p-5 text-sm"
              >
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-gold" aria-hidden="true" />
                {highlight}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-muted-foreground">
            Les places sont limitées par niveau : le secrétariat confirme les disponibilités avant
            toute inscription définitive.{" "}
            <Link
              to="/admissions"
              className="font-semibold text-primary underline underline-offset-4"
            >
              Voir la procédure d'admission
            </Link>
            .
          </p>
        </Section>

        {/* Autres cycles */}
        <div className="bg-primary text-primary-foreground">
          <Section eyebrow="Parcours complet" title="Les autres niveaux">
            <div className="grid gap-4 sm:grid-cols-3">
              {others.map((other) => (
                <Link
                  key={other.slug}
                  to="/formations/$slug"
                  params={{ slug: other.slug }}
                  className="card-lift group overflow-hidden rounded-2xl border border-primary-foreground/15 bg-primary-foreground/5"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={other.image}
                      alt={`${other.title} — La Providence de Don Orione`}
                      loading="lazy"
                      decoding="async"
                      className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-lg font-semibold">{other.title}</h3>
                    <p className="mt-1 text-sm text-primary-foreground/75">{other.classes}</p>
                  </div>
                </Link>
              ))}
            </div>
          </Section>
        </div>
      </main>
      <Footer />
    </>
  );
}
