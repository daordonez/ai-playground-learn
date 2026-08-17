import { describe, expect, it } from "vitest";
import { lessonsFor } from "./content";

describe("learning content", () => {
  it("provides structured, secure learning resources for every bilingual lesson", () => {
    for (const locale of ["es", "en"] as const) {
      const lessons = lessonsFor(locale);
      expect(lessons).toHaveLength(12);

      for (const lesson of lessons) {
        expect(lesson.resources.some((resource) => resource.type === "official_docs")).toBe(true);
        expect(lesson.resources.some((resource) => resource.type === "video")).toBe(true);
        expect(lesson.resources.every((resource) => resource.url.startsWith("https://"))).toBe(true);
      }
    }
  });
});
