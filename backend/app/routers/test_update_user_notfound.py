from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_update_nonexistent_user():
    user = {"name": "Novo Nome"}
    response = client.put("/users/999", json=user)
    assert response.status_code == 200
    assert response.json()["error"] == "User not found"

def test_update_user_with_invalid_id():
    user = {"name": "Qualquer"}
    response = client.put("/users/abc", json=user)
    # erro de validação do FastAPI
    assert response.status_code == 422