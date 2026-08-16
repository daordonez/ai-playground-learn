from pathlib import Path

from fastapi.testclient import TestClient

from app import main
from app.database import Database


def create_client(tmp_path: Path) -> TestClient:
    main.database = Database(tmp_path / "learning.db")
    return TestClient(main.app)


def test_profile_defaults_to_spanish_editor(tmp_path: Path) -> None:
    with create_client(tmp_path) as client:
        response = client.get("/api/profile")
    assert response.status_code == 200
    assert response.json() == {"role": "editor", "preferred_locale": "es"}


def test_profile_locale_is_persistent(tmp_path: Path) -> None:
    with create_client(tmp_path) as client:
        response = client.put("/api/profile", json={"preferred_locale": "en"})
        profile = client.get("/api/profile")
    assert response.json()["preferred_locale"] == "en"
    assert profile.json()["preferred_locale"] == "en"


def test_lesson_progress_is_persistent(tmp_path: Path) -> None:
    with create_client(tmp_path) as client:
        response = client.put("/api/progress", json={"lesson_id": "api-basics", "completed": True})
        progress = client.get("/api/progress")
    assert response.json()["items"] == {"api-basics": True}
    assert progress.json()["items"] == {"api-basics": True}
