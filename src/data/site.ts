import { SITE_HOST } from "@/lib/seo";
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
  {
    src: PHOTO.administration,
    title: "Administration",
    text: "Le bâtiment administratif et la place du drapeau, à l'entrée du campus.",
  },
  {
    src: PHOTO.secondaire,
    title: "Bâtiment du primaire",
    text: "Le bâtiment à étage qui accueille les classes du primaire.",
  },
  {
    src: PHOTO.salleClasse,
    title: "Salles de classe",
    text: "Des salles neuves, lumineuses et équipées de mobilier individuel.",
  },
  {
    src: PHOTO.salleIrmaRicci,
    title: "Salle Irma Ricci",
    text: "Les salles du primaire, ouvertes sur le préau et bien ventilées.",
  },
  {
    src: PHOTO.infirmerie,
    title: "Infirmerie scolaire",
    text: "Une infirmerie équipée pour la prise en charge immédiate des élèves.",
  },
  {
    src: PHOTO.courPreau,
    title: "Préau & cour",
    text: "Le préau du primaire et la cour centrale, cœur de la vie de l'école.",
  },
  {
    src: PHOTO.campus,
    title: "Vue du complexe",
    text: "Un site spacieux et verdoyant sur les hauteurs de Bonoua-Château.",
  },
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
  /** Domaine canonique, dérivé de l'URL publique pour éviter toute divergence. */
  website: SITE_HOST,
  /** Informations légales (mentions légales, politique de confidentialité). */
  legal: {
    entity: "Complexe Scolaire Catholique La Providence de Don Orione",
    congregation: "Congrégation Petite Œuvre de la Divine Providence — Don Orione (Orionins)",
    publicationDirector: "Le Directeur du Complexe Scolaire La Providence de Don Orione",
    /** Numéro d'agrément / d'autorisation d'ouverture délivré par le Ministère (à renseigner dès réception). */
    approval: null as string | null,
    host: {
      name: "Vercel Inc.",
      address: "440 N Barranca Ave #4133, Covina, CA 91723, États-Unis",
      website: "vercel.com",
    },
  },
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
    { label: "Site web", href: "#", note: SITE_HOST },
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
  {
    title: "Discipline",
    text: "Une rigueur nécessaire associée à une écoute paternelle, selon la pédagogie de saint Louis Orione.",
  },
  {
    title: "Charité",
    text: "La charité concrète au cœur de la mission : accueillir, servir, faire grandir chaque enfant.",
  },
  {
    title: "Excellence",
    text: "Un parcours complet de la maternelle à la terminale, jusqu'au baccalauréat.",
  },
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
    points: [
      "Lecture et expression écrite",
      "Mathématiques et raisonnement",
      "Effectifs maîtrisés",
    ],
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
    points: [
      "Enseignement général",
      "Préparation au baccalauréat",
      "Orientation et projet d'avenir",
    ],
  },
] as const;

export const values = welcomeBadges;

export const whyProvidence = [
  {
    title: "Foi & valeurs",
    text: "Messes régulières, catéchèse et éducation aux valeurs morales.",
  },
  { title: "Résultats", text: "100 % de réussite aux examens nationaux." },
  {
    title: "Effectifs maîtrisés",
    text: "Des classes suivies, pour un accompagnement réellement personnalisé.",
  },
  {
    title: "Infrastructures adaptées",
    text: "Salles spacieuses, salle informatique, infirmerie et terrains de sport.",
  },
  {
    title: "Réseau international",
    text: "Un établissement de la Petite Œuvre de la Divine Providence — Don Orione.",
  },
];

export const infrastructures = [
  {
    title: "Salles de classe spacieuses",
    text: "Aérées et conformes aux normes du Ministère, avec des effectifs maîtrisés.",
    image: PHOTO.salleClasse,
  },
  {
    title: "Un campus à taille humaine",
    text: "Bâtiments neufs, préau et espaces verts sur les hauteurs de Bonoua-Château.",
    image: PHOTO.courPreau,
  },
  {
    title: "Infirmerie scolaire",
    text: "Une prise en charge immédiate sur place pour la santé et la sécurité des élèves.",
    image: PHOTO.infirmerie,
  },
  {
    title: "Bâtiment du secondaire",
    text: "Collège et lycée réunis dans un bâtiment à étage dédié.",
    image: PHOTO.secondaire,
  },
];

export const admissionSteps = [
  {
    step: "01",
    title: "Prise de contact",
    text: "Contactez la direction pour connaître les places disponibles par niveau.",
  },
  {
    step: "02",
    title: "Dossier de candidature",
    text: "Dépôt du dossier avec les pièces demandées selon le cycle visé.",
  },
  {
    step: "03",
    title: "Test d'entrée",
    text: "Le test d'entrée est obligatoire ; les places sont limitées.",
  },
  {
    step: "04",
    title: "Inscription",
    text: "Confirmation de l'admission et finalisation à l'administration.",
  },
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
  {
    level: "Maternelle",
    text: "Tissu carrelé marron et blanc (garçons et filles). Tenues disponibles à l'école.",
  },
  {
    level: "Primaire",
    text: "Garçons : culotte marron et chemise blanche. Filles : jupe marron et chemise blanche.",
  },
  {
    level: "Collège & Lycée",
    text: "Garçons : pantalon et chemise kaki. Filles : jupe bleue et chemise blanche.",
  },
];

export const schoolLife = [
  {
    title: "Vie de classe",
    text: "Des effectifs maîtrisés, des enseignants disponibles, un climat propice au travail.",
  },
  {
    title: "Sport & clubs",
    text: "Football, handball, basket-ball, clubs de lecture, théâtre et chorale.",
  },
  {
    title: "Pastorale et valeurs",
    text: "Messes régulières, catéchèse et mouvements d'action catholique.",
  },
  {
    title: "Encadrement",
    text: "Une équipe éducative attentive à la présence, au comportement et aux progrès.",
  },
];

export type NewsItem = {
  id: string;
  /** Identifiant d'URL de l'article (page /actualites/$slug). */
  slug: string;
  kind: "article" | "photo" | "video";
  category: string;
  title: string;
  excerpt: string;
  /** Date de publication au format ISO (AAAA-MM-JJ). */
  date: string;
  /** Paragraphes du corps de l'article. */
  body: string[];
  image?: string;
  video?: string;
};

export const news: NewsItem[] = [
  {
    id: "rentree",
    slug: "rentree-scolaire-2026-2027",
    kind: "article",
    category: "Vie de l'école",
    title: "Rentrée scolaire 2026–2027",
    excerpt: "Accueil des élèves et des familles pour le lancement de la nouvelle année.",
    date: "2026-09-07",
    body: [
      "La communauté éducative a accueilli les élèves et leurs familles pour le lancement de l'année scolaire 2026–2027, sur le site de Bonoua-Château.",
      "Les équipes pédagogiques ont présenté le fonctionnement de l'année : rythme des évaluations, suivi individualisé, activités pastorales et sportives, et modalités de contact avec les enseignants.",
      "Les familles qui n'ont pas encore finalisé leur dossier sont invitées à se rapprocher du secrétariat, aux horaires d'ouverture de l'établissement.",
    ],
    image: PHOTO.batiment,
  },
  {
    id: "merite",
    slug: "eleves-du-mois",
    kind: "photo",
    category: "Excellence",
    title: "Élèves du mois",
    excerpt: "Les élèves distingués reçoivent leur écharpe et leur attestation.",
    date: "2026-06-12",
    body: [
      "Chaque mois, les élèves qui se sont distingués par leurs efforts, leur régularité et leur comportement reçoivent une écharpe et une attestation.",
      "Cette distinction valorise autant les progrès scolaires que les qualités humaines : entraide, respect et sens du service, au cœur de la pédagogie de saint Louis Orione.",
    ],
    image: PHOTO.merite,
  },
  {
    id: "excellence",
    slug: "journee-de-lexcellence",
    kind: "article",
    category: "Pédagogie",
    title: "Journée de l'excellence",
    excerpt: "Mise à l'honneur du travail et des progrès des élèves du primaire.",
    date: "2026-05-22",
    body: [
      "La journée de l'excellence met à l'honneur le travail régulier et les progrès réalisés par les élèves du primaire tout au long de l'année.",
      "Au programme : remise d'attestations, exposition de travaux d'élèves et temps d'échange entre enseignants et familles sur les méthodes de travail.",
    ],
    image: PHOTO.primaireGroupe,
  },
  {
    id: "sortie",
    slug: "sortie-pedagogique",
    kind: "video",
    category: "Pédagogie",
    title: "Sortie pédagogique",
    excerpt: "Une découverte hors les murs pour apprendre autrement.",
    date: "2026-04-03",
    body: [
      "Les sorties pédagogiques prolongent les apprentissages de la classe par une découverte concrète du milieu qui entoure les élèves.",
      "Encadrées par l'équipe éducative, elles sont préparées en amont en classe et font l'objet d'un retour d'expérience avec les élèves.",
    ],
    image: posterCour,
    video: VIDEO.cour,
  },
  {
    id: "taekwondo",
    slug: "arts-martiaux-a-lecole",
    kind: "photo",
    category: "Sport",
    title: "Arts martiaux à l'école",
    excerpt: "Discipline, maîtrise de soi et esprit d'équipe dès la maternelle.",
    date: "2026-03-18",
    body: [
      "Les arts martiaux sont proposés comme activité d'éveil corporel et de maîtrise de soi, y compris chez les plus jeunes.",
      "Au-delà de la technique, les séances travaillent la concentration, le respect des règles et la confiance en soi.",
    ],
    image: PHOTO.sport,
  },
  {
    id: "etoile",
    slug: "etoiles-du-mois",
    kind: "photo",
    category: "Vie de l'école",
    title: "Étoiles du mois",
    excerpt: "Un temps fort mensuel qui encourage l'effort et la régularité.",
    date: "2026-02-13",
    body: [
      "Le temps fort mensuel des « étoiles » encourage l'effort et la régularité dans le travail comme dans la vie de la classe.",
      "Chaque étoile est attribuée en présence des camarades, afin de valoriser l'exemple donné au quotidien.",
    ],
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

/** Détail d'un cycle : alimente les pages /formations/$slug. */
export type LevelDetail = {
  slug: string;
  title: string;
  /** Tranche d'âges indicatifs. */
  ages: string;
  /** Classes concernées. */
  classes: string;
  schedule: string;
  /** Examen préparé (null si aucun examen national). */
  exam: string | null;
  intro: string;
  /** Blocs du programme. */
  programme: { title: string; items: string[] }[];
  /** Points forts affichés en encadré. */
  highlights: string[];
  image: string;
};

export const levelDetails: LevelDetail[] = [
  {
    slug: "maternelle",
    title: "Maternelle",
    ages: "De 3 à 5 ans",
    classes: "Petite, Moyenne et Grande section",
    schedule: "Lundi — Vendredi · 07h45 – 16h30",
    exam: null,
    intro:
      "Un premier pas serein vers l'école : éveil, langage, motricité et vie en groupe dans un cadre protecteur, où chaque enfant est accueilli par une équipe formée à la petite enfance.",
    programme: [
      {
        title: "Éveil et langage",
        items: [
          "Comptines, histoires et jeux de vocabulaire",
          "Développement du langage oral et de l'écoute",
          "Premiers repères sur les nombres et les formes",
        ],
      },
      {
        title: "Motricité et expression",
        items: [
          "Jeux moteurs encadrés et psychomotricité",
          "Dessin, peinture, chant et jeux de rôle",
          "Découverte du corps et de l'espace",
        ],
      },
      {
        title: "Autonomie et vie en groupe",
        items: [
          "Apprentissage des règles de vie collective",
          "Gestes du quotidien : rangement, hygiène, repas",
          "Temps de calme et sieste pour les plus jeunes",
        ],
      },
    ],
    highlights: [
      "Encadrement rapproché et locaux adaptés aux jeunes enfants",
      "Éveil religieux adapté à l'âge, dans l'esprit de Don Orione",
      "Activités ludiques qui préparent aux apprentissages du CP",
      "Accueil progressif en début d'année, en lien avec les familles",
    ],
    image: PHOTO.etoile,
  },
  {
    slug: "primaire",
    title: "Primaire",
    ages: "De 6 à 11 ans",
    classes: "CP1, CP2, CE1, CE2, CM1, CM2",
    schedule: "Lundi — Vendredi · 07h30 – 16h30",
    exam: "CEPE",
    intro:
      "Les fondamentaux solidement posés : lire, écrire, compter, raisonner. Les effectifs maîtrisés permettent un suivi individualisé et un dialogue régulier avec les familles.",
    programme: [
      {
        title: "Français et communication",
        items: [
          "Lecture fluide et compréhension de textes",
          "Expression écrite : phrase, rédaction, orthographe",
          "Récitation et expression orale",
        ],
      },
      {
        title: "Mathématiques et raisonnement",
        items: [
          "Numération et opérations",
          "Géométrie, mesures et résolution de problèmes",
          "Initiation au raisonnement logique",
        ],
      },
      {
        title: "Découverte du monde et éducation",
        items: [
          "Sciences et observation du milieu",
          "Histoire, géographie et éducation à la citoyenneté",
          "Éducation artistique, sportive et formation humaine",
        ],
      },
    ],
    highlights: [
      "Effectifs maîtrisés pour un accompagnement individualisé",
      "Évaluations régulières et liaison continue avec les parents",
      "Préparation progressive aux exigences du collège",
      "Vie spirituelle et éducation aux valeurs orionines",
    ],
    image: PHOTO.primaireEleves,
  },
  {
    slug: "college",
    title: "Collège",
    ages: "De 11 à 15 ans",
    classes: "6ᵉ, 5ᵉ, 4ᵉ et 3ᵉ",
    schedule: "Lundi — Vendredi · 07h30 – 17h30",
    exam: "BEPC",
    intro:
      "Méthode de travail, culture générale et préparation aux examens dans un climat de discipline bienveillante : le collège consolide les fondamentaux et installe une vraie autonomie.",
    programme: [
      {
        title: "Disciplines fondamentales",
        items: [
          "Français, mathématiques et langues vivantes",
          "Histoire-géographie et éducation à la citoyenneté",
          "Sciences de la vie et de la Terre, sciences physiques",
        ],
      },
      {
        title: "Méthodologie",
        items: [
          "Organisation du travail personnel et gestion du temps",
          "Prise de notes, recherche documentaire, exposés",
          "Préparation aux épreuves écrites et orales du BEPC",
        ],
      },
      {
        title: "Formation humaine",
        items: [
          "Suivi individualisé et entretiens réguliers",
          "Vie spirituelle, catéchèse et actions solidaires",
          "Sport, clubs et engagement dans la vie de l'établissement",
        ],
      },
    ],
    highlights: [
      "Suivi personnalisé : points réguliers sur les résultats",
      "Préparation structurée au BEPC, avec examens blancs",
      "Discipline bienveillante, dans l'esprit de saint Louis Orione",
      "Bâtiment dédié au second cycle, salles équipées",
    ],
    image: PHOTO.merite,
  },
  {
    slug: "lycee",
    title: "Lycée",
    ages: "De 15 à 18 ans",
    classes: "2ᵉ, 1ʳᵉ et Terminale",
    schedule: "Lundi — Vendredi · 07h30 – 17h30",
    exam: "Baccalauréat",
    intro:
      "Enseignement général jusqu'en terminale, avec une exigence académique orientée vers le baccalauréat et vers la construction du projet d'orientation de chaque élève.",
    programme: [
      {
        title: "Enseignement général",
        items: [
          "Français, philosophie, langues vivantes",
          "Mathématiques, sciences physiques, SVT",
          "Histoire-géographie et sciences économiques et sociales",
        ],
      },
      {
        title: "Préparation au baccalauréat",
        items: [
          "Entraînement aux épreuves et examens blancs",
          "Méthodologie des dissertations et commentaires",
          "Accompagnement au contrôle continu",
        ],
      },
      {
        title: "Orientation et projet d'avenir",
        items: [
          "Information sur les filières post-bac et métiers",
          "Aide à la constitution des dossiers et à Parcoursup",
          "Rencontres avec des professionnels et anciens élèves",
        ],
      },
    ],
    highlights: [
      "Accompagnement individualisé vers la réussite au baccalauréat",
      "Conseil en orientation dès la classe de première",
      "Exigence académique et respect de la personne",
      "Une école catholique qui forme le cœur autant que l'esprit",
    ],
    image: PHOTO.primaireGroupe,
  },
];
