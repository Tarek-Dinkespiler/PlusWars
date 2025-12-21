import fs from "fs";
import path from "path";
import yaml from "js-yaml";

export type Construction = {
  slug: string;
  type: string;
  title?: string;
  description?: string;
  images: string[];
};

const CONSTRUCTIONS_DIR = path.join(process.cwd(), "content", "constructions");

export function getAllConstructions(): Construction[] {
  if (!fs.existsSync(CONSTRUCTIONS_DIR)) return [];

  const files = fs
    .readdirSync(CONSTRUCTIONS_DIR)
    .filter((f) => f.endsWith(".yaml"));

  const constructions: Construction[] = files.map((filename) => {
    const slug = filename.replace(/\.yaml$/, "");
    const fullPath = path.join(CONSTRUCTIONS_DIR, filename);
    const raw = fs.readFileSync(fullPath, "utf8");
    const data = yaml.load(raw) as Record<string, unknown>;

    return {
      slug,
      type: (data.type as string) ?? "",
      title: (data.title as string) ?? undefined,
      description: (data.description as string) ?? undefined,
      images: (Array.isArray(data.images) ? data.images : []) as string[],
    };
  });

  return constructions;
}

export function getConstructionsByType(type: string): Construction[] {
  return getAllConstructions().filter((c) => c.type === type);
}

export function getConstruction(slug: string): Construction | null {
  const constructions = getAllConstructions();
  return constructions.find((c) => c.slug === slug) ?? null;
}
