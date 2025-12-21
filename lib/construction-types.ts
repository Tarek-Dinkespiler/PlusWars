import fs from "fs";
import path from "path";
import yaml from "js-yaml";

export type ConstructionType = {
  name: string;
  slug: string;
  image: string;
  description: string;
};

const TYPES_PATH = path.join(
  process.cwd(),
  "content",
  "construction-types.yaml"
);

/**
 * Helper to extract locale-specific value from i18n field
 * Supports both flat strings and nested locale objects
 */
function getLocalizedValue(value: any, locale: string = 'en'): string {
  if (typeof value === 'string') return value;
  if (value && typeof value === 'object' && locale in value) return value[locale];
  if (value && typeof value === 'object' && 'en' in value) return value['en'];
  return '';
}

export function getAllConstructionTypes(locale: string = 'en'): ConstructionType[] {
  if (!fs.existsSync(TYPES_PATH)) return [];

  const raw = fs.readFileSync(TYPES_PATH, "utf8");
  const data = yaml.load(raw) as Record<string, unknown>;

  // Support both root array and wrapped "types" array
  const typesArray = Array.isArray(data)
    ? data
    : Array.isArray(data?.types)
    ? (data.types as unknown[])
    : [];

  return typesArray.map((item: any) => ({
    name: getLocalizedValue(item.name, locale) ?? "",
    slug: item.slug ?? item.name?.toLowerCase?.().replace(/\s+/g, "-") ?? "",
    image: item.image ?? "",
    description: getLocalizedValue(item.description, locale) ?? "",
  }));
}

export function getConstructionType(slug: string, locale: string = 'en'): ConstructionType | null {
  const types = getAllConstructionTypes(locale);
  return types.find((t) => t.slug === slug) ?? null;
}
