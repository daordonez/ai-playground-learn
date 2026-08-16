import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

const required = ["id", "module", "order", "title", "duration", "prerequisites", "objectives", "translation_status", "visibility"];
const root = new URL("../src/content/", import.meta.url).pathname;

async function markdownFiles(directory: string): Promise<string[]> {
  return (await readdir(directory)).filter((file) => file.endsWith(".md"));
}

async function validateLesson(file: string): Promise<string> {
  const content = await readFile(file, "utf8");
  const frontMatter = content.match(/^---\n([\s\S]*?)\n---/);
  if (!frontMatter) throw new Error(`${file}: missing front matter`);
  const keys = frontMatter[1].split("\n").map((line) => line.split(":", 1)[0]);
  const missing = required.filter((key) => !keys.includes(key));
  if (missing.length) throw new Error(`${file}: missing ${missing.join(", ")}`);
  const id = frontMatter[1].match(/^id:\s*(.+)$/m)?.[1].trim();
  if (!id) throw new Error(`${file}: missing id`);
  return id;
}

const spanish = await markdownFiles(join(root, "learning/es"));
const english = await markdownFiles(join(root, "learning/en"));
const editorials = await markdownFiles(join(root, "editorial"));
const spanishIds = new Set(await Promise.all(spanish.map((file) => validateLesson(join(root, "learning/es", file)))));
const englishIds = new Set(await Promise.all(english.map((file) => validateLesson(join(root, "learning/en", file)))));

for (const id of spanishIds) {
  if (!englishIds.has(id)) throw new Error(`Missing English lesson for ${id}`);
  if (!editorials.includes(`${id}.md`)) throw new Error(`Missing Spanish editorial guide for ${id}`);
}
if (spanishIds.size !== englishIds.size) throw new Error("Spanish and English lesson counts differ");
console.log(`Validated ${spanishIds.size} bilingual lessons and ${editorials.length} editorial guides.`);
