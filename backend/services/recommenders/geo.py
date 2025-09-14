from typing import List, Dict, Any, Tuple

def recommend_geo(User=None, Music=None, UserMusicRating=None, user_id: int = None, radius_km: float = 20.0, limit: int = 10, method: str = "haversine") -> List[Dict[str, Any]]:
  return recommend_geo(User=User, Music=Music, UserMusicRating=UserMusicRating, user_id=user_id, radius_km=radius_km, limit=limit, method=method)