from typing import Literal

from pydantic import BaseModel


Locale = Literal["es", "en"]
Role = Literal["editor", "student"]


class Profile(BaseModel):
    role: Role
    preferred_locale: Locale


class ProfileUpdate(BaseModel):
    preferred_locale: Locale


class Progress(BaseModel):
    items: dict[str, bool]


class ProgressUpdate(BaseModel):
    lesson_id: str
    completed: bool
