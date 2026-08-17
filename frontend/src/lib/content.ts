import { parse } from "yaml";
import type { Lesson, LessonResource, Locale } from "../types";

const files = import.meta.glob<string>("../content/learning/**/*.md", { eager: true, query: "?raw", import: "default" });

function parseLesson(raw: string): Lesson {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) throw new Error("Invalid lesson front matter");
  const values = parse(match[1]) as Record<string, unknown>;
  const resources = values.resources as LessonResource[] | undefined;
  if (!Array.isArray(resources)) throw new Error(`Lesson ${values.id}: resources must be a list`);
  return {
    id: String(values.id),
    module: Number(values.module),
    order: Number(values.order),
    title: String(values.title),
    duration: String(values.duration),
    prerequisites: values.prerequisites as string[],
    objectives: values.objectives as string[],
    translationStatus: values.translation_status as Lesson["translationStatus"],
    visibility: "learning",
    resources,
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
