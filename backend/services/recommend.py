from typing import Dict, Any, List
from peewee import fn, JOIN

# --------------------------
# Helper de importação de models
# --------------------------
def try_import_models() -> Dict[str, Any]:
  candidates = [
      "backend.models",
      "backend.models.models",
      "models",
      "app.models",
  ]

  for base in candidates:
      try:
          mod = __import__(base, fromlist=["Users", "Musics", "user_music_ratings"])
          Users = getattr(mod, "Users", None)
          Musics = getattr(mod, "Musics", None)
          UserMusicRating = getattr(mod, "user_music_ratings", None)
          if Users and Musics and UserMusicRating:
              return {
                  "Users": Users,
                  "Musics": Musics,
                  "UserMusicRating": UserMusicRating,
              }
      except Exception:
          continue

  return {}

# --------------------------
# Core recommenders
# Todas as funções recebem os Model classes (User, Music, UserMusicRating).
# --------------------------

def recommend_popular(
    User, Music, UserMusicRating,
    user_id: int = None, limit: int = 10
) -> List[Dict[str, Any]]:

  subq = (UserMusicRating
          .select(UserMusicRating.music)
          .where(UserMusicRating.user == user_id))

  q = (Music
        .select(Music, fn.COUNT(UserMusicRating.id).alias("likes"))
        .join(UserMusicRating, JOIN.LEFT_OUTER, on=((UserMusicRating.music == Music.id) & (UserMusicRating.rating == 1)))
        .where(Music.id.not_in(subq))
        .group_by(Music.id)
        .order_by(fn.COUNT(UserMusicRating.id).desc(), Music.posted_at.desc())
        .limit(limit))
  out = []
  for row in q:
      out.append({
          "id": row.id,
          "title": getattr(row, "title", None),
          "artist_id": getattr(row, "artist_id", None),
          "likes": int(getattr(row, "likes", 0) or 0),
          "posted_at": getattr(row, "posted_at", None)
      })
  return out

