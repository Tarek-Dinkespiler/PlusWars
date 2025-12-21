import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type HomePageContent = {
  title: string;
  subtitle: string;
  content: string;
};

const HOMEPAGE_PATH = path.join(process.cwd(), "content", "homepage.md");

export function loadHomePageContent(): HomePageContent {
  const raw = fs.readFileSync(HOMEPAGE_PATH, "utf8");
  const { data, content } = matter(raw);

  return {
    title: (data.title as string) ?? "Titre manquant",
    subtitle: (data.subtitle as string) ?? "",
    content: content.trim() || (data.content as string) || "",
  };
}
