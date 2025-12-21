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

export function getAllConstructionTypes(): ConstructionType[] {
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
    name: item.name ?? "",
    slug: item.slug ?? item.name?.toLowerCase().replace(/\s+/g, "-") ?? "",
    image: item.image ?? "",
    description: item.description ?? "",
  }));
}

export function getConstructionType(slug: string): ConstructionType | null {
  const types = getAllConstructionTypes();
  return types.find((t) => t.slug === slug) ?? null;
}
