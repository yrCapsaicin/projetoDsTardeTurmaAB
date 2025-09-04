"""
Este módulo define rotas para operações CRUD de usuários usando FastAPI.

Rotas:
- GET /: Retorna a lista de usuários do banco de dados falso.
- GET /{user_id}: Retorna um usuário específico pelo ID.
- POST /: Cria um novo usuário e o adiciona ao banco de dados falso.
- PUT /{user_id}: Atualiza o nome de um usuário existente pelo ID.
- DELETE /{user_id}: Remove um usuário do banco de dados falso pelo ID.

Variáveis:
- fake_db: Lista simulando um banco de dados de usuários, cada usuário é um dicionário com 'id' e 'name'.
"""

from fastapi import APIRouter
from app.models import User

router = APIRouter()

fake_db = [
  {"id": 1, "name": "Alice"},
  {"id": 2, "name": "Bob"},
  {"id": 3, "name": "Carol"},
  {"id": 4, "name": "David"},
  {"id": 5, "name": "Eve"},
  {"id": 6, "name": "Frank"},
  {"id": 7, "name": "Grace"},
  {"id": 8, "name": "Heidi"},
  {"id": 9, "name": "Ivan"},
  {"id": 10, "name": "Judy"}
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