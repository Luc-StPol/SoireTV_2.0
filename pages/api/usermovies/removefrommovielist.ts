import { deleteMovie, getMovie } from '@/lib/api/usersMovieList';
import db from '@/lib/db';
import { NextApiRequest, NextApiResponse } from 'next';

interface movieList {
  userId: string;
  movieId: string;
  typeList: string;
}

export default async function removeFromMovieList(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { userId, movieId, typeList }: movieList = req.body;

  if (typeList === 'watchedmovies') {
    const data = {
      userId,
      movieId,
      typeList: 'favoritesmovies',
    };
    const isMovieWatched = await getMovie(data);
    if (isMovieWatched) {
      const response = await deleteMovie(data);
      if (!response) {
        res.status(500).json({ message: "Movie can't be deleted" });
      }
    }
  }
  const query = `DELETE FROM ${typeList} WHERE userId = ? AND movieId = ?`;
  db.query(query, [userId, movieId], (err) => {
    if (err) {
      res.status(500).json({
        error: err.message,
        errno: err.errno,
      });
      return;
    }
    res.status(200).json({ message: 'Movie deleted' });
  });
}
