from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_delete_user():
    user = {"name": "Ana"}
    create_response = client.post("/users/", json=user)
    user_id = create_response.json()["id"]

    response = client.delete(f"/users/{user_id}")
    assert response.status_code == 200
    assert response.json()["message"] == "User deleted"

    get_response = client.get(f"/users/{user_id}")
    assert get_response.json() is None
