import { NextApiRequest, NextApiResponse } from 'next';

import { addMovie, getMovie } from '@/lib/api/usersMovieList';
import db from '@/lib/db';

interface movieList {
  userId: string;
  movieId: string;
  typeList: string;
}

export default async function addToMovieList(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { userId, movieId, typeList }: movieList = req.body;

  if (typeList === 'favoritesmovies') {
    const data = {
      userId,
      movieId,
      typeList: 'watchedmovies',
    };
    const isMovieWatched = await getMovie(data);
    if (!isMovieWatched) {
      const response = await addMovie(data);
      if (!response) {
        res.status(500).json({ message: "Movie can't be added" });
      }
    }
  }

  const query = `INSERT INTO ${typeList} (userId, movieId) 
  SELECT ?, ? 
  WHERE NOT EXISTS (
  SELECT 1 FROM ${typeList} WHERE userId = ? AND movieId = ?
  )`;
  db.query(query, [userId, movieId, userId, movieId], (err) => {
    if (err) {
      res.status(500).json({
        error: err.message,
        errno: err.errno,
      });
      return;
    }
    res.status(201).json({ message: 'movie Added to the list' });
  });
}
