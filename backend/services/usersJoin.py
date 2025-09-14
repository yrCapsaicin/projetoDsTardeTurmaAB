from typing import Dict, Any, List
from peewee import fn, JOIN

from backend.services.popular import recommend_popular
from .helper import try_import_models

def recommend_collaborative_user(
    User=None, Music=None, UserMusicRating=None,
    user_id: int = None, limit: int = 10, neighbor_fetch_limit: int = 200,
) -> List[Dict[str, Any]]:
  
  if not (User and Music and UserMusicRating):
    imported = try_import_models()
    User = User or imported.get("User")
    Music = Music or imported.get("Music")
    UserMusicRating = UserMusicRating or imported.get("UserMusicRating")
  if not (User and Music and UserMusicRating):
    raise RuntimeError("Modelos não fornecidos.")
  

  target_likes_q = (UserMusicRating.select(UserMusicRating.music).where((UserMusicRating.user == user_id) & (UserMusicRating.rating == 1)))
  target_likes = {r.music_id for r in target_likes_q}
  if not target_likes: return recommend_popular(User=User, Music=Music, UserMusicRating=UserMusicRating, user_id=user_id, limit=limit)
  
  
  candidates_q = (UserMusicRating
                  .select(UserMusicRating.user, fn.COUNT(UserMusicRating.music).alias("common"))
                  .where((UserMusicRating.music.in_(list(target_likes))) & (UserMusicRating.rating == 1) & (UserMusicRating.user != user_id))
                  .group_by(UserMusicRating.user)
                  .order_by(fn.COUNT(UserMusicRating.music).desc())
                  .limit(neighbor_fetch_limit))
  '''
  SQL equivalente para mais clareza:
  SELECT user_id, COUNT(music_id) AS common
  FROM user_music_ratings
  WHERE music_id IN (:target_likes)  -- lista de IDs curtidos pelo usuário
    AND rating = 1
    AND user_id != :user_id
  GROUP BY user_id
  ORDER BY common DESC
  LIMIT :neighbor_fetch_limit;
  '''
  candidate_user_ids = [r.user_id for r in candidates_q]
  if not candidate_user_ids:
      return recommend_popular(User=User, Music=Music, UserMusicRating=UserMusicRating, user_id=user_id, limit=limit)