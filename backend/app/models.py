from pydantic import BaseModel

class User(BaseModel):
    id: int
    name: str
    email: str
    password: float
    bio: str
    styles: list[str]

class Music(BaseModel):
    title: str
    duration: int
    link: str
    lyric: int
    credits: list[str]
