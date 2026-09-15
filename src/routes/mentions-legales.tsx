import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalPage, type LegalSection } from "@/components/LegalPage";
import { site } from "@/data/site";
import { absoluteUrl, OG_IMAGE } from "@/lib/seo";

const UPDATED_AT = "15 septembre 2026";

const sections: LegalSection[] = [
  {
    title: "Éditeur du site",
    paragraphs: [
      `Le site ${site.website} est édité par ${site.legal.entity}, établissement scolaire catholique situé à Bonoua, en Côte d'Ivoire.`,
    ],
    list: [
      `Adresse : ${site.contact.address}`,
      `Téléphone : ${site.contact.phone}`,
      `Adresse e-mail : ${site.contact.email}`,
      `Directeur de la publication : ${site.legal.publicationDirector}`,
      ...(site.legal.approval
        ? [`Autorisation d'ouverture / agrément : ${site.legal.approval}`]
        : []),
    ],
  },
  {
    title: "Tutelle et congrégation",
    paragraphs: [
      `L'établissement est une œuvre de ${site.legal.congregation}. Il dispense un enseignement conforme aux programmes officiels de l'enseignement en Côte d'Ivoire, dans le respect du caractère propre de l'enseignement catholique.`,
    ],
  },
  {
    title: "Hébergement",
    list: [
      `Nom : ${site.legal.host.name}`,
      `Adresse : ${site.legal.host.address}`,
      `Site : ${site.legal.host.website}`,
    ],
  },
  {
    title: "Propriété intellectuelle",
    paragraphs: [
      "L'ensemble des contenus présents sur ce site (textes, photographies, vidéos, logotypes, éléments graphiques et sonores) est protégé par le droit de la propriété intellectuelle. Toute reproduction, représentation, adaptation ou exploitation, totale ou partielle, sur quelque support que ce soit, est interdite sans autorisation écrite préalable de l'établissement.",
      "Les photographies et vidéos mettant en scène des élèves sont diffusées avec l'accord des familles. Toute demande de retrait d'un visuel peut être adressée à l'administration.",
    ],
  },
  {
    title: "Liens hypertextes",
    paragraphs: [
      "Le site peut renvoyer vers des sites tiers (réseaux sociaux, Google Maps, annuaires) dont le contenu n'engage pas la responsabilité de l'établissement. Les liens sortants sont fournis à titre d'information.",
    ],
  },
  {
    title: "Responsabilité",
    paragraphs: [
      "Les informations diffusées sur ce site le sont à titre indicatif et peuvent évoluer : programmes, horaires, modalités d'admission et frais de scolarité ne sont définitifs qu'après confirmation par le secrétariat de l'établissement.",
    ],
  },
];

export const Route = createFileRoute("/mentions-legales")({
  head: () => ({
    meta: [
      { title: "Mentions légales | La Providence de Don Orione" },
      {
        name: "description",
        content:
          "Mentions légales du site du Complexe Scolaire La Providence de Don Orione à Bonoua : éditeur, hébergement, propriété intellectuelle.",
      },
      { property: "og:title", content: "Mentions légales — La Providence de Don Orione" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absoluteUrl("/mentions-legales") },
      { property: "og:image", content: OG_IMAGE.url },
      { property: "og:image:width", content: String(OG_IMAGE.width) },
      { property: "og:image:height", content: String(OG_IMAGE.height) },
      { property: "og:image:alt", content: OG_IMAGE.alt },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/mentions-legales") }],
  }),
  component: Page,
});

function Page() {
  return (
    <LegalPage
      eyebrow="Informations légales"
      title="Mentions légales"
      description="Informations relatives à l'éditeur du site, à son hébergement et aux droits attachés à son contenu."
      updatedAt={UPDATED_AT}
      crumbs={[{ label: "Mentions légales" }]}
      sections={sections}
    >
      <p className="mt-8 max-w-3xl text-sm text-muted-foreground">
        Une question relative à l'utilisation de ce site ?{" "}
        <Link to="/contact" className="font-medium text-primary underline underline-offset-4">
          Contactez l'administration
        </Link>
        .
      </p>
    </LegalPage>
  );
}
