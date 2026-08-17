export type Locale = "es" | "en";
export type Role = "editor" | "student";
export type LessonResourceType = "official_docs" | "video";

export interface LessonResource {
  type: LessonResourceType;
  title: string;
  description: string;
  url: string;
  provider: string;
}

export interface Lesson {
  id: string;
  module: number;
  order: number;
  title: string;
  duration: string;
  prerequisites: string[];
  objectives: string[];
  translationStatus: "published" | "draft";
  visibility: "learning";
  resources: LessonResource[];
  body: string;
}

export interface Profile {
  role: Role;
  preferred_locale: Locale;
}
