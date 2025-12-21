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

/**
 * Helper to extract locale-specific value from i18n field
 * Supports both flat strings and nested locale objects
 */
function getLocalizedValue(value: any, locale: string = 'en'): string | undefined {
  if (typeof value === 'string') return value;
  if (value && typeof value === 'object' && locale in value) return value[locale];
  if (value && typeof value === 'object' && 'en' in value) return value['en'];
  return undefined;
}

export function getAllConstructions(locale: string = 'en'): Construction[] {
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
      title: getLocalizedValue(data.title, locale) ?? undefined,
      description: getLocalizedValue(data.description, locale) ?? undefined,
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
