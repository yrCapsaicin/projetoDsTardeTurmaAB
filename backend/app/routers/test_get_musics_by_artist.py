from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_get_musics_by_artist():
    artist_id = 1
    response = client.get(f"/api/artists/{artist_id}/musics")
    assert response.status_code == 200
    musics = response.json()
    assert isinstance(musics, list)
    for music in musics:
        assert music["artist_id"] == artist_id
