import fs from "fs";
import path from "path";
import yaml from "js-yaml";

export type Construction = {
  slug: string;
  type: string;
  title?: string;
  description?: string;
  video?: string;
  images: string[];
};

function getConstructionsDir(locale: string = 'en'): string {
  return path.join(process.cwd(), "content", "constructions", locale);
}

export function getAllConstructions(locale: string = 'en'): Construction[] {
  const constructionsDir = getConstructionsDir(locale);

  if (!fs.existsSync(constructionsDir)) {
    // Fallback to English if locale directory doesn't exist
    if (locale !== 'en') {
      return getAllConstructions('en');
    }
    return [];
  }

  const files = fs
    .readdirSync(constructionsDir)
    .filter((f) => f.endsWith(".yaml"));

  const constructions: Construction[] = files.map((filename) => {
    const slug = filename.replace(/\.yaml$/, "");
    const fullPath = path.join(constructionsDir, filename);
    const raw = fs.readFileSync(fullPath, "utf8");
    const data = yaml.load(raw) as Record<string, unknown>;

    const title = (data.title as string) ?? null;
    const description = (data.description as string) ?? null;
    const video = (data.video as string) ?? null;

    return {
      slug,
      type: (data.type as string) ?? "",
      ...(title && { title }),
      ...(description && { description }),
      ...(video && { video }),
      images: (Array.isArray(data.images) ? data.images : []) as string[],
    };
  });

  return constructions;
}

export function getConstructionsByType(type: string, locale: string = 'en'): Construction[] {
  return getAllConstructions(locale).filter((c) => c.type === type);
}

export function getConstruction(slug: string, locale: string = 'en'): Construction | null {
  const constructions = getAllConstructions(locale);
  return constructions.find((c) => c.slug === slug) ?? null;
}
