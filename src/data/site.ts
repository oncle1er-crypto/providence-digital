import maternelle from "@/assets/maternelle.jpg";
import primaire from "@/assets/primaire.jpg";
import college from "@/assets/college.jpg";
import posterCour from "@/assets/posters/cour.jpg";
import posterClasse from "@/assets/posters/classe.jpg";
import posterSport from "@/assets/posters/sport.jpg";
import posterGroupe from "@/assets/posters/groupe.jpg";

/**
 * Toutes les données du site sont centralisées ici (prêt pour un futur CMS).
 * Les vidéos sont des démonstrations temporaires : remplacer les URLs ci-dessous
 * par les vidéos définitives de l'établissement.
 */

export const site = {
  name: "Complexe Scolaire La Providence de Don Orione",
  shortName: "La Providence",
  city: "Bonoua, Côte d'Ivoire",
  tagline: "École catholique d'excellence à Bonoua",
  intro:
    "Un établissement catholique d'inspiration orionine où chaque élève est accompagné avec exigence et bienveillance, de la maternelle au collège.",
  logo: "/logo-gsp.png",
  // À REMPLACER par les coordonnées officielles fournies par l'établissement
  contact: {
    phone: "[Téléphone à compléter]",
    email: "[Email à compléter]",
    address: "[Adresse à compléter] — Bonoua, Côte d'Ivoire",
  },
  social: [
    { label: "Facebook", href: "#", note: "[Lien à compléter]" },
    { label: "WhatsApp", href: "#", note: "[Lien à compléter]" },
    { label: "YouTube", href: "#", note: "[Lien à compléter]" },
  ],
};

export const nav = [
  { to: "/", label: "Accueil" },
  { to: "/notre-ecole", label: "Notre école" },
  { to: "/formations", label: "Formations" },
  { to: "/vie-scolaire", label: "Vie scolaire" },
  { to: "/actualites", label: "Actualités" },
  { to: "/admissions", label: "Admissions" },
  { to: "/contact", label: "Contact" },
] as const;

export type VideoSlide = {
  id: string;
  title: string;
  description: string;
  /** durée affichée (secondes) */
  duration: number;
  src: string;
  poster: string;
};

/** URLs des vidéos de démonstration — remplacer par les vidéos définitives. */
export const VIDEO = {
  cour: "/__l5e/assets-v1/31272f5c-5d8d-42cf-90aa-d0ffc75905a2/hero-cour.mp4",
  classe: "/__l5e/assets-v1/ed2dfc4f-433f-4c09-8e34-112b8e6139fa/hero-classe.mp4",
  sport: "/__l5e/assets-v1/d85cdec2-d227-48bc-8ed9-b5a774e8a267/hero-sport.mp4",
  groupe: "/__l5e/assets-v1/5361a177-17e0-488f-a49a-7240bb4988e0/hero-groupe.mp4",
} as const;

/** HERO — 4 clips courts. Vidéos de démonstration, remplaçables. */
export const heroSlides: VideoSlide[] = [
  {
    id: "cour",
    title: "Élèves dans la cour",
    description: "L'accueil du matin dans la cour de l'école.",
    duration: 8,
    src: VIDEO.cour,
    poster: posterCour,
  },
  {
    id: "classe",
    title: "En classe",
    description: "Le travail quotidien en salle de classe.",
    duration: 7,
    src: VIDEO.classe,
    poster: posterClasse,
  },
  {
    id: "sport",
    title: "Sport",
    description: "Activités sportives et esprit d'équipe.",
    duration: 6,
    src: VIDEO.sport,
    poster: posterSport,
  },
  {
    id: "groupe",
    title: "Vie de groupe",
    description: "Amitié, entraide et vie communautaire.",
    duration: 8,
    src: VIDEO.groupe,
    poster: posterGroupe,
  },
];

/** VIE SCOLAIRE — mini-vidéos (démo, remplaçables). */
export const schoolLifeClips: VideoSlide[] = [
  {
    id: "apprentissage",
    title: "Apprentissage en classe",
    description: "Cours, méthode de travail et accompagnement des élèves.",
    duration: 6,
    src: VIDEO.classe,
    poster: posterClasse,
  },
  {
    id: "spirituelle",
    title: "Vie spirituelle",
    description: "Temps de prière et formation humaine et chrétienne.",
    duration: 7,
    src: VIDEO.groupe,
    poster: posterGroupe,
  },
  {
    id: "sports",
    title: "Sports & bien-être",
    description: "Activités physiques, santé et esprit d'équipe.",
    duration: 8,
    src: VIDEO.sport,
    poster: posterSport,
  },
  {
    id: "arts",
    title: "Arts & culture",
    description: "Expression artistique, chant et activités culturelles.",
    duration: 9,
    src: VIDEO.cour,
    poster: posterCour,
  },
  {
    id: "etudiante",
    title: "Vie étudiante",
    description: "Amitiés, projets et engagement au quotidien.",
    duration: 7,
    src: VIDEO.groupe,
    poster: posterGroupe,
  },
];

export const welcomeBadges = [
  { title: "Foi & Valeurs", text: "L'héritage de saint Luigi Orione : accueillir, servir, faire grandir." },
  { title: "Excellence académique", text: "Un travail régulier et des méthodes claires, de la maternelle au collège." },
  { title: "Ouverture & Service", text: "Former des élèves responsables, solidaires et ouverts au monde." },
];

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

export const values = welcomeBadges;

export const whyProvidence = [
  { title: "Foi & valeurs", text: "Une éducation catholique qui forme l'esprit et élève le cœur." },
  { title: "Enseignants qualifiés", text: "Une équipe éducative engagée et attentive à chaque élève." },
  { title: "Effectifs à taille humaine", text: "Des classes suivies, pour un accompagnement réellement personnalisé." },
  { title: "Infrastructure adaptée", text: "Des espaces pensés pour apprendre, jouer et grandir en sécurité." },
  { title: "Expérience", text: "Une école enracinée dans la tradition éducative orionine." },
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

export type NewsItem = {
  id: string;
  kind: "article" | "photo" | "video";
  category: string;
  title: string;
  excerpt: string;
  image?: string;
  video?: string;
};

export const news: NewsItem[] = [
  {
    id: "rentree",
    kind: "article",
    category: "Vie de l'école",
    title: "Rentrée scolaire",
    excerpt: "Accueil des élèves et des familles pour le lancement de la nouvelle année.",
    image: posterCour,
  },
  {
    id: "orione",
    kind: "photo",
    category: "Vie spirituelle",
    title: "Fête de Saint Luigi Orione",
    excerpt: "Célébration du fondateur et temps fort de la communauté éducative.",
    image: posterGroupe,
  },
  {
    id: "excellence",
    kind: "article",
    category: "Pédagogie",
    title: "Journée de l'excellence",
    excerpt: "Mise à l'honneur du travail et des progrès des élèves.",
    image: posterClasse,
  },
  {
    id: "sortie",
    kind: "video",
    category: "Pédagogie",
    title: "Sortie pédagogique",
    excerpt: "Une découverte hors les murs pour apprendre autrement.",
    image: posterCour,
    video: VIDEO.cour,
  },
  {
    id: "tournoi",
    kind: "video",
    category: "Sport",
    title: "Tournoi sportif",
    excerpt: "Compétition inter-classes dans un bel esprit d'équipe.",
    image: posterSport,
    video: VIDEO.sport,
  },
  {
    id: "retraite",
    kind: "photo",
    category: "Vie spirituelle",
    title: "Retraite spirituelle",
    excerpt: "Un temps de recueillement et de formation pour les élèves.",
    image: posterGroupe,
  },
];

export const testimonials = [
  {
    id: "eleve",
    role: "Élève",
    quote:
      "Les enseignants prennent le temps d'expliquer, et on se sent encouragé à donner le meilleur de soi.",
    author: "Témoignage d'élève",
  },
  {
    id: "parent",
    role: "Parent",
    quote:
      "Le suivi est régulier et l'ambiance est bienveillante : nos enfants viennent à l'école avec plaisir.",
    author: "Témoignage de parent",
  },
  {
    id: "enseignant",
    role: "Enseignant",
    quote:
      "Travailler ici, c'est accompagner chaque élève dans la durée, avec exigence et respect.",
    author: "Témoignage d'enseignant",
  },
  {
    id: "religieux",
    role: "Responsable religieux",
    quote:
      "Notre mission reste celle de Don Orione : former l'esprit et élever le cœur, au service des familles.",
    author: "Témoignage de la communauté",
  },
];
