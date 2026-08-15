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
import { RevealGroup, RevealItem } from "@/components/Reveal";
import { site, welcomeBadges } from "@/data/site";
import { getPublicNews, getPublicSetting, type AdmissionsSetting } from "@/lib/cms";
import { absoluteUrl, DEFAULT_OG_IMAGE } from "@/lib/seo";

const description =
  "Site officiel du Complexe Scolaire La Providence de Don Orione à Bonoua : école catholique de la maternelle à la terminale, avec maternelle, primaire, collège et lycée.";

export const Route = createFileRoute("/")({
  loader: async () => {
    const [cmsNews, admissions] = await Promise.all([
      getPublicNews(8).catch(() => []),
      getPublicSetting<AdmissionsSetting>("admissions").catch(() => null),
    ]);

    return {
      cmsNews,
      admissions: admissions?.value,
    };
  },
  head: () => ({
    meta: [
      { title: "Complexe Scolaire La Providence de Don Orione | Bonoua" },
      { name: "description", content: description },
      { property: "og:title", content: "Complexe Scolaire La Providence de Don Orione | Bonoua" },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absoluteUrl("/") },
      { property: "og:image", content: DEFAULT_OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/") }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "School",
          "@id": `${absoluteUrl("/")}#school`,
          name: site.name,
          alternateName: site.shortName,
          description,
          url: absoluteUrl("/"),
          logo: absoluteUrl(site.logo),
          image: DEFAULT_OG_IMAGE,
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
  const { cmsNews, admissions } = Route.useLoaderData();

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
          <RevealGroup stagger={0.12} className="grid gap-6 sm:grid-cols-3">
            {welcomeBadges.map((b, index) => (
              <RevealItem
                as="article"
                key={b.title}
                variant={index % 2 === 0 ? "up" : "zoom"}
                className="rounded-2xl border border-border bg-card p-6 shadow-sm"
              >
                <h3 className="font-display text-lg font-semibold">{b.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{b.text}</p>
              </RevealItem>
            ))}
          </RevealGroup>
          <Link
            to="/notre-ecole"
            className="mt-8 inline-block rounded-full border border-border px-6 py-3 text-sm font-semibold transition-colors hover:bg-secondary"
          >
            Découvrir notre histoire
          </Link>
        </Section>

        <AdmissionsCTA content={admissions} />

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
          <NewsCarousel cmsNews={cmsNews} />
        </Section>

        <Section eyebrow="Témoignages" title="Ils témoignent" className="pb-24">
          <Testimonials />
        </Section>
      </main>
      <Footer />
    </>
  );
}
