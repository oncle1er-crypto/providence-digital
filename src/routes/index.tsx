import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { LevelCards } from "@/components/LevelCards";
import { site, values } from "@/data/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "La Providence de Don Orione — Complexe Scolaire" },
      {
        name: "description",
        content:
          "Site officiel du Complexe Scolaire La Providence de Don Orione : maternelle, primaire et collège, dans un cadre exigeant et bienveillant.",
      },
      { property: "og:title", content: "La Providence de Don Orione — Site officiel" },
      {
        property: "og:description",
        content: "Maternelle, primaire et collège : éduquer le cœur et l'intelligence.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "School",
          name: site.name,
          description: site.intro,
          url: "/",
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Header />
      <main>
        <Hero />

        <Section
          eyebrow="Nos niveaux"
          title="De la maternelle au collège"
          description="Un parcours cohérent, où chaque étape prépare la suivante."
        >
          <LevelCards />
        </Section>

        <div className="bg-secondary/60">
          <Section
            eyebrow="Nos valeurs"
            title="Une école d'inspiration orionine"
            description="Ce qui guide notre projet éducatif au quotidien."
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
        </div>

        <Section
          eyebrow="Admissions"
          title="Rejoindre La Providence"
          description="Les inscriptions se font auprès du secrétariat de l'établissement."
        >
          <Link
            to="/admissions"
            className="inline-flex rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Voir la procédure d'inscription
          </Link>
        </Section>
      </main>
      <Footer />
    </>
  );
}
