/**
 * Calendrier de l'année scolaire.
 * Périodes indicatives : elles suivent le rythme habituel de l'enseignement en
 * Côte d'Ivoire. Les dates exactes sont communiquées par le secrétariat, qui
 * reste la seule référence officielle.
 */

export const calendarYear = "2026–2027";

export type CalendarPeriod = {
  id: string;
  period: string;
  title: string;
  description: string;
  kind: "rentree" | "trimestre" | "vacances" | "examens" | "inscriptions";
};

export const calendarPeriods: CalendarPeriod[] = [
  {
    id: "rentree",
    period: "Septembre",
    title: "Rentrée scolaire",
    description:
      "Accueil des élèves et des familles, remise des emplois du temps et présentation des enseignants. Les fournitures et l'uniforme sont à prévoir dès cette période.",
    kind: "rentree",
  },
  {
    id: "trimestre-1",
    period: "Octobre — Décembre",
    title: "Premier trimestre",
    description:
      "Installations des méthodes de travail, évaluations et premier conseil de classe. Les familles sont reçues sur rendez-vous pour faire le point.",
    kind: "trimestre",
  },
  {
    id: "vacances-noel",
    period: "Décembre — Janvier",
    title: "Vacances de Noël",
    description:
      "Interruption des cours sur la période des fêtes. Les dates précises de fermeture et de reprise sont affichées au secrétariat.",
    kind: "vacances",
  },
  {
    id: "trimestre-2",
    period: "Janvier — Mars",
    title: "Deuxième trimestre",
    description:
      "Poursuite des apprentissages, évaluations de mi-parcours et temps forts de la vie scolaire (sport, culture, pastorale).",
    kind: "trimestre",
  },
  {
    id: "vacances-paques",
    period: "Mars — Avril",
    title: "Vacances de Pâques",
    description:
      "Pause scolaire autour des fêtes pascales, temps fort de la vie spirituelle pour les élèves qui le souhaitent.",
    kind: "vacances",
  },
  {
    id: "trimestre-3",
    period: "Avril — Juin",
    title: "Troisième trimestre",
    description:
      "Dernière ligne droite : examens blancs, révisions et conseils de classe de fin d'année.",
    kind: "trimestre",
  },
  {
    id: "examens",
    period: "Juin — Juillet",
    title: "Examens nationaux",
    description:
      "Sessions du CEPE, du BEPC et du baccalauréat selon le calendrier officiel. Les convocations sont remises aux candidats par l'administration.",
    kind: "examens",
  },
  {
    id: "grandes-vacances",
    period: "Juillet — Août",
    title: "Grandes vacances",
    description:
      "Fermeture annuelle de l'établissement, hors permanences indiquées par le secrétariat pour les inscriptions.",
    kind: "vacances",
  },
  {
    id: "inscriptions",
    period: "À partir de mai",
    title: "Inscriptions & réinscriptions",
    description:
      "Ouverture des préinscriptions pour l'année suivante. Les places étant limitées par niveau, les familles sont invitées à se manifester tôt.",
    kind: "inscriptions",
  },
  {
    id: "portes-ouvertes",
    period: "Toute l'année",
    title: "Visites sur rendez-vous",
    description:
      "Les familles souhaitant découvrir les salles, le préau, l'infirmerie et les terrains de sport peuvent convenir d'une visite avec le secrétariat.",
    kind: "inscriptions",
  },
];

export const calendarNote =
  "Les périodes ci-dessus sont données à titre indicatif. Les dates exactes (rentrée, compositions, congés, examens) sont communiquées officiellement par le secrétariat de l'établissement.";

export const periodLabels: Record<CalendarPeriod["kind"], string> = {
  rentree: "Rentrée",
  trimestre: "Trimestre",
  vacances: "Vacances",
  examens: "Examens",
  inscriptions: "Admissions",
};
