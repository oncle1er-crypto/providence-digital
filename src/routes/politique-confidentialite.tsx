import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalPage, type LegalSection } from "@/components/LegalPage";
import { site } from "@/data/site";
import { absoluteUrl, OG_IMAGE } from "@/lib/seo";

const UPDATED_AT = "15 septembre 2026";

const sections: LegalSection[] = [
  {
    title: "Responsable du traitement",
    paragraphs: [
      `Les données personnelles collectées depuis le site ${site.website} sont traitées par ${site.legal.entity}, ci-après « l'établissement », responsable de traitement.`,
    ],
    list: [
      `Adresse : ${site.contact.address}`,
      `Téléphone : ${site.contact.phone}`,
      `Adresse e-mail : ${site.contact.email}`,
    ],
  },
  {
    title: "Données que nous collectons",
    paragraphs: [
      "L'établissement applique un principe de minimisation : seules les données nécessaires au traitement de votre demande sont collectées, et aucun champ n'est utilisé à des fins commerciales.",
    ],
    list: [
      "Formulaire de préinscription : nom du parent ou tuteur, adresse e-mail, téléphone, nom de l'enfant, âge, niveau souhaité et message éventuel.",
      "Formulaire de contact : nom, adresse e-mail, téléphone (facultatif), motif de la demande et message.",
      "Données techniques : pages consultées, type d'appareil et de navigateur, nécessaires au bon fonctionnement et à la sécurité du site.",
    ],
  },
  {
    title: "Finalités et bases légales",
    list: [
      "Étude des demandes d'admission et réponse aux sollicitations des familles : intérêt légitime de l'établissement à instruire les demandes qui lui sont adressées.",
      "Gestion de la relation avec les familles et suivi administratif : exécution des mesures précontractuelles puis du contrat scolaire.",
      "Mesure d'audience et amélioration du site : consentement, recueilli via le bandeau de cookies.",
      "Sécurité du site et prévention des abus (lutte contre le spam des formulaires) : intérêt légitime.",
    ],
  },
  {
    title: "Destinataires des données",
    paragraphs: [
      "Vos données sont accessibles aux seuls membres habilités de l'administration scolaire. Elles sont hébergées auprès de sous-traitants techniques choisis pour leurs garanties de sécurité :",
    ],
    list: [
      `${site.legal.host.name} — hébergement et diffusion du site.`,
      "Supabase — hébergement de la base de données hébergeant les demandes de préinscription, les messages reçus et le contenu du site.",
    ],
  },
  {
    title: "Durées de conservation",
    list: [
      "Demandes de préinscription : conservées jusqu'à trois ans après le dernier contact avec la famille, puis supprimées.",
      "Messages reçus via le formulaire de contact : conservés deux ans après traitement de la demande.",
      "Données de mesure d'audience : treize mois au maximum.",
      "Journaux techniques : quelques mois, à des fins de sécurité.",
    ],
  },
  {
    title: "Vos droits",
    paragraphs: [
      "Conformément à la réglementation applicable en Côte d'Ivoire (loi n° 2013-450 relative à la protection des données à caractère personnel) et, le cas échéant, au RGPD, vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation et d'opposition sur les données vous concernant.",
      "Ces droits s'exercent par e-mail ou par courrier adressés à l'établissement. Une réponse vous est apportée dans un délai d'un mois. Vous pouvez également introduire une réclamation auprès de l'autorité de protection des données compétente (ARTCI).",
    ],
  },
  {
    title: "Cookies et traceurs",
    paragraphs: [
      "Le site fonctionne sans cookie publicitaire. Seul un stockage local est utilisé pour mémoriser votre choix en matière de cookies, ainsi que la session de l'espace d'administration.",
      "Vous pouvez accepter ou refuser les cookies de mesure d'audience depuis le bandeau affiché lors de votre première visite, puis modifier votre choix à tout moment grâce au lien « Gérer les cookies » présent en bas de chaque page.",
    ],
  },
  {
    title: "Sécurité",
    paragraphs: [
      "L'établissement met en œuvre des mesures techniques et organisationnelles adaptées : chiffrement des échanges (HTTPS), accès aux données restreint aux personnes habilitées, journalisation des accès à l'espace d'administration et limitation anti-spam des formulaires.",
    ],
  },
  {
    title: "Mineurs",
    paragraphs: [
      "Les données des élèves mineurs sont renseignées par un parent ou un tuteur légal, seul habilité à transmettre ces informations dans le cadre d'une demande d'admission.",
    ],
  },
];

export const Route = createFileRoute("/politique-confidentialite")({
  head: () => ({
    meta: [
      { title: "Politique de confidentialité | La Providence de Don Orione" },
      {
        name: "description",
        content:
          "Traitement des données personnelles, cookies et exercice de vos droits : politique de confidentialité du Complexe Scolaire La Providence de Don Orione.",
      },
      {
        property: "og:title",
        content: "Politique de confidentialité — La Providence de Don Orione",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absoluteUrl("/politique-confidentialite") },
      { property: "og:image", content: OG_IMAGE.url },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/politique-confidentialite") }],
  }),
  component: Page,
});

function Page() {
  return (
    <LegalPage
      eyebrow="Données personnelles"
      title="Politique de confidentialité"
      description="Comment l'établissement collecte, utilise et protège les données personnelles transmises depuis ce site."
      updatedAt={UPDATED_AT}
      crumbs={[{ label: "Politique de confidentialité" }]}
      sections={sections}
    >
      <p className="mt-8 max-w-3xl text-sm text-muted-foreground">
        Pour exercer vos droits ou poser une question sur vos données :{" "}
        <Link to="/contact" className="font-medium text-primary underline underline-offset-4">
          contactez l'administration
        </Link>
        .
      </p>
    </LegalPage>
  );
}
