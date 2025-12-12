# Plan de travail – ALN (version courte)

Objectif :  
Valider un flux complet **Next.js + Decap CMS + déploiement** avec :

- une page d’accueil éditable, orientée conversion
- une structure claire Services / Occasions
- une galerie photo/vidéo attractive

Temps cible total : ~5 h  
Si les **Étapes 1 et 2** ne sont pas atteintes rapidement, le projet est abandonné sans regret.

---

## Étape 1 — Bootstraper et déployer une app Next.js

But : avoir une app Next.js en ligne avec une page d’accueil minimale.

- [x] Créer le repository privé
- [x] Créer la base du projet Next.js (Pages Router)
- [x] Ajouter Material UI (MUI) et vérifier que ça compile
- [x] Créer une page d’accueil très simple (`pages/index.tsx`) avec du texte statique
- [x] Configurer le déploiement (Netlify ou Vercel)
- [x] Vérifier que la home est accessible en ligne

**Critère de succès :**  
Un site Next.js déployé avec une page d’accueil basique.

---

## Étape 2 — Installer Decap (Netlify CMS) et éditer la home

But : rendre le contenu de la page d’accueil éditable via le CMS.

- [x] Créer un répertoire `content/` dans le projet
- [x] Créer un premier fichier de contenu `content/homepage.md`
- [x] Ajouter Decap CMS dans `/public/admin/` (HTML + script)
- [x] Créer un fichier `config.yml` minimal pour Decap
  - [x] Définir une collection `pages` ou `homepage`
  - [x] Définir au moins 3 champs : `title`, `subtitle`, `content`
- [x] Vérifier que `/admin/index.html` est accessible en local
- [x] Vérifier que l’édition dans `/admin/index.html` modifie bien `homepage.md` (ou le fichier configuré)

**Critère de succès :**  
Je peux modifier le contenu de la home dans `/admin/index.html` et voir le fichier de contenu mis à jour.

---

## Étape 3 — Faire lire le contenu Markdown par Next.js

But : la page d’accueil affiche les données venant du CMS, plus du tout de texte "en dur".

- [x] Ajouter un petit utilitaire pour lire `content/homepage.md` (à build-time ou runtime)
- [x] Remplacer le texte statique de `pages/index.tsx` par les valeurs du fichier (`title`, `subtitle`, `content`)
- [x] Vérifier que la home affiche le contenu issu de `homepage.md` en local
- [x] Vérifier que ça fonctionne aussi sur l’environnement déployé (Netlify/Vercel)

**Critère de succès :**  
Modifier la home dans `/admin/index.html` → redéploiement → le texte change réellement sur le site.

---

## Étape 4 — Tester le cycle complet (admin → build → site)

But : valider une boucle complète de mise à jour de contenu.

- [x] Depuis `/admin/index.html`, modifier le titre de la home
- [x] Vérifier qu’un commit (ou équivalent) est créé dans le repo distant
- [x] Vérifier que le build Netlify/Vercel est déclenché
- [x] Vérifier que le nouveau titre apparaît sur la home en production

**Critère de succès :**  
Le site en ligne change via le CMS, sans intervention manuelle sur le code.

---

## Étape 5 — Layout global (header + footer + menu)

But : ajouter un layout global propre et cohérent (header + footer + navigation)

- [x] Créer `components/Layout.tsx`
  - [x] Définir les zones : `header`, `main`, `footer`
  - [x] Utiliser un conteneur central (`Container maxWidth="md"`)
- [x] Ajouter un header simple
  - [x] `AppBar` + `Toolbar`
  - [x] Logo texte ("ALN")
  - [x] Liens : `/` et `/ventes`
- [x] Ajouter un footer simple
  - [x] Texte : `© {année} Armor Loisirs Nautiques`
- [x] Envelopper toutes les pages via `pages/_app.tsx`
- [x] Ajuster rapidement le thème MUI
  - [x] Couleurs primaires cohérentes
  - [x] Typo vérifiée

**Critère de succès :**

- Toutes les pages utilisent le même layout
- Navigation simple disponible
- Style cohérent et minimal

---

## Étape 6 — Clarifier l’architecture de l’information

But : définir une structure de site simple, compréhensible et sans redondance.

- [x] Identifier les catégories de services :
  - [x] **Services** (balades, location, activités pour personnes sans bateau)
  - [x] **Occasions bateau** (vente, public local / connaisseur)
- [x] Définir la navigation principale :
  - [x] Accueil
  - [x] Services
  - [x] Occasions bateau
  - [x] Contact
  - [x] CTA permanent : Réserver
- [x] Définir le rôle de l’accueil :
  - [x] Page d’orientation (pas de détails)
  - [x] Hero + chemins utilisateurs + galerie
- [x] Décider de la structure de la galerie :
  - [x] Galerie visible sur l’accueil
  - [x] Page dédiée `/galerie` pour le contenu complet

**Critère de succès :**  
La structure du site est validée, compréhensible en 30 secondes, sans contenu dupliqué.

---

## Étape 7 — Pages de structure (squelettes)

But : poser toutes les pages nécessaires sans contenu final.

- [x] Créer les pages :
  - [x] `/services`
  - [x] `/occasions-bateau`
  - [x] `/galerie`
- [x] Mettre à jour la navigation
- [x] Vérifier le rendu de chaque page

**Critère de succès :**  
Toutes les routes existent et sont accessibles via la navbar.

---

## Étape 8 — Galerie (contenu + visuel)

But : exploiter photos/vidéos de manière attractive.

- [ ] Créer une collection `gallery` dans Decap
- [ ] Afficher une sélection sur l’accueil
- [ ] Page `/galerie` avec lightbox
- [ ] Vidéo courte en loop (optionnel)

**Critère de succès :**  
La galerie est visible, attractive et simple à maintenir.

---

## Étape 9 — Page "Ventes" minimale

But : ajouter une deuxième page éditable pour simuler une petite "collection".

- [ ] Créer une collection `sales_items` (ou `ventes`) dans `config.yml`
  - [ ] Champs minimum : `title`, `price`, `status` (optionnel)
- [ ] Créer au moins 2–3 entrées de test via `/admin`
- [ ] Créer une page `pages/ventes.tsx`
- [ ] Faire lire la liste des ventes et les afficher (titre + prix, en liste simple)
- [ ] Déployer et vérifier que la page `/ventes` affiche les données du CMS

**Critère de succès :**  
Une deuxième page dynamique, alimentée par le CMS, est en ligne.
