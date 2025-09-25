from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_get_artists():
    response = client.get("/api/artists/")
    assert response.status_code == 200
    artists = response.json()
    assert isinstance(artists, list)
    for artist in artists:
        assert "id" in artist
        assert "name" in artist
        assert artist["type"] == "artist"
