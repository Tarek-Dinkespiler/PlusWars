# Plan de travail – ALN (version courte)

Objectif :  
Valider un flux complet **Next.js + Decap CMS + déploiement** avec :

- une page d’accueil éditable via CMS
- une page "Ventes" minimale (texte + liste simple)

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
Je peux modifier le contenu de la home dans `/admin` et voir le fichier de contenu mis à jour.

---

## Étape 3 — Faire lire le contenu Markdown par Next.js

But : la page d’accueil affiche les données venant du CMS, plus du tout de texte "en dur".

- [ ] Ajouter un petit utilitaire pour lire `content/homepage.md` (à build-time ou runtime)
- [ ] Remplacer le texte statique de `pages/index.tsx` par les valeurs du fichier (`title`, `subtitle`, `content`)
- [ ] Vérifier que la home affiche le contenu issu de `homepage.md` en local
- [ ] Vérifier que ça fonctionne aussi sur l’environnement déployé (Netlify/Vercel)

**Critère de succès :**  
Modifier la home dans `/admin` → redéploiement → le texte change réellement sur le site.

---

## Étape 4 — Tester le cycle complet (admin → build → site)

But : valider une boucle complète de mise à jour de contenu.

- [ ] Depuis `/admin`, modifier le titre de la home
- [ ] Vérifier qu’un commit (ou équivalent) est créé dans le repo distant
- [ ] Vérifier que le build Netlify/Vercel est déclenché
- [ ] Vérifier que le nouveau titre apparaît sur la home en production

**Critère de succès :**  
Le site en ligne change via le CMS, sans intervention manuelle sur le code.

---

## Étape 5 — Page "Ventes" minimale

But : ajouter une deuxième page éditable pour simuler une petite "collection".

- [ ] Créer une collection `sales_items` (ou `ventes`) dans `config.yml`
  - [ ] Champs minimum : `title`, `price`, `status` (optionnel)
- [ ] Créer au moins 2–3 entrées de test via `/admin`
- [ ] Créer une page `pages/ventes.tsx`
- [ ] Faire lire la liste des ventes et les afficher (titre + prix, en liste simple)
- [ ] Déployer et vérifier que la page `/ventes` affiche les données du CMS

**Critère de succès :**  
Une deuxième page dynamique, alimentée par le CMS, est en ligne.

---

## Règle de décision

- Si **Étape 1 + Étape 2** sont complétées rapidement (dans ta soirée ou quasi) →  
  👉 le projet est **conservé** et étendu plus tard si tu en as envie.

- Si l’une de ces étapes bloque ou consomme trop de temps →  
  👉 le projet est **arrêté sans scrupule**, l’exercice aura tout de même servi à clarifier tes contraintes et ton process.
