from fastapi import APIRouter
from app.models import Music
from app.db.fake_db import fake_db

router = APIRouter()

@router.get("/")
def get_music():
    return fake_db.musics

@router.get("/{music_id}")
def get_music(music_id: int):
    music = next((music for music in fake_db if music["id"] == music_id), None)
    if music:
        return music