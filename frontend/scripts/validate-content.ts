import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { parse } from "yaml";

const required = ["id", "module", "order", "title", "duration", "prerequisites", "objectives", "translation_status", "visibility", "resources"];
const sections = {
  es: ["## Conceptos clave", "## Paso a paso", "## Ejemplo práctico", "## Ejercicio", "## Verificación", "## Errores frecuentes", "## Siguiente paso"],
  en: ["## Key concepts", "## Step by step", "## Practical example", "## Exercise", "## Check", "## Common mistakes", "## Next step"],
};
const root = new URL("../src/content/", import.meta.url).pathname;

async function markdownFiles(directory: string): Promise<string[]> {
  return (await readdir(directory)).filter((file) => file.endsWith(".md"));
}

async function validateLesson(file: string, locale: "es" | "en"): Promise<string> {
  const content = await readFile(file, "utf8");
  const frontMatter = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!frontMatter) throw new Error(`${file}: missing front matter`);
  const data = parse(frontMatter[1]) as Record<string, unknown>;
  const missing = required.filter((key) => !(key in data));
  if (missing.length) throw new Error(`${file}: missing ${missing.join(", ")}`);
  if (typeof data.id !== "string" || !data.id) throw new Error(`${file}: missing id`);
  if (!Array.isArray(data.resources)) throw new Error(`${file}: resources must be a list`);
  const resourceTypes = new Set(data.resources.map((resource) => (resource as { type?: string }).type));
  if (!resourceTypes.has("official_docs") || !resourceTypes.has("video")) throw new Error(`${file}: requires official_docs and video resources`);
  for (const resource of data.resources as Array<Record<string, unknown>>) {
    if (!["official_docs", "video"].includes(String(resource.type))) throw new Error(`${file}: invalid resource type`);
    if (!["title", "description", "url", "provider"].every((key) => typeof resource[key] === "string" && resource[key])) throw new Error(`${file}: incomplete resource`);
    if (!String(resource.url).startsWith("https://")) throw new Error(`${file}: resource URL must use HTTPS`);
  }
  for (const section of sections[locale]) if (!frontMatter[2].includes(section)) throw new Error(`${file}: missing ${section}`);
  const mistakesSection = locale === "es" ? "## Errores frecuentes" : "## Common mistakes";
  const nextSection = locale === "es" ? "## Siguiente paso" : "## Next step";
  const mistakes = frontMatter[2].split(mistakesSection)[1]?.split(nextSection)[0] ?? "";
  if ((mistakes.match(/^\s*[-*] /gm) ?? []).length < 2) throw new Error(`${file}: requires at least two common mistakes`);
  return data.id;
}

const spanish = await markdownFiles(join(root, "learning/es"));
const english = await markdownFiles(join(root, "learning/en"));
const editorials = await markdownFiles(join(root, "editorial"));
const spanishIds = new Set(await Promise.all(spanish.map((file) => validateLesson(join(root, "learning/es", file), "es"))));
const englishIds = new Set(await Promise.all(english.map((file) => validateLesson(join(root, "learning/en", file), "en"))));

for (const id of spanishIds) {
  if (!englishIds.has(id)) throw new Error(`Missing English lesson for ${id}`);
  if (!editorials.includes(`${id}.md`)) throw new Error(`Missing Spanish editorial guide for ${id}`);
}
if (spanishIds.size !== englishIds.size) throw new Error("Spanish and English lesson counts differ");
console.log(`Validated ${spanishIds.size} bilingual lessons and ${editorials.length} editorial guides.`);
