# Rapport hotfix médias Lovable

Date : 2026-08-15

Branche : `agent/hotfix-lovable-media`

Base : `main` (`fe7d38d`)

## Cause et stratégie

Le build Vercel recevait uniquement des fichiers `*.asset.json`. Ceux-ci pointaient vers le proxy privé à Lovable `/__l5e/assets-v1/...`, absent de Vercel, au lieu de contenir les médias binaires.

Les 25 sources encore disponibles ont été récupérées depuis la prévisualisation Lovable du projet. La taille de chaque fichier téléchargé correspond exactement à la taille déclarée dans sa métadonnée. Le bucket Supabase `cms-media` existe, est public en lecture et accepte les formats nécessaires, mais son écriture est volontairement protégée par les politiques administrateur. L'accès présent ne permet pas l'envoi binaire authentifié sans affaiblir ces politiques. Le hotfix utilise donc le repli durable : binaires versionnés dans GitHub et servis par Vercel.

## Inventaire exhaustif

| Type | Fichiers migrés | Destination stable |
|---|---|---|
| Vidéos du carrousel | `hero-cour.mp4`, `hero-classe.mp4`, `hero-sport.mp4`, `hero-groupe.mp4` | `/media/<fichier>` |
| Vidéos officielles | `la-providence-01-institutionnel.mp4`, `la-providence-02-vie-scolaire.mp4`, `la-providence-03-excellence.mp4`, `la-providence-04-espaces.mp4` | `/media/<fichier>` |
| Posters officiels | `poster-01-institutionnel.jpg`, `poster-02-vie-scolaire.jpg`, `poster-03-excellence.jpg`, `poster-04-espaces.jpg` | bundle Vite versionné |
| Images WebP | `primaire-groupe.webp`, `primaire-eleves.webp`, `sport-taekwondo.webp`, `ecole-batiment.webp`, `eleves-merite.webp`, `eleves-etoile.webp` | bundle Vite versionné |
| Images JPEG | `administration.jpg`, `salle-irma-ricci.jpg`, `infirmerie.jpg`, `salle-classe.jpg`, `cour-preau.jpg`, `campus-vue.jpg`, `batiment-secondaire.jpg` | bundle Vite versionné |

Les quatre posters locaux préexistants (`cour.jpg`, `classe.jpg`, `sport.jpg`, `groupe.jpg`) sont conservés comme fallbacks des quatre clips de démonstration.

## Résultats des contrôles

- aucune référence Lovable dans le code source, les fichiers publics ou les métadonnées : **validé** ;
- ESLint : **aucune régression** — `main` compte 158 erreurs / 7 avertissements préexistants, la branche en compte 154 / 7 ;
- TypeScript sans émission : **validé** ;
- build de production : **validé** ;
- tests automatisés : aucun script `test` n'est défini dans le projet ;
- HTTP 200 pour l'ensemble des médias migrés dans l'artefact de build : **25/25 validés** ;
- vidéos et posters du carrousel : types MIME et tailles corrects, **16/16 validés** ;
- GitHub Actions `Quality` : **réussi** ;
- Vercel : déploiement de prévisualisation **Ready**, mais URL protégée par SSO (redirection HTTP 302 vers la connexion Vercel), donc contrôle public HTTP 200 à refaire après authentification ou après fusion.

Les huit MP4 répondent en `video/mp4` et les huit posters en `image/jpeg`. Les tailles HTTP obtenues correspondent aux fichiers sources complets.

La production `https://www.cslaprovidence.org` ne doit pas être modifiée avant validation de ces contrôles et fusion explicite.
