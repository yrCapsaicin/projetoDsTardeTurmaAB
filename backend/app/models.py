from pydantic import BaseModel

class User(BaseModel):
    id: int
    name: str
    email: str
    password: float
    bio: str
    styles: list[str]

class Artist(BaseModel):
    id: int
    name: str
    email: str
    password: int
    bio: str
    musics: list[str]

class Music(BaseModel):
    title: str
    duration: int
    link: str
    lyric: int
    credits: list[str]
