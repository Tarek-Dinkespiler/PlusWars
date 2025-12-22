import fs from "fs";
import path from "path";
import yaml from "js-yaml";

export type HomePageContent = {
  title: string;
  subtitle: string;
  story: string;
};

function getHomePath(locale: string = 'en'): string {
  return path.join(process.cwd(), "content", "pages", locale, "home.yaml");
}

export function loadHomePageContent(locale: string = 'en'): HomePageContent {
  const homePath = getHomePath(locale);

  if (!fs.existsSync(homePath)) {
    // Fallback to English if locale file doesn't exist
    const enPath = getHomePath('en');
    if (!fs.existsSync(enPath)) {
      return {
        title: "PlusWars",
        subtitle: "",
        story: "",
      };
    }
    return loadHomePageContent('en');
  }

  const raw = fs.readFileSync(homePath, "utf8");
  const data = yaml.load(raw) as Record<string, unknown>;

  return {
    title: (data.title as string) ?? "PlusWars",
    subtitle: (data.subtitle as string) ?? "",
    story: (data.story as string) ?? "",
  };
}
