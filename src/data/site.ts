import maternelle from "@/assets/maternelle.jpg";
import primaire from "@/assets/primaire.jpg";
import college from "@/assets/college.jpg";

export const site = {
  name: "Complexe Scolaire La Providence de Don Orione",
  shortName: "La Providence",
  tagline: "Éduquer le cœur et l'intelligence",
  intro:
    "Un établissement d'inspiration orionine où chaque élève est accompagné avec exigence et bienveillance, de la maternelle au collège.",
  logo: "/logo-gsp.png",
  heroVideo: "/__l5e/assets-v1/31272f5c-5d8d-42cf-90aa-d0ffc75905a2/hero-cour.mp4",
  // À REMPLACER par les coordonnées officielles fournies par l'établissement
  contact: {
    phone: "[Téléphone à compléter]",
    email: "[Email à compléter]",
    address: "[Adresse à compléter]",
  },
};

export const levels = [
  {
    slug: "maternelle",
    title: "Maternelle",
    image: maternelle,
    summary:
      "Un premier pas serein vers l'école : éveil, langage, motricité et vie en groupe dans un cadre protecteur.",
    points: ["Éveil et langage", "Motricité et jeux encadrés", "Apprentissage de l'autonomie"],
  },
  {
    slug: "primaire",
    title: "Primaire",
    image: primaire,
    summary:
      "Les fondamentaux solidement posés : lire, écrire, compter, raisonner, avec un suivi individualisé.",
    points: ["Lecture et expression écrite", "Mathématiques et raisonnement", "Suivi personnalisé"],
  },
  {
    slug: "college",
    title: "Collège",
    image: college,
    summary:
      "Méthode de travail, culture générale et préparation aux examens dans un climat de discipline bienveillante.",
    points: ["Méthodologie et travail personnel", "Sciences et langues", "Préparation aux examens"],
  },
] as const;

export const values = [
  {
    title: "Charité orionine",
    text: "L'héritage de Don Orione : accueillir chacun, servir avec humilité, faire grandir les plus fragiles.",
  },
  {
    title: "Exigence académique",
    text: "Un travail régulier, des méthodes claires et un accompagnement continu vers la réussite.",
  },
  {
    title: "Discipline bienveillante",
    text: "Un cadre stable et respectueux, où la règle protège la liberté d'apprendre.",
  },
  {
    title: "Ouverture et service",
    text: "Activités, projets et engagements qui forment des élèves responsables et solidaires.",
  },
];

export const admissionSteps = [
  { step: "01", title: "Prise de contact", text: "Contactez le secrétariat pour connaître les places disponibles par niveau." },
  { step: "02", title: "Dossier de candidature", text: "Retrait et dépôt du dossier avec les pièces demandées par l'établissement." },
  { step: "03", title: "Entretien et évaluation", text: "Rencontre avec la famille et évaluation du niveau selon la classe visée." },
  { step: "04", title: "Inscription", text: "Confirmation de l'admission et finalisation de l'inscription au secrétariat." },
];

export const schoolLife = [
  { title: "Vie de classe", text: "Des effectifs suivis, des enseignants disponibles, un climat propice au travail." },
  { title: "Activités et sport", text: "Sport, culture et animations qui développent la confiance et l'esprit d'équipe." },
  { title: "Pastorale et valeurs", text: "Temps de formation humaine et spirituelle, dans le respect de chaque famille." },
  { title: "Encadrement", text: "Une équipe éducative attentive à la présence, au comportement et aux progrès." },
];
