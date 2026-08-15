import posterCour from "@/assets/posters/cour.jpg";
import posterClasse from "@/assets/posters/classe.jpg";
import posterSport from "@/assets/posters/sport.jpg";
import posterGroupe from "@/assets/posters/groupe.jpg";
import primaireGroupe from "@/assets/primaire-groupe.webp";
import primaireEleves from "@/assets/primaire-eleves.webp";
import sportTaekwondo from "@/assets/sport-taekwondo.webp";
import ecoleBatiment from "@/assets/ecole-batiment.webp";
import elevesMerite from "@/assets/eleves-merite.webp";
import elevesEtoile from "@/assets/eleves-etoile.webp";
import administration from "@/assets/administration.jpg";
import salleIrmaRicci from "@/assets/salle-irma-ricci.jpg";
import infirmerie from "@/assets/infirmerie.jpg";
import salleClasse from "@/assets/salle-classe.jpg";
import courPreau from "@/assets/cour-preau.jpg";
import campusVue from "@/assets/campus-vue.jpg";
import batimentSecondaire from "@/assets/batiment-secondaire.jpg";
import posterInstitutionnel from "@/assets/poster-01-institutionnel.jpg";
import posterVieScolaire from "@/assets/poster-02-vie-scolaire.jpg";
import posterExcellence from "@/assets/poster-03-excellence.jpg";
import posterEspaces from "@/assets/poster-04-espaces.jpg";

/**
 * Toutes les données du site sont centralisées ici (prêt pour un futur CMS).
 * Les photos du primaire sont réelles. Les vidéos restent des démonstrations
 * temporaires, remplaçables par les vidéos définitives de l'établissement.
 */

export const PHOTO = {
  primaireGroupe,
  primaireEleves,
  sport: sportTaekwondo,
  batiment: ecoleBatiment,
  merite: elevesMerite,
  etoile: elevesEtoile,
  administration,
  salleIrmaRicci,
  infirmerie,
  salleClasse,
  courPreau,
  campus: campusVue,
  secondaire: batimentSecondaire,
} as const;

/** Galerie du campus — photos réelles de l'établissement. */
export const campusGallery = [
  { src: PHOTO.administration, title: "Administration", text: "Le bâtiment administratif et la place du drapeau, à l'entrée du campus." },
  { src: PHOTO.secondaire, title: "Bâtiment du primaire", text: "Le bâtiment à étage qui accueille les classes du primaire." },
  { src: PHOTO.salleClasse, title: "Salles de classe", text: "Des salles neuves, lumineuses et équipées de mobilier individuel." },
  { src: PHOTO.salleIrmaRicci, title: "Salle Irma Ricci", text: "Les salles du primaire, ouvertes sur le préau et bien ventilées." },
  { src: PHOTO.infirmerie, title: "Infirmerie scolaire", text: "Une infirmerie équipée pour la prise en charge immédiate des élèves." },
  { src: PHOTO.courPreau, title: "Préau & cour", text: "Le préau du primaire et la cour centrale, cœur de la vie de l'école." },
  { src: PHOTO.campus, title: "Vue du complexe", text: "Un site spacieux et verdoyant sur les hauteurs de Bonoua-Château." },
] as const;


export const site = {
  name: "Complexe Scolaire Catholique La Providence de Don Orione",
  shortName: "La Providence",
  city: "Bonoua-Château, Côte d'Ivoire",
  motto: "Instruire l'esprit, former le cœur",
  tagline: "École catholique d'excellence à Bonoua",
  intro:
    "De la maternelle à la terminale, un établissement catholique dirigé par la Congrégation Petite Œuvre de la Divine Providence — Don Orione, où chaque élève est accompagné avec discipline, charité et excellence.",
  logo: "/logo-gsp.png",
  website: "www.cslaprodorione.org",
  contact: {
    address:
      "Bonoua, Quartier Château — à proximité de la Paroisse Marie Mère de la Divine Providence",
    phone: "(+225) 05 65 25 76 93",
    email: "ecolelaprovidencebonoua@gmail.com",
  },
  directions: [
    {
      label: "Maternelle & Primaire",
      phone: "(+225) 05 65 25 76 93",
      email: "ecolelaprovidencebonoua@gmail.com",
    },
    {
      label: "Collège & Lycée",
      phone: "(+225) 07 14 76 78 08",
      email: "c.s.laprovidence2019@gmail.com",
    },
  ],
  hours: [
    { days: "Lundi — Vendredi", time: "07h30 – 17h30" },
    { days: "Samedi", time: "08h00 – 12h00" },
  ],
  social: [
    { label: "Facebook", href: "#", note: "CS LA PROVIDENCE DE DON ORIONE" },
    { label: "Instagram", href: "#", note: "@cs_laprodorione" },
    { label: "Site web", href: "#", note: "www.cslaprodorione.org" },
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

/** Vidéos versionnées dans le dépôt et servies par Vercel. */
export const VIDEO = {
  cour: "/media/hero-cour.mp4",
  classe: "/media/hero-classe.mp4",
  sport: "/media/hero-sport.mp4",
  groupe: "/media/hero-groupe.mp4",
  institutionnel: "/media/la-providence-01-institutionnel.mp4",
  vieScolaire: "/media/la-providence-02-vie-scolaire.mp4",
  excellence: "/media/la-providence-03-excellence.mp4",
  espaces: "/media/la-providence-04-espaces.mp4",
} as const;

/** Posters des vidéos officielles. */
export const VIDEO_POSTER = {
  institutionnel: posterInstitutionnel,
  vieScolaire: posterVieScolaire,
  excellence: posterExcellence,
  espaces: posterEspaces,
} as const;


/** HERO — 8 clips : vidéos officielles intercalées avec les clips de démonstration. */
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
    id: "institutionnel",
    title: "La Providence de Don Orione",
    description: "Présentation de notre complexe scolaire à Bonoua-Château.",
    duration: 10,
    src: VIDEO.institutionnel,
    poster: VIDEO_POSTER.institutionnel,
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
    id: "vie-scolaire",
    title: "Vie scolaire au quotidien",
    description: "Le rythme de nos journées, entre étude et vie communautaire.",
    duration: 10,
    src: VIDEO.vieScolaire,
    poster: VIDEO_POSTER.vieScolaire,
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
    id: "excellence",
    title: "Excellence et réussite",
    description: "Le travail, l'effort et la réussite de nos élèves.",
    duration: 10,
    src: VIDEO.excellence,
    poster: VIDEO_POSTER.excellence,
  },
  {
    id: "groupe",
    title: "Vie de groupe",
    description: "Amitié, entraide et vie communautaire.",
    duration: 8,
    src: VIDEO.groupe,
    poster: posterGroupe,
  },
  {
    id: "espaces",
    title: "Nos espaces",
    description: "Salles de classe, cour, préau et infrastructures du complexe.",
    duration: 10,
    src: VIDEO.espaces,
    poster: VIDEO_POSTER.espaces,
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
    description: "Messes régulières, catéchèse et éducation aux valeurs.",
    duration: 7,
    src: VIDEO.groupe,
    poster: posterGroupe,
  },
  {
    id: "sports",
    title: "Sports & bien-être",
    description: "Football, handball, basket-ball et arts martiaux.",
    duration: 8,
    src: VIDEO.sport,
    poster: posterSport,
  },
  {
    id: "arts",
    title: "Clubs & culture",
    description: "Clubs de lecture, théâtre, chorale et action catholique.",
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
  { title: "Discipline", text: "Une rigueur nécessaire associée à une écoute paternelle, selon la pédagogie de saint Louis Orione." },
  { title: "Charité", text: "La charité concrète au cœur de la mission : accueillir, servir, faire grandir chaque enfant." },
  { title: "Excellence", text: "Un parcours complet de la maternelle à la terminale, jusqu'au baccalauréat." },
];

export const levels = [
  {
    slug: "maternelle",
    title: "Maternelle",
    image: PHOTO.etoile,
    summary:
      "Un premier pas serein vers l'école : éveil, langage, motricité et vie en groupe dans un cadre protecteur.",
    points: ["Éveil et langage", "Motricité et jeux encadrés", "Apprentissage de l'autonomie"],
  },
  {
    slug: "primaire",
    title: "Primaire",
    image: PHOTO.primaireEleves,
    summary:
      "Les fondamentaux solidement posés : lire, écrire, compter, raisonner, avec un suivi individualisé.",
    points: ["Lecture et expression écrite", "Mathématiques et raisonnement", "Effectifs maîtrisés"],
  },
  {
    slug: "college",
    title: "Collège",
    image: PHOTO.merite,
    summary:
      "Méthode de travail, culture générale et préparation aux examens dans un climat de discipline bienveillante.",
    points: ["Méthodologie et travail personnel", "Sciences et langues", "Préparation au BEPC"],
  },
  {
    slug: "lycee",
    title: "Lycée",
    image: PHOTO.primaireGroupe,
    summary:
      "Enseignement général jusqu'en terminale, avec une exigence académique orientée vers le baccalauréat.",
    points: ["Enseignement général", "Préparation au baccalauréat", "Orientation et projet d'avenir"],
  },
] as const;

export const values = welcomeBadges;

export const whyProvidence = [
  { title: "Foi & valeurs", text: "Messes régulières, catéchèse et éducation aux valeurs morales." },
  { title: "Résultats", text: "100 % de réussite aux examens nationaux." },
  { title: "Effectifs maîtrisés", text: "Des classes suivies, pour un accompagnement réellement personnalisé." },
  { title: "Infrastructures adaptées", text: "Salles spacieuses, salle informatique, infirmerie et terrains de sport." },
  { title: "Réseau international", text: "Un établissement de la Petite Œuvre de la Divine Providence — Don Orione." },
];

export const infrastructures = [
  { title: "Salles de classe spacieuses", text: "Aérées et conformes aux normes du Ministère, avec des effectifs maîtrisés.", image: PHOTO.salleClasse },
  { title: "Un campus à taille humaine", text: "Bâtiments neufs, préau et espaces verts sur les hauteurs de Bonoua-Château.", image: PHOTO.courPreau },
  { title: "Infirmerie scolaire", text: "Une prise en charge immédiate sur place pour la santé et la sécurité des élèves.", image: PHOTO.infirmerie },
  { title: "Bâtiment du secondaire", text: "Collège et lycée réunis dans un bâtiment à étage dédié.", image: PHOTO.secondaire },
];


export const admissionSteps = [
  { step: "01", title: "Prise de contact", text: "Contactez la direction pour connaître les places disponibles par niveau." },
  { step: "02", title: "Dossier de candidature", text: "Dépôt du dossier avec les pièces demandées selon le cycle visé." },
  { step: "03", title: "Test d'entrée", text: "Le test d'entrée est obligatoire ; les places sont limitées." },
  { step: "04", title: "Inscription", text: "Confirmation de l'admission et finalisation à l'administration." },
];

export const admissionDocs = [
  {
    level: "Maternelle",
    items: ["1 certificat de vaccination", "1 extrait d'acte de naissance original"],
  },
  {
    level: "Primaire",
    items: [
      "1 certificat de scolarité",
      "1 extrait d'acte de naissance original",
      "1 fiche d'inscription",
      "Fiche cursus pour les nouveaux CP2 & CM2",
    ],
  },
  {
    level: "Collège & Lycée",
    items: [
      "1 extrait de naissance",
      "4 photos d'identité",
      "1 chemise dossier",
      "Dernier bulletin de notes",
    ],
  },
];

export const uniforms = [
  { level: "Maternelle", text: "Tissu carrelé marron et blanc (garçons et filles). Tenues disponibles à l'école." },
  { level: "Primaire", text: "Garçons : culotte marron et chemise blanche. Filles : jupe marron et chemise blanche." },
  { level: "Collège & Lycée", text: "Garçons : pantalon et chemise kaki. Filles : jupe bleue et chemise blanche." },
];

export const schoolLife = [
  { title: "Vie de classe", text: "Des effectifs maîtrisés, des enseignants disponibles, un climat propice au travail." },
  { title: "Sport & clubs", text: "Football, handball, basket-ball, clubs de lecture, théâtre et chorale." },
  { title: "Pastorale et valeurs", text: "Messes régulières, catéchèse et mouvements d'action catholique." },
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
    title: "Rentrée scolaire 2026–2027",
    excerpt: "Accueil des élèves et des familles pour le lancement de la nouvelle année.",
    image: PHOTO.batiment,
  },
  {
    id: "merite",
    kind: "photo",
    category: "Excellence",
    title: "Élèves du mois",
    excerpt: "Les élèves distingués reçoivent leur écharpe et leur attestation.",
    image: PHOTO.merite,
  },
  {
    id: "excellence",
    kind: "article",
    category: "Pédagogie",
    title: "Journée de l'excellence",
    excerpt: "Mise à l'honneur du travail et des progrès des élèves du primaire.",
    image: PHOTO.primaireGroupe,
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
    id: "taekwondo",
    kind: "photo",
    category: "Sport",
    title: "Arts martiaux à l'école",
    excerpt: "Discipline, maîtrise de soi et esprit d'équipe dès la maternelle.",
    image: PHOTO.sport,
  },
  {
    id: "etoile",
    kind: "photo",
    category: "Vie de l'école",
    title: "Étoiles du mois",
    excerpt: "Un temps fort mensuel qui encourage l'effort et la régularité.",
    image: PHOTO.etoile,
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
      "Notre mission reste celle de Don Orione : instruire l'esprit et former le cœur, au service des familles.",
    author: "Témoignage de la communauté",
  },
];
