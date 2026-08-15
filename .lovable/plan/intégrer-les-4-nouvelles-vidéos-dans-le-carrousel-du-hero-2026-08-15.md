# Intégrer les 4 nouvelles vidéos dans le carrousel du hero

Les 4 vidéos envoyées (institutionnel, vie scolaire, excellence, espaces) font chacune 10 s en 1920x1080. Elles seront ajoutées au carrousel vidéo de la page d'accueil, intercalées entre les 4 clips de démo déjà présents.

## Ordre final du carrousel (8 clips)

1. Élèves dans la cour (existant)
2. La Providence — présentation (nouveau, institutionnel)
3. En classe (existant)
4. Vie scolaire au quotidien (nouveau)
5. Sport (existant)
6. Excellence et réussite (nouveau)
7. Vie de groupe (existant)
8. Nos espaces (nouveau, espaces)

Les compteurs « 01 … 08 », la durée affichée (10 sec pour les nouvelles), la progression, le crossfade, le chargement intelligent (clip courant + suivant) et l'auto-hide des contrôles continuent de fonctionner sans changement de comportement.

## Détails techniques

- Upload des 4 MP4 sur le CDN via `lovable-assets`, avec pointeurs dans `public/media/` (même schéma que les vidéos existantes).
- Extraction d'une image de poster (première seconde) pour chaque vidéo, également hébergée en asset, afin de garder un affichage immédiat avant lecture.
- Ajout des 4 entrées dans `heroSlides` (`src/data/site.ts`) aux positions indiquées, avec `duration: 10`, titre et description en français.
- Aucun changement dans `HeroVideoCarousel.tsx` : il est déjà piloté par les données.
- Le carrousel « Vie scolaire » reste inchangé (dites-le moi si vous voulez y remplacer aussi les clips de démo).
- Vérification : typecheck et rendu de la page d'accueil (desktop + mobile) pour confirmer la lecture d'au moins la première nouvelle vidéo.
