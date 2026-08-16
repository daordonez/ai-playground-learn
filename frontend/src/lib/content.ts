import type { Lesson, Locale } from "../types";

const files = import.meta.glob<string>("../content/learning/**/*.md", { eager: true, query: "?raw", import: "default" });

function parseList(value: string): string[] {
  return value.replaceAll("[", "").replaceAll("]", "").split(",").map((item) => item.trim()).filter(Boolean);
}

function parseLesson(raw: string): Lesson {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) throw new Error("Invalid lesson front matter");
  const values = Object.fromEntries(match[1].split("\n").map((line) => {
    const separator = line.indexOf(":");
    return [line.slice(0, separator).trim(), line.slice(separator + 1).trim().replace(/^['"]|['"]$/g, "")];
  }));
  return {
    id: values.id,
    module: Number(values.module),
    order: Number(values.order),
    title: values.title,
    duration: values.duration,
    prerequisites: parseList(values.prerequisites),
    objectives: parseList(values.objectives),
    translationStatus: values.translation_status as Lesson["translationStatus"],
    visibility: "learning",
    body: match[2],
  };
}

export function lessonsFor(locale: Locale): Lesson[] {
  return Object.entries(files)
    .filter(([path]) => path.includes(`/learning/${locale}/`))
    .map(([, raw]) => parseLesson(raw))
    .sort((a, b) => a.order - b.order);
}

export function lessonFor(locale: Locale, id: string): Lesson | undefined {
  return lessonsFor(locale).find((lesson) => lesson.id === id);
}
