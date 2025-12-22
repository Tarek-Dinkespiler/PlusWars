import fs from "fs";
import path from "path";
import yaml from "js-yaml";

export type ConstructionType = {
  name: string;
  slug: string;
  image: string;
  description: string;
};

function getTypesPath(locale: string = 'en'): string {
  return path.join(
    process.cwd(),
    "content",
    "construction-types",
    locale,
    "types.yaml"
  );
}

export function getAllConstructionTypes(locale: string = 'en'): ConstructionType[] {
  const typesPath = getTypesPath(locale);

  if (!fs.existsSync(typesPath)) {
    // Fallback to English if locale file doesn't exist
    if (locale !== 'en') {
      return getAllConstructionTypes('en');
    }
    return [];
  }

  const raw = fs.readFileSync(typesPath, "utf8");
  const data = yaml.load(raw) as Record<string, unknown>;

  // Support both root array and wrapped "types" array
  const typesArray = Array.isArray(data)
    ? data
    : Array.isArray(data?.types)
    ? (data.types as unknown[])
    : [];

  return typesArray.map((item: any) => ({
    name: (item.name as string) ?? "",
    slug: item.slug ?? item.name?.toLowerCase?.().replace(/\s+/g, "-") ?? "",
    image: item.image ?? "",
    description: (item.description as string) ?? "",
  }));
}

export function getConstructionType(slug: string, locale: string = 'en'): ConstructionType | null {
  const types = getAllConstructionTypes(locale);
  return types.find((t) => t.slug === slug) ?? null;
}
