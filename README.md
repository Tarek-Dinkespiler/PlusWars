# PlusWars

**PlusWars** is a non-commercial, public project showcasing physical creations made with [Plus-Plus®](https://www.plus-plus.com/) by a young builder. The goal is to organize, document, and present different types of builds (spacecraft, vehicles, transformers, etc.) through a minimal, multilingual static website.

---

## 🧱 Project Goals

- Present and archive Plus-Plus builds in themed galleries
- Provide a clean and responsive front-end
- Use internationalisation to support French and English content
- Keep the site easy to maintain over time

---

## 🎨 Design & Visual Identity

This project is based on the **[Neo‑Brutalism.dev](https://www.neobrutalism.dev)** design system, using the open-source **Windowed Portfolio** template as a visual starting point. The bold, high-contrast layout is adapted to showcase physical creations in a playful and expressive way.

Additional components and interactive elements are built using **shadcn/ui**.

---

## 🔧 Tech Stack

| Purpose               | Tech                                                         |
| --------------------- | ------------------------------------------------------------ |
| Static site           | [Next.js](https://nextjs.org/)                               |
| Styling               | [Tailwind CSS](https://tailwindcss.com/)                     |
| UI components         | [shadcn/ui](https://ui.shadcn.dev/)                          |
| Visual template       | [Windowed Portfolio](https://www.neobrutalism.dev/templates) |
| Hosting               | [Netlify](https://www.netlify.com/)                          |
| CMS (future)          | [Decap CMS](https://decapcms.org/)                           |
| i18n (planned)        | `next-i18next`                                               |
| AI dev tooling        | [Claude Code](https://www.anthropic.com/index/claude-code)   |
| Repository visibility | Public, non-commercial                                       |

---

## 📂 Site Structure

| Route | Purpose |
| --- | --- |
| `/` | Home (landing page) with a title, subtitle, and story |
| `/constructions` | Lists all ConstructionTypes as "windows"/cards |
| `/constructions/[slug]` | Lists all Constructions of a given type, each with description + photos |

---

## 🗃 Data Model

### 🏠 Home Page
- `title` (string) — Site title
- `subtitle` (string) — Subtitle/tagline
- `story` (string) — Main narrative text

Stored as a single minimal file (e.g., `home.yaml` or `home.md`).

### 🧩 ConstructionType
Each represents a category of builds (e.g., "Spinning Tops", "Transformers").

- `name` (string) — Unique identifier, used as slug
- `image` (file) — One preview image for the category card
- `description` (string) — Short introduction to the category

Can be stored as one file per type or as a list in `content/construction-types.yaml`.

### ⚙️ Construction
Each individual build, linked to a ConstructionType.

- `type` (string) — Reference to ConstructionType name (required)
- `images` (array, ≤10 files) — Photos of the creation
- `description` (string) — Freeform text about the build

Stored as YAML/Markdown in `content/constructions/` folder.

---

## 📋 Implementation Notes

- All entries can be stored in Markdown or YAML format
- Ideal for **Decap CMS** integration: minimal fields, optional preview images
- Assets are stored under `public/uploads/` (Netlify-compatible)
- `Construction.type` can be enforced with a dropdown in Decap CMS for data integrity
- No strict database required — content is version-controlled in the repo

---

## 🧠 Development Guidelines

This project uses **Claude Code** with structured agents:

| Agent   | Role                                                           |
| ------- | -------------------------------------------------------------- |
| `quick` | Small changes, fast edits, local patches (Haiku)               |
| `deep`  | Structural updates, refactors, architecture decisions (Sonnet) |

Global Claude rules are stored in `.claude/CLAUDE.md`.

---

## 🚀 Deployment

- Deployed via Netlify (static export)
- All content lives in the repo
- Assets (images) are stored under `public/uploads/`

---

## 🔜 Planned Features

- Multilingual content (EN/FR)

---

## ⚠️ Legal Note

**PlusWars** is not affiliated with or endorsed by Plus-Plus®.  
This is a personal showcase project created for educational and creative purposes.
