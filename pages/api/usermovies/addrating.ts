import { NextApiRequest, NextApiResponse } from 'next';

import { addMovie, getMovie } from '@/lib/api/usersMovieList';
import db from '@/lib/db';

export default async function addRating(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { userId, movieId, rating } = req.body;
  const typeList = 'watchedmovies';
  const data = { userId, movieId, typeList };

  try {
    const isMovieWatched = await getMovie(data);
    if (!isMovieWatched) {
      const response = await addMovie(data);
      if (!response) {
        res.status(500).json({ message: "Movie can't be added" });
      }
    }

    const query =
      'UPDATE watchedmovies SET rating = ? WHERE movieId = ? AND userId = ?';
    db.query(query, [rating, movieId, userId], (err) => {
      if (err) {
        res.status(500).json({
          error: err.message,
          errno: err.errno,
        });
        return;
      }
      res.status(201).json({ message: 'movie rated' });
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error });
  }
}
