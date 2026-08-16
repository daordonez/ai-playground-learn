"""SQLite persistence for the local learning profile."""

from __future__ import annotations

import sqlite3
from contextlib import contextmanager
from pathlib import Path
from typing import Iterator


class Database:
    def __init__(self, path: Path) -> None:
        self.path = path

    @contextmanager
    def connect(self) -> Iterator[sqlite3.Connection]:
        connection = sqlite3.connect(self.path)
        connection.row_factory = sqlite3.Row
        try:
            yield connection
            connection.commit()
        finally:
            connection.close()

    def initialize(self) -> None:
        self.path.parent.mkdir(parents=True, exist_ok=True)
        with self.connect() as connection:
            connection.executescript(
                """
                CREATE TABLE IF NOT EXISTS profiles (
                    id INTEGER PRIMARY KEY CHECK (id = 1),
                    role TEXT NOT NULL CHECK (role IN ('editor', 'student')),
                    preferred_locale TEXT NOT NULL CHECK (preferred_locale IN ('es', 'en')),
                    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
                );
                CREATE TABLE IF NOT EXISTS lesson_progress (
                    lesson_id TEXT PRIMARY KEY,
                    completed INTEGER NOT NULL CHECK (completed IN (0, 1)),
                    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
                );
                INSERT OR IGNORE INTO profiles (id, role, preferred_locale)
                VALUES (1, 'editor', 'es');
                """
            )

    def get_profile(self) -> sqlite3.Row:
        with self.connect() as connection:
            return connection.execute("SELECT role, preferred_locale FROM profiles WHERE id = 1").fetchone()

    def update_locale(self, locale: str) -> sqlite3.Row:
        with self.connect() as connection:
            connection.execute(
                "UPDATE profiles SET preferred_locale = ?, updated_at = CURRENT_TIMESTAMP WHERE id = 1",
                (locale,),
            )
        return self.get_profile()

    def get_progress(self) -> dict[str, bool]:
        with self.connect() as connection:
            rows = connection.execute("SELECT lesson_id, completed FROM lesson_progress").fetchall()
        return {row["lesson_id"]: bool(row["completed"]) for row in rows}

    def set_progress(self, lesson_id: str, completed: bool) -> dict[str, bool]:
        with self.connect() as connection:
            connection.execute(
                """
                INSERT INTO lesson_progress (lesson_id, completed, updated_at)
                VALUES (?, ?, CURRENT_TIMESTAMP)
                ON CONFLICT(lesson_id) DO UPDATE SET completed = excluded.completed, updated_at = CURRENT_TIMESTAMP
                """,
                (lesson_id, completed),
            )
        return self.get_progress()
