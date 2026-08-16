"""Generate a reviewable English lesson draft with Azure AI Translator."""

from __future__ import annotations

import argparse
import json
import os
import urllib.parse
import urllib.request
from pathlib import Path


def parse_front_matter(content: str) -> tuple[str, dict[str, str], str]:
    if not content.startswith("---\n"):
        raise ValueError("The source file must start with front matter")
    _, raw_front_matter, body = content.split("---\n", 2)
    values = {}
    for line in raw_front_matter.strip().splitlines():
        key, value = line.split(":", 1)
        values[key.strip()] = value.strip()
    return "---\n", values, body


def translate(items: list[str]) -> list[str]:
    key = os.environ["AZURE_TRANSLATOR_KEY"]
    endpoint = os.getenv("AZURE_TRANSLATOR_ENDPOINT", "https://api.cognitive.microsofttranslator.com").rstrip("/")
    region = os.getenv("AZURE_TRANSLATOR_REGION")
    query = urllib.parse.urlencode({"api-version": "3.0", "from": "es", "to": "en"})
    headers = {"Ocp-Apim-Subscription-Key": key, "Content-Type": "application/json"}
    if region:
        headers["Ocp-Apim-Subscription-Region"] = region
    request = urllib.request.Request(
        f"{endpoint}/translate?{query}",
        data=json.dumps([{"text": item} for item in items]).encode(),
        headers=headers,
        method="POST",
    )
    with urllib.request.urlopen(request, timeout=30) as response:
        translated = json.loads(response.read())
    return [item["translations"][0]["text"] for item in translated]


def main() -> None:
    parser = argparse.ArgumentParser(description="Translate a Spanish lesson into an English review draft")
    parser.add_argument("source", type=Path)
    parser.add_argument("destination", type=Path)
    args = parser.parse_args()
    _, front_matter, body = parse_front_matter(args.source.read_text(encoding="utf-8"))
    fields = ["title", "prerequisites", "objectives"]
    translated = translate([front_matter[field] for field in fields] + [body])
    for field, value in zip(fields, translated):
        front_matter[field] = value
    front_matter["translation_status"] = "draft"
    rendered_front_matter = "\n".join(f"{key}: {value}" for key, value in front_matter.items())
    args.destination.parent.mkdir(parents=True, exist_ok=True)
    args.destination.write_text(f"---\n{rendered_front_matter}\n---\n{translated[-1]}", encoding="utf-8")
    print(f"Created review draft: {args.destination}")


if __name__ == "__main__":
    main()
