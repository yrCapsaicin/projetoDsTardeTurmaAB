from typing import List, Dict, Any, Tuple
from ramos_popular import recommend_popular
from utils.ramos_helper import try_import_models
from utils.geo import _haversine_km

def recommend_geo(User=None, Music=None, UserMusicRating=None, user_id: int = None, radius_km: float = 20.0, limit: int = 10, method: str = "haversine") -> List[Dict[str, Any]]:
  if not (User and Music and UserMusicRating):
    imported = try_import_models()
    User = User or imported.get("User")
    Music = Music or imported.get("Music")
    UserMusicRating = UserMusicRating or imported.get("UserMusicRating")

  if not (User and Music and UserMusicRating):
    raise RuntimeError("Models not provided.")

  user = User.get_or_none(User.id == user_id)

  if not user or getattr(user, "latitude", None) is None or getattr(user, "longitude", None) is None:
    return recommend_popular(User=User, Music=Music, UserMusicRating=UserMusicRating, user_id=user_id, limit=limit)

  q_limit = 1000

  rated_subq = (
    UserMusicRating
      .select(UserMusicRating.music)
      .where(UserMusicRating.user == user_id)
  )

  sample_q = (
    Music
      .select(Music, User.latitude, User.longitude)
      .join(User, on=(Music.artist == User.id))
      .where((User.latitude.is_null(False)) & (User.longitude.is_null(False)) & (Music.id.not_in(rated_subq)))
      .order_by(Music.posted_at.desc())
      .limit(q_limit)
  )

  candidates: List[Tuple[float, Any]] = []
  seen = set()
  
  for row in sample_q:
    if row.id in seen:
      continue
    
    try:
      dist_km = _haversine_km(float(user.latitude), float(user.longitude), float(row.latitude), float(row.longitude))
    except Exception:
      continue
    
    if dist_km <= float(radius_km):
      candidates.append((dist_km, row))
      seen.add(row.id)

  candidates.sort(key=lambda x: (x[0],))
  out = []
  
  for dist_km, row in candidates[:limit]:
    out.append({
      "id": row.id,
      "title": getattr(row, "title", None),
      "artist_id": getattr(row, "artist_id", None),
      "distance_km": float(dist_km),
      "posted_at": getattr(row, "posted_at", None)
    })

  if len(out) < limit:
    more = recommend_popular(User=User, Music=Music, UserMusicRating=UserMusicRating, user_id=user_id, limit=limit - len(out))
    existing = {x["id"] for x in out}
    
    for m in more:
      if m["id"] not in existing:
        out.append(m)

  return out