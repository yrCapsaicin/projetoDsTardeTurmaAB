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

@router.post("/")
def create_user(user: User):
    new_user = {"id": len(fake_db) + 1, "name": user.name}
    fake_db.append(new_user)
    return new_user
