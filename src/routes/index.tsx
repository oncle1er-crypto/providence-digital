import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HeroVideoCarousel } from "@/components/HeroVideoCarousel";
import { Section } from "@/components/Section";
import { SchoolLevels } from "@/components/SchoolLevels";
import { AdmissionsCTA } from "@/components/AdmissionsCTA";
import { VideoCarousel } from "@/components/VideoCarousel";
import { WhyProvidence } from "@/components/WhyProvidence";
import { NewsCarousel } from "@/components/NewsCarousel";
import { Testimonials } from "@/components/Testimonials";
import { site, welcomeBadges } from "@/data/site";

const description =
  "Site officiel du Complexe Scolaire La Providence de Don Orione à Bonoua : école catholique de la maternelle à la terminale : maternelle, primaire, collège et lycée.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Complexe Scolaire La Providence de Don Orione | Bonoua" },
      { name: "description", content: description },
      { property: "og:title", content: "Complexe Scolaire La Providence de Don Orione | Bonoua" },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "School",
          name: site.name,
          description,
          url: "/",
          telephone: site.contact.phone,
          email: site.contact.email,
          slogan: site.motto,
          address: {
            "@type": "PostalAddress",
            streetAddress: "Quartier Château",
            addressLocality: "Bonoua",
            addressCountry: "CI",
          },

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
        <HeroVideoCarousel />

        <Section
          eyebrow="Bienvenue"
          title="La Providence de Don Orione"
          description="Une école catholique au service des familles de Bonoua-Château, dirigée par la Congrégation Petite Œuvre de la Divine Providence — Don Orione : discipline, charité, excellence."
        >
          <div className="grid gap-6 sm:grid-cols-3">
            {welcomeBadges.map((b) => (
              <div key={b.title} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <h3 className="font-display text-lg font-semibold">{b.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{b.text}</p>
              </div>
            ))}
          </div>
          <Link
            to="/notre-ecole"
            className="mt-8 inline-block rounded-full border border-border px-6 py-3 text-sm font-semibold transition-colors hover:bg-secondary"
          >
            Découvrir notre histoire
          </Link>
        </Section>

        <AdmissionsCTA />

        <Section
          eyebrow="Formations"
          title="Nos niveaux d'enseignement"
          description="De la maternelle à la terminale, un parcours cohérent et accompagné."
        >
          <SchoolLevels />
        </Section>

        <Section
          eyebrow="Vie scolaire"
          title="Le quotidien de nos élèves"
          description="Classe, vie spirituelle, sport, arts et vie étudiante — en vidéo."
        >
          <VideoCarousel />
        </Section>

        <WhyProvidence />

        <Section
          eyebrow="Actualités"
          title="Actualités & événements"
          description="Les temps forts de la communauté éducative."
        >
          <NewsCarousel />
        </Section>

        <Section eyebrow="Témoignages" title="Ils témoignent" className="pb-24">
          <Testimonials />
        </Section>
      </main>
      <Footer />
    </>
  );
}
