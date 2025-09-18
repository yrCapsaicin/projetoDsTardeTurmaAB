from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_create_user():
    user = {"name": "Maria"}
    response = client.post("/users/", json=user)
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "Maria"
    assert "id" in data
