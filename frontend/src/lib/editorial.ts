const files = import.meta.glob<string>("../content/editorial/*.md", { eager: true, query: "?raw", import: "default" });

export function editorialFor(id: string): string | undefined {
  return Object.entries(files).find(([path]) => path.endsWith(`/${id}.md`))?.[1];
}

export function allEditorial(): Array<{ id: string; body: string }> {
  return Object.entries(files).map(([path, body]) => ({ id: path.split("/").pop()?.replace(".md", "") ?? path, body }));
}
