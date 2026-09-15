# Complexe Scolaire La Providence de Don Orione

Site officiel du Complexe Scolaire La Providence de Don Orione — Bonoua, Côte d'Ivoire.
Maternelle • Primaire • Collège • Lycée.

## Développement

Prérequis : Node.js (ou Bun) et npm.

```sh
git clone <url-du-depot>
cd <nom-du-depot>
npm i
npm run dev
```

## Stack technique

- TanStack Start (SSR, routes fichiers)
- TypeScript
- React
- Tailwind CSS v4
- Supabase (CMS léger & formulaires)

## Structure des pages

| Route                        | Contenu                                              |
| ---------------------------- | ---------------------------------------------------- |
| `/`                          | Accueil (hero vidéo, cycles, actualités, témoignages) |
| `/notre-ecole`               | Projet éducatif, valeurs, infrastructures             |
| `/equipe`                    | Mot de la direction, pôles de l'équipe, congrégation  |
| `/formations`                | Présentation des cycles                              |
| `/formations/$slug`          | Détail d'un cycle (maternelle, primaire, collège, lycée) |
| `/vie-scolaire`              | Vie quotidienne                                      |
| `/actualites`                | Liste des actualités                                 |
| `/actualites/$slug`          | Article (contenu du CMS)                             |
| `/admissions`                | Procédure, pièces à fournir, préinscription          |
| `/frais-scolarite`           | Ce que comprennent les frais, modalités de paiement  |
| `/calendrier`                | Rentrée, trimestres, congés, examens, inscriptions   |
| `/contact`                   | Coordonnées, itinéraire et formulaire de contact     |
| `/mentions-legales`          | Éditeur, hébergement, propriété intellectuelle       |
| `/politique-confidentialite` | Données personnelles et cookies                      |
| `/admin`, `/admin-contenu`   | Espace d'administration (non indexé)                 |

Les routes `formations` et `actualites` sont des routes « layout » : la liste vit dans
`*.index.tsx`, le détail dans `*.$slug.tsx`.

## Configuration

Copier `.env.example` vers `.env.local` puis compléter :

| Variable                          | Rôle                                                        |
| --------------------------------- | ----------------------------------------------------------- |
| `VITE_SUPABASE_URL`               | URL du projet Supabase                                      |
| `VITE_SUPABASE_PUBLISHABLE_KEY`   | Clé publique Supabase (les droits sont gérés par les RLS)   |
| `VITE_SITE_URL`                   | Domaine public, utilisé pour les URL canoniques et le sitemap |

## Base de données

Les migrations Supabase sont dans `supabase/migrations/`. La dernière
(`*_add_contact_messages.sql`) crée la table recevant les messages du formulaire de
contact ; elle doit être appliquée pour que le formulaire fonctionne.

## Qualité

```sh
npm run lint      # ESLint
npx tsc --noEmit  # types (après un build, qui génère src/routeTree.gen.ts)
npm run build     # build de production
```
