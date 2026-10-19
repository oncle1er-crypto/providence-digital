# Audit et intégration progressive des animations — La Providence

## Conclusion

Le dépôt contient quatre expériences, mais **une seule utilise réellement Three.js et WebGL**. Pour le site scolaire, la meilleure inspiration est la séquence d’entrée des textes : elle peut enrichir le carrousel vidéo sans changer l’identité du site. Le lapin animé et l’objet 3D abstrait n’apportent pas de valeur institutionnelle suffisante ; je recommande de ne pas les intégrer.

**Aucune animation, donnée, authentification, API ou fonctionnalité du site n’a été modifiée pendant cet audit. Aucun déploiement en production.** Une mise à jour de sécurité des paquets a été appliquée séparément.

## 1. Animations réellement présentes dans le dépôt

Audit de la branche `main`, commit `ff7b6d633bd4c14f92ea15f2be92ef86032e649a` du 30 janvier 2026. README, arborescence et sources consultés.

| Expérience vérifiée | Effet et technologie réels | Emplacement recommandé dans le site | Difficulté | Impact potentiel |
| --- | --- | --- | --- | --- |
| **Interactive Header Sequence** | GSAP : entrée des titres, du paragraphe et du bouton ; décalages, rotations et apparitions en cascade via une timeline | **Recommandé : textes et boutons du carrousel principal**, rejoués à chaque changement de vidéo. Sans feuilles décoratives ni rotation des textes | Faible à moyenne : synchronisation avec les changements de vidéo et nettoyage entre deux séquences | Faible : animer uniquement opacité et déplacement de quelques éléments ; coût supplémentaire de GSAP à mesurer |
| **3D Image Slider** | GSAP : rotation continue d’une galerie circulaire et pause/reprise au clic ; **perspective CSS 3D, pas Three.js/WebGL** | Au mieux une expérience facultative pour la galerie du complexe. **Non retenu** : les photos doivent rester faciles à examiner, le carrousel actuel doit conserver swipe et clavier | Moyenne à élevée pour préserver lisibilité, focus et navigation | Modéré : nombreuses images transformées en permanence ; moins adapté aux téléphones |
| **Bunny Jumper** | GSAP : timeline répétée avec yoyo, saut/déformation d’un lapin, trou et ombre | **Non retenu** : animation de personnage ludique sans rapport avec le site. Seul le principe d’orchestration temporelle est utile | Faible pour une démo, mais adaptation graphique spécifique | Faible à modéré ; boucle permanente inutile pour le contenu scolaire |
| **Primitive 3D Shape** | Three.js/WebGL : tore noué tournant, apparition élastique GSAP, pulsation et couleur aléatoire au clic, raycasting et OrbitControls | **Non retenu** : objet abstrait qui détourne l’attention des élèves, des photos et des admissions | Élevée : rendu, chargement, alternative, interactions et tests | Le plus élevé : rendu continu, utilisation GPU, coût des bibliothèques et consommation énergétique |

### Sources vérifiables

- [README et dépôt](https://github.com/kolonatalie/gsap-threejs-experiments/tree/ff7b6d633bd4c14f92ea15f2be92ef86032e649a)
- [Séquence de textes](https://github.com/kolonatalie/gsap-threejs-experiments/blob/ff7b6d633bd4c14f92ea15f2be92ef86032e649a/interactive-header-sequence-gsap3/index.js)
- [Galerie CSS 3D](https://github.com/kolonatalie/gsap-threejs-experiments/blob/ff7b6d633bd4c14f92ea15f2be92ef86032e649a/3D-image-slider/app.js)
- [Lapin animé](https://github.com/kolonatalie/gsap-threejs-experiments/blob/ff7b6d633bd4c14f92ea15f2be92ef86032e649a/bunny-jumper/index.js)
- [Objet Three.js](https://github.com/kolonatalie/gsap-threejs-experiments/blob/ff7b6d633bd4c14f92ea15f2be92ef86032e649a/primitive-3D-shape/index.js)

**Écarts du dépôt :** le sélecteur `#demo` de la séquence de textes n’existe pas dans son HTML ; le slider charge une version GSAP non épinglée. Ces détails ne seront pas reproduits. Le dépôt ne fournit pas de système de transitions entre pages ni de révélations au scroll à reprendre tel quel.

## 2. Droits de réutilisation

**Aucune licence explicite trouvée** dans le dépôt ; l’API GitHub ne déclare pas de licence et l’arborescence ne contient pas de `LICENSE` ou `COPYING`. Les droits des images, SVG et GIF ne sont pas établis non plus.

En conséquence : **ne copier aucun code ou asset du dépôt sans autorisation de son auteur**. Le plan prévoit une réalisation originale inspirée des principes d’animation observés, avec les photos, vidéos et logo déjà présents sur le site. Les conditions officielles des bibliothèques utilisées seront vérifiées avant installation ; leur licence ne donne pas de droits sur les ressources du dépôt.

## 3. État du site actuel

- Identité conservée : bordeaux, doré, blanc/crème, titres Playfair Display et interface Inter ; structure et contenus inchangés.
- Le site possède déjà les entrées au scroll, la cascade des cartes, la parallaxe, les compteurs, le menu animé et les transitions de page, essentiellement via Framer Motion. Le carrousel principal possède déjà une cascade CSS et un fondu des vidéos.
- Ajouter GSAP partout créerait des animations concurrentes plutôt qu’une amélioration. **GSAP sera réservé à la séquence sélectionnée**, en retirant uniquement l’animation CSS qui pilote les mêmes textes.
- La galerie cumule apparition, parallaxe et zoom au survol. Les cartes cumulent parfois élévation et zoom. Certaines déclarations `will-change` restent actives en permanence : à rationaliser progressivement, pas à amplifier.
- Le mode d’animations réduites est partiellement traité : les défilements programmatiques et certaines animations JavaScript doivent encore être harmonisés.

### Vérifications réellement réalisées

- Ouverture du site dans Chromium, capture à **1280 × 1800**, observation après défilement, puis capture à **390 × 844** : aucun débordement horizontal détecté à ces deux tailles.
- Le bandeau principal affiche son texte mais **aucune vidéo ni image de couverture visible dans la capture ordinateur** ; les vidéos observées étaient non prêtes (`readyState = 0`). La lecture vidéo n’est donc pas validée. La cause doit être diagnostiquée avant de synchroniser de nouvelles animations.
- Lors du rechargement avec animations réduites, un **décalage entre rendu initial et rendu navigateur** a été observé, notamment sur le header et les éléments animés. Il constitue un prérequis de stabilité à résoudre après validation.
- Les diagnostics automatiques disponibles indiquent une compilation réussie. Cela ne suffit pas à valider les vidéos, les interactions ni toutes les tailles d’écran.
- Pas de validation des parcours privés, ni de modification des réglages métier. Aucun benchmark de performance complet et aucun test Safari réel exécuté pendant cet audit.

## 4. Plan progressif proposé

### Étape 0 — Stabiliser avant d’enrichir

Après votre validation, reproduire puis diagnostiquer le manque d’image/vidéo dans le bandeau et le décalage initial en mode réduit. Corriger seulement la présentation et la gestion des animations si la cause relève de ce périmètre. Si elle relève d’une API ou d’un service externe, vous signaler le blocage sans modifier ce service.

### Étape 1 — Une première animation GSAP

Remplacer **uniquement la cascade du texte du carrousel principal** par une séquence originale GSAP : surtitre → titre → description → boutons. Déplacements légers, pas de flou, de caractères éclatés ou de 3D. Rejouer la séquence à chaque slide ; conserver les vidéos, les contrôles, le fondu et les fonctionnalités existantes.

En mode réduit : contenu immédiatement visible, sans déplacement. Sans JavaScript : texte et liens lisibles. Tester cette seule animation, puis présenter son résultat pour validation avant l’étape suivante.

### Étape 2 — Cartes et images, après validation de l’étape 1

Affiner les animations existantes plutôt qu’en créer un second système : une apparition par carte, cascade courte, zoom discret réservé aux interactions adaptées. Réduire la parallaxe sur téléphone et supprimer les déplacements cumulés qui nuisent à la lecture. Conserver les carrousels natifs, le swipe et la navigation au clavier.

### Étape 3 — Navigation, après validation de l’étape 2

Harmoniser les transitions déjà présentes entre pages, le menu et la barre de progression. Conserver Framer Motion pour ces composants tant qu’aucune séquence complexe ne justifie leur remplacement. Ne pas ajouter de nouvelle scène 3D.

## 5. Détails techniques et critères de validation

- Préserver TanStack Start, les composants existants et les métadonnées des pages ; aucune refonte générale ni migration de données.
- GSAP chargé uniquement pour la séquence concernée, initialisé après montage ; timeline limitée à son conteneur et nettoyée à chaque changement/démontage. Une seule bibliothèque contrôle chaque propriété animée d’un élément.
- Pas de GSAP/Three.js importé depuis un CDN à l’exécution ; versions et licences vérifiées avant installation. Ne pas installer Three.js pour le plan retenu.
- Le plan retenu ne dépend pas de WebGL : le rendu 2D actuel est l’alternative permanente. Toute future proposition 3D ferait l’objet d’une validation distincte et d’un affichage statique en cas d’indisponibilité WebGL.
- Animer principalement `transform` et `opacity`, sans flou lourd ni boucles décoratives ; mesurer chargement et fluidité avant/après dans les mêmes conditions.
- Tester chaque étape : démarrage, changement automatique et manuel de vidéo, pause/reprise, navigation entre pages, menu mobile, clavier, focus et animations réduites. Comparer les résultats aux parcours existants.
- Vérifier visuellement les largeurs **375, 390, 430, 768, 1024, 1280, 1440 et 1920 px** : texte lisible, boutons accessibles, images visibles et aucun débordement. Une émulation mobile ne sera pas présentée comme un test sur téléphone réel.
- Tests automatisés ciblés si disponibles, diagnostics de compilation et absence de nouvelles erreurs navigateur ; documenter ce qui ne peut pas être vérifié.
- Travail exclusivement dans la prévisualisation actuelle. **Aucune publication en production.**

## Validation demandée

Valider ce plan autorise **l’étape 0 et une seule animation à l’étape 1**, sans copie du dépôt et sans Three.js. Les étapes suivantes restent soumises à votre validation du résultat précédent.