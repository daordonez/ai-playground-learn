export type Locale = "es" | "en";
export type Role = "editor" | "student";

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
  body: string;
}

export interface Profile {
  role: Role;
  preferred_locale: Locale;
}
