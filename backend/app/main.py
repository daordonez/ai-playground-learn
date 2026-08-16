"""FastAPI entry point for the learning platform."""

from __future__ import annotations

import os
from contextlib import asynccontextmanager
from pathlib import Path

from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles

from .database import Database
from .schemas import Profile, ProfileUpdate, Progress, ProgressUpdate

PROJECT_DIR = Path(__file__).resolve().parents[2]
DATA_DIR = Path(os.getenv("DATA_DIR", PROJECT_DIR / "data"))
WEB_DIR = Path(os.getenv("WEB_DIR", PROJECT_DIR / "frontend" / "dist"))
database = Database(DATA_DIR / "learning.db")


@asynccontextmanager
async def lifespan(_: FastAPI):
    database.initialize()
    yield


app = FastAPI(title="AI Playground Learn", version="0.1.0", lifespan=lifespan)


@app.get("/api/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.get("/api/profile", response_model=Profile)
def get_profile() -> Profile:
    return Profile.model_validate(dict(database.get_profile()))


@app.put("/api/profile", response_model=Profile)
def update_profile(update: ProfileUpdate) -> Profile:
    return Profile.model_validate(dict(database.update_locale(update.preferred_locale)))


@app.get("/api/progress", response_model=Progress)
def get_progress() -> Progress:
    return Progress(items=database.get_progress())


@app.put("/api/progress", response_model=Progress)
def update_progress(update: ProgressUpdate) -> Progress:
    if not update.lesson_id.strip():
        raise HTTPException(status_code=422, detail="lesson_id cannot be blank")
    return Progress(items=database.set_progress(update.lesson_id, update.completed))


if WEB_DIR.exists():
    app.mount("/", StaticFiles(directory=WEB_DIR, html=True), name="web")
