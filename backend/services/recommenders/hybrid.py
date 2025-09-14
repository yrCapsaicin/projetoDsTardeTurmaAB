from typing import List, Dict, Any

def recommend_hybrid(User=None, Music=None, UserMusicRating=None, user_id: int = None, limit: int = 10, w_pop: float = 0.3, w_collab: float = 0.5, w_geo: float = 0.2, collab_similarity: str = "jaccard", geo_method: str = "haversine"):
  return recommend_hybrid(User=User, Music=Music, UserMusicRating=UserMusicRating, user_id=user_id, limit=limit, w_pop=w_pop, w_collab=w_collab, w_geo=w_geo, collab_similarity=collab_similarity, geo_method=geo_method)