from fastapi import APIRouter
from app.models import User

router = APIRouter()

fake_db = [
    {"id": 1, "name": "Alice"},
    {"id": 2, "name": "Bob"}
]

@router.get("/")
def get_users():
    return fake_db

@router.get("/{user_id}")
def get_user(user_id: int):
    user = next((user for user in fake_db if user["id"] == user_id), None)
    if user:
        return user

@router.post("/")
def create_user(user: User):
    new_user = {"id": len(fake_db) + 1, "name": user.name}
    fake_db.append(new_user)
    return new_user

@router.put("/{user_id}")
def update_user(user_id: int, user: User):
    if user_id > len(fake_db):
        return {"error": "User not found"}
    fake_db[user_id - 1] = {"id": user_id, "name": user.name}
    return {"message": "User updated"}

@router.delete("/{user_id}")
def delete_user(user_id: int):
    if user_id > len(fake_db):
        return {"error": "User not found"}
    del fake_db[user_id - 1]
    return {"message": "User deleted"}