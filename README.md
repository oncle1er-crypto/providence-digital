# Providence Digital

Crée un NOUVEAU PROJET WEB totalement indépendant : « Complexe Scolaire La Providence de Don Orione — Site officiel ».

RÈGLE ABSOLUE : ne clone, ne remixe, ne connecte et ne réutilise rien du projet existant `gs-laprovidence` : aucun code, aucune base Supabase, aucune API, aucune donnée, aucun composant, aucune route, aucune authentification. Ce nouveau projet doit avoir son propre code et sa propre architecture. Le SEUL élément autorisé à être repris est le logo officiel de l’école. Tu peux récupérer uniquement ce logo depuis `https://gs-laprovidence.lovable.app/logo-gsp.png`, puis le copier localement dans le nouveau projet afin de supprimer toute dépendance à l’ancien site. Ne récupère aucun autre asset. Si le logo ne peut pas être récupéré, affiche temporairement « LOGO OFFICIEL À INSÉRER » sans en inventer un.

Ne crée aucune base de données pour cette première version et ne déploie pas en production avant validation.

CONTEXTE : Complexe Scolaire La Providence de Don Orione, Bonoua, Côte d’Ivoire. Établissement catholique, Maternelle • Primaire • Collège. Palette : bordeaux/rouge profond dominant, doré en accent, blanc, crème, anthracite. Site public d’école, pas un dashboard ni un SaaS.

OBJECTIF : créer de zéro un site institutionnel premium 2026, moderne, chaleureux, rapide, mobile-first et très responsive, avec un grand hero immersif et une navigation transparente au-dessus de la vidéo. Inspiration générale : qualité visuelle des meilleurs sites d’écoles internationales, sans copier Brookhouse.

HEADER : logo + nom à gauche ; Accueil, Notre école, Formations, Vie scolaire, Actualités, Admissions, Contact ; CTA « Demander une inscription » ; secondaire « Visiter l’école ». Transparent sur le hero puis sticky avec fond/blur au scroll. Menu hamburger premium sur mobile.

PRIORITÉ ABSOLUE : HERO = vrai CARROUSEL VIDÉO de 4 clips courts de 5 à 10 secondes, pas une image statique. Démo : 1) élèves dans la cour 8 sec, 2) classe 7 sec, 3) sport 6 sec, 4) vie de groupe 8 sec. Si les vidéos définitives ne sont pas fournies, utilise de vraies vidéos temporaires adaptées à une école africaine, facilement remplaçables. Au moins UNE vraie vidéo doit fonctionner dès cette première version.

Comportement : autoplay, muted, playsInline, pas de contrôles HTML natifs, passage automatique, boucle, crossfade 500–1000 ms, overlay sombre lisible, poster/fallback, prefers-reduced-motion. Contrôles personnalisés : « Vidéo 01 • 8 sec », Play/Pause, progression, temps « 0:02 / 0:08 », mute/unmute, éventuellement fullscreen, sélecteurs 01 02 03 04 avec actif en doré.

Hero : titre « Former l’esprit, élever le cœur. » ; sous-titre « École catholique d’excellence à Bonoua » ; CTA « Demander une inscription » et « Visiter l’école ».

SECTIONS :
1. Bienvenue — « La Providence de Don Orione », mission catholique, badges Foi & Valeurs / Excellence académique / Ouverture & Service, CTA « Découvrir notre histoire ».
2. Carte « Admissions ouvertes — Année scolaire 2026–2027 » avec CTA « Commencer une préinscription » (démo, pas de backend réel).
3. « Nos niveaux d’enseignement » : Maternelle, Primaire, Collège, grandes cartes photo premium.
4. « Vie scolaire » : carrousel horizontal de mini-vidéos 5–10 sec avec play, durée, titre, description, flèches, pagination, swipe mobile. Contenus : Apprentissage en classe 6 sec, Vie spirituelle 7 sec, Sports & bien-être 8 sec, Arts & culture 9 sec, Vie étudiante 7 sec.
5. Bande bordeaux « Pourquoi choisir La Providence ? » : Foi & valeurs, Enseignants qualifiés, Effectifs à taille humaine, Infrastructure adaptée, Expérience — ne jamais inventer un nombre d’années.
6. « Actualités & événements » : carrousel responsive mêlant articles/photos/vidéos courtes : rentrée, Saint Luigi Orione, excellence, sortie pédagogique, tournoi, retraite spirituelle.
7. « Ils témoignent » : carousel, 3 desktop / 1 mobile, catégories Élève, Parent, Enseignant, Responsable religieux ; pas de faux noms réels.
8. Footer premium bordeaux sombre : logo, nom complet, colonnes Notre école / Formations / Vie scolaire / Informations, réseaux sociaux et contacts. Tout contact non fourni doit être marqué comme placeholder, pas inventé.

RESPONSIVE : tester visuellement 375, 390, 430, 768, 1024, 1280, 1440, 1920 px. Aucun débordement horizontal. Adapter réellement hero, navigation, textes, vidéos et carrousels.

PERFORMANCE : vidéos MP4/WebM optimisées, poster, charger prioritairement seulement la première vidéo, précharger intelligemment seulement la suivante, lazy-load des autres, ne pas télécharger toutes les vidéos lourdes au premier chargement, images WebP/AVIF, dépendances légères.

ACCESSIBILITÉ : contraste, clavier, focus visible, aria-label, alt, contrôles Play/Pause accessibles, grandes cibles tactiles, prefers-reduced-motion.

SEO : title « Complexe Scolaire La Providence de Don Orione | Bonoua » ; meta description centrée sur Maternelle, Primaire, Collège à Bonoua ; Open Graph, favicon, robots.txt, sitemap, données structurées School/EducationalOrganization si adaptées.

ARCHITECTURE : TypeScript + Tailwind + composants propres : Header, HeroVideoCarousel, VideoCarousel, VideoCard, SchoolLevels, AdmissionsCTA, WhyProvidence, NewsCarousel, Testimonials, Footer. Piloter les slides par tableaux de données, pas de JSX dupliqué. Préparer l’architecture pour un futur CMS/admin, sans construire de backend lourd maintenant.

TYPOGRAPHIE : titres Serif premium (Playfair Display / Cormorant Garamond ou équivalent), UI en Inter/Manrope ou équivalent.

NE PAS INVENTER : téléphone, email, résultats scolaires, nombre d’élèves, noms des responsables, année de création ou adresse précise.

À la fin : exécute réellement les vérifications disponibles (build/TypeScript/rendu), puis donne un rapport court avec fichiers créés, composants, vidéo de démo utilisée, tests réellement exécutés, responsive vérifié et contenus à remplacer. Ne publie pas en production.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/f8a3f369-cda0-4cd5-a897-575e3cd00f50).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
