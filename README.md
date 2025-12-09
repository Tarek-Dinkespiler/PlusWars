# ALN - Modernisation du site Armor Loisirs Nautiques

## Cadrage du projet

Ce projet a pour objectif d’explorer la création d’une version modernisée du site actuel d’Armor Loisirs Nautiques.  
Il s’agit d’un exercice technique, avec un focus sur la rapidité, l’efficacité et l’amélioration de l’expérience de gestion de contenu.

### 🎯 Objectifs du projet

- Proposer une structure moderne, plus simple à maintenir.
- Améliorer la présentation des offres et services.
- Faciliter l’évolution future du contenu (offres, balades, ventes).
- Explorer comment l’IA peut accélérer le développement et la migration.

---

### 🔍 Analyse du site actuel

#### Points forts

- **Clarté immédiate de l’offre** : l’utilisateur comprend rapidement ce qui est proposé (balades, locations, ventes, services).
- **Ton humain et chaleureux** : la communication est directe, personnelle et inspire confiance.
- **Réservation externalisée** : l’intégration avec MyRezApp est simple et fiable.
- **Preuves de sérieux** : les nombreuses ventes passées renforcent la crédibilité de l’activité.
- **Présentation personnelle de qualité** : la page “Qui je suis” donne une dimension authentique et professionnelle.

#### Axes d’amélioration

- **Gestion de contenu difficile** : les pages reposent sur du texte libre, sans structure permettant de gérer facilement les offres ou les annonces.
- **Visibilité limitée** : peu d’optimisation SEO locale, pas de mise en avant d’avis, et peu de contenu illustré.
- **Mise en page minimaliste** : l’information est présente mais pourrait être mieux hiérarchisée et valorisée.
- **Manque de modularité** : pas de modèles pour les balades, locations, services ou bateaux en vente, ce qui complique les mises à jour.
- **Page photos sous-exploitée** : alors que de nombreuses images existent ailleurs (réseaux sociaux, Office du tourisme).
- **Usage vidéo limité** : le site tirerait profit d’une intégration vidéo simple et gérable pour le client.

---

### 🧰 Choix techniques

#### **Next.js**

- Framework moderne, stable et largement adopté.
- Routing clair et intuitif, adapté à un site vitrine.
- Excellente prise en charge du rendu statique et des performances.

#### **Material UI (MUI)**

- Large collection de composants fiables et éprouvés.
- Design cohérent, accessible et facilement personnalisable.
- Permet de reproduire rapidement un layout simple et familier.

#### **Decap CMS (ex-Netlify CMS)**

- Interface d’admin accessible via navigateur, sans installation.
- Édition du contenu via formulaires, sans toucher au code.
- Fonctionne entièrement avec des fichiers Markdown versionnés dans Git.
- Déploiement automatisé et transparent pour le client.

#### **Déploiement sur Netlify ou Vercel**

- Hébergement gratuit ou très peu coûteux.
- Builds automatiques à chaque mise à jour du contenu.
- Infrastructure fiable, sans serveur ni base de données à maintenir.

---

### 📦 Contenu du dépôt

- `content/raw/` : extraction du texte actuel du site (pour préparation des futurs modèles de données).
- Code source à venir lors des prochaines étapes d'exploration.

---

### 🚧 Statut du projet

Expérimentation en cours — objectif : produire rapidement une structure moderne, réutilisable et évolutive.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

---

## Getting Started with Next.js

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.
