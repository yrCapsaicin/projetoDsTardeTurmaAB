from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_get_users():
    response = client.get("/users/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)
        
    user = {"name": "Maria"}
    create_response = client.post("/users/", json=user)
    assert create_response.status_code == 201
    created_user = create_response.json()

    updated_response = client.get("/users/")
    assert updated_response.status_code == 200
    users = updated_response.json()
    assert isinstance(users, list)

    user_ids = [u["id"] for u in users]
    assert created_user["id"] in user_ids