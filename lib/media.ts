import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type MediaItem = {
  slug: string;
  type: "photo" | "video";
  src: string; // ex: /uploads/xxx.jpg ou /uploads/xxx.mp4
  order: number;
  alt: string | null;
  caption: string | null;
};

const DIR = path.join(process.cwd(), "content", "media");

export function getAllMediaItems(): MediaItem[] {
  if (!fs.existsSync(DIR)) return [];

  const files = fs.readdirSync(DIR).filter((f) => f.endsWith(".md"));

  const items: MediaItem[] = files.map((filename) => {
    const slug = filename.replace(/\.md$/, "");
    const fullPath = path.join(DIR, filename);
    const raw = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(raw);

    const type = (data.type ?? "photo") as MediaItem["type"];
    const src = data.src ? String(data.src) : "";

    // src est requis -> on fail fast si un fichier est mal formé
    if (!src) {
      throw new Error(`Missing 'src' in content/media/${filename}`);
    }

    return {
      slug,
      type,
      src,
      order: Number(data.order ?? 100),
      alt: data.alt ? String(data.alt) : null,
      caption: content?.trim() ? content.trim() : null,
    };
  });

  return items.sort(
    (a, b) => a.order - b.order || a.slug.localeCompare(b.slug)
  );
}
