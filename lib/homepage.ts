import fs from "fs";
import path from "path";
import yaml from "js-yaml";

export type HomePageContent = {
  title: string;
  subtitle: string;
  story: string;
};

const HOME_PATH = path.join(process.cwd(), "content", "home.yaml");

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

export function loadHomePageContent(locale: string = 'en'): HomePageContent {
  const raw = fs.readFileSync(HOME_PATH, "utf8");
  const data = yaml.load(raw) as Record<string, unknown>;

  return {
    title: getLocalizedValue(data.title, locale) ?? "PlusWars",
    subtitle: getLocalizedValue(data.subtitle, locale) ?? "",
    story: getLocalizedValue(data.story, locale) ?? "",
  };
}
