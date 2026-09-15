/**
 * Équipe éducative, mot de la direction et congrégation.
 * Contenus institutionnels : les noms des personnes ne sont pas diffusés ici —
 * l'équipe est présentée par pôle (voir /equipe).
 */

export const directionMessage = {
  eyebrow: "Mot de la direction",
  paragraphs: [
    "Le Complexe Scolaire La Providence de Don Orione accueille vos enfants de la maternelle à la terminale, avec une seule exigence : tenir ensemble l'instruction et l'éducation. Nos salles, nos effectifs maîtrisés et notre équipe éducative sont au service d'un suivi réel de chaque élève.",
    "Notre pédagogie repose sur trois piliers — la discipline, la charité et l'excellence — hérités de saint Louis Orione : une rigueur nécessaire, une écoute paternelle, et l'ambition que chaque enfant donne le meilleur de lui-même.",
    "Cette réussite est un travail commun. Nous comptons sur un dialogue régulier avec les familles : le secrétariat, les enseignants et la direction restent disponibles pour échanger sur le parcours de votre enfant.",
  ],
  signature: "La Direction du Complexe Scolaire La Providence de Don Orione",
};

export type TeamPole = {
  title: string;
  description: string;
};

export const teamPoles: TeamPole[] = [
  {
    title: "Direction & administration",
    description:
      "La direction conduit le projet éducatif, coordonne les cycles et veille au respect du règlement intérieur. Le secrétariat accueille les familles, instruit les dossiers d'admission et suit les inscriptions.",
  },
  {
    title: "Enseignement — maternelle & primaire",
    description:
      "Des enseignants titulaires, appuyés par des assistants, posent les fondamentaux : lire, écrire, compter, raisonner — avec un suivi individualisé et des effectifs maîtrisés.",
  },
  {
    title: "Enseignement — collège & lycée",
    description:
      "Professeurs de disciplines, méthodologie et préparation aux examens nationaux (CEPE, BEPC, baccalauréat), dans un climat de travail exigeant et bienveillant.",
  },
  {
    title: "Vie scolaire & pastorale",
    description:
      "Animation des temps forts, vie spirituelle, clubs, sport et éducation aux valeurs : l'accompagnement humain et la formation du caractère au quotidien.",
  },
  {
    title: "Santé & soutien",
    description:
      "Une infirmerie scolaire permet une prise en charge immédiate. Les difficultés d'apprentissage sont repérées et signalées aux familles pour un accompagnement adapté.",
  },
  {
    title: "Services généraux",
    description:
      "Entretien des locaux, sécurité à l'entrée et à la sortie, restauration et transport : les services qui rendent la journée d'école sereine pour les élèves comme pour les parents.",
  },
];

export const congregation = {
  name: "Petite Œuvre de la Divine Providence — Don Orione",
  founder: "Saint Louis Orione (1872–1940)",
  quote: "« Seule la charité sauvera le monde. »",
  intro:
    "L'établissement appartient à la famille spirituelle de la Petite Œuvre de la Divine Providence, fondée par saint Louis Orione, prêtre italien qui a consacré sa vie à l'éducation des enfants les plus pauvres. Cette histoire éclaire notre manière d'accueillir chaque élève.",
  milestones: [
    { year: "1872", text: "Naissance de Luigi Orione à Pontecurone, en Italie." },
    { year: "1892", text: "Ouverture du premier oratoire, destiné à réunir les enfants des rues." },
    {
      year: "1893",
      text: "Naissance de la Petite Œuvre de la Divine Providence, autour d'un collège accueillant une centaine d'enfants.",
    },
    { year: "1895", text: "Ordination sacerdotale de Louis Orione, le 13 avril." },
    { year: "1903", text: "Fondation de la congrégation religieuse, à Tortona." },
    { year: "1980", text: "Béatification par saint Jean-Paul II, le 26 octobre." },
    {
      year: "2004",
      text: "Canonisation à Rome par saint Jean-Paul II, le 16 mai. L'Église le fête le 12 mars.",
    },
  ],
  heritage: [
    "L'éducation des enfants comme priorité, en particulier des plus fragiles.",
    "Une discipline bienveillante : la règle n'exclut pas l'écoute, elle la rend possible.",
    "Le sens du service et de la charité concrète, au quotidien.",
  ],
};
