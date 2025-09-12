from pydantic import BaseModel

class User(BaseModel):
    id: int
    name: str
    email: str
    password: str
    bio: str
    styles: list[int]

class Artist(BaseModel):
    id: int
    name: str
    email: str
    password: str
    bio: str
    musics: list[int]

class Music(BaseModel):
    id: int
    title: str
    duration: float
    link: str
    lyric: str
    credits: list[int]

class Styles(BaseModel):
    id: int
    name: str
