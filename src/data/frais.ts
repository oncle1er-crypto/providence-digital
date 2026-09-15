/**
 * Frais de scolarité.
 *
 * Les montants ne sont pas diffusés sur le site : ils sont communiqués par le
 * secrétariat, qui adapte la grille à chaque cycle. Les tableaux restent prêts à
 * l'emploi (voir `rows`) : il suffit de renseigner les montants pour les afficher.
 */

export const tuitionYear = "2026–2027";

export type TuitionRow = {
  cycle: string;
  /** Frais de dossier et d'inscription. */
  inscription: string | null;
  /** Frais de scolarité annuels. */
  scolarite: string | null;
  /** Cantine / restauration. */
  restauration: string | null;
  /** Transport scolaire. */
  transport: string | null;
};

export const tuitionRows: TuitionRow[] = [
  { cycle: "Maternelle", inscription: null, scolarite: null, restauration: null, transport: null },
  { cycle: "Primaire", inscription: null, scolarite: null, restauration: null, transport: null },
  { cycle: "Collège", inscription: null, scolarite: null, restauration: null, transport: null },
  { cycle: "Lycée", inscription: null, scolarite: null, restauration: null, transport: null },
];

export const tuitionIncluded = [
  "L'enseignement et l'accompagnement pédagogique sur l'année scolaire.",
  "L'accès aux infrastructures : salles de classe, préau, espaces sportifs, salle informatique.",
  "Le suivi de la vie scolaire : encadrement, vie spirituelle, clubs et activités.",
  "La prise en charge de première urgence à l'infirmerie scolaire.",
];

export const tuitionNotIncluded = [
  "L'uniforme scolaire, disponible à l'école selon le cycle.",
  "Les fournitures scolaires et les manuels.",
  "Les frais liés aux sorties pédagogiques et aux examens officiels.",
  "La restauration et le transport scolaire, lorsqu'ils sont demandés.",
];

export const tuitionPayment = [
  "Les frais sont réglés auprès du secrétariat, qui remet un reçu pour chaque versement.",
  "Un échéancier est communiqué lors de l'inscription ; il tient compte du cycle et de la date d'arrivée de l'élève.",
  "Les modalités particulières (fratries, réductions, situations exceptionnelles) sont étudiées par la direction.",
  "Toute question relative à la facturation est traitée par l'administration, pendant les heures d'ouverture.",
];

export const tuitionNote =
  "Les montants ne sont pas publiés en ligne : le secrétariat les communique directement aux familles, avec l'échéancier correspondant au cycle demandé.";
