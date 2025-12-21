import fs from "fs";
import path from "path";
import yaml from "js-yaml";

export type HomePageContent = {
  title: string;
  subtitle: string;
  story: string;
};

const HOME_PATH = path.join(process.cwd(), "content", "home.yaml");

export function loadHomePageContent(): HomePageContent {
  const raw = fs.readFileSync(HOME_PATH, "utf8");
  const data = yaml.load(raw) as Record<string, unknown>;

  return {
    title: (data.title as string) ?? "PlusWars",
    subtitle: (data.subtitle as string) ?? "",
    story: (data.story as string) ?? "",
  };
}
