export const admissionFaqs = [
  {
    question: "À partir de quel âge mon enfant peut-il intégrer La Providence ?",
    answer:
      "Les admissions en Maternelle commencent généralement à partir de 3 ans. Pour les autres niveaux, l'âge, le parcours scolaire et les places disponibles sont étudiés par l'administration.",
  },
  {
    question: "Comment se déroule la procédure d'admission ?",
    answer:
      "Après votre préinscription, le secrétariat vous contacte pour confirmer les disponibilités, vérifier le dossier et fixer, lorsque nécessaire, un entretien ou un test d'entrée.",
  },
  {
    question: "Quels niveaux sont proposés par l'établissement ?",
    answer:
      "La Providence accueille les élèves de la Maternelle au Lycée, avec des parcours adaptés à chaque cycle : Maternelle, Primaire, Collège et Lycée.",
  },
  {
    question: "La préinscription garantit-elle une place ?",
    answer:
      "Non. Elle permet à l'administration d'étudier votre demande et de vous recontacter. L'inscription devient définitive après validation du dossier, du test éventuel et du paiement des frais requis.",
  },
  {
    question: "Quand recevrai-je une réponse après l'envoi du formulaire ?",
    answer:
      "L'équipe administrative traite les demandes dans les meilleurs délais pendant les jours ouvrables. Pensez à vérifier l'exactitude de votre téléphone et de votre adresse e-mail.",
  },
] as const;

export const schoolLevels = ["Maternelle", "Primaire", "Collège", "Lycée"] as const;
export type SchoolLevel = (typeof schoolLevels)[number];
