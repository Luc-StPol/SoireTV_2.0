import { NextApiRequest, NextApiResponse } from 'next';

import { addMovie, getMovie } from '@/lib/api/usersMovieList';
import db from '@/lib/db';

interface movieList {
  userId: string;
  movieId: string;
  typeList: string;
  movieTitle?: string;
  moviePoster?: string;
}

export default async function addToMovieList(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { userId, movieId, typeList, movieTitle, moviePoster }: movieList =
    req.body;

  console.log(movieTitle);
  // Check if the movie exists in the "movies" table, if not, insert it
  const movieQuery = `INSERT INTO movies (id, title, poster_path) 
  SELECT ?, ?, ? 
  WHERE NOT EXISTS (
    SELECT 1 FROM movies WHERE id = ?
  )`;
  db.query(movieQuery, [movieId, movieTitle, moviePoster, movieId], (err) => {
    if (err) {
      res.status(500).json({
        error: err.message,
        errno: err.errno,
      });
      return;
    }
  });

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
        return;
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
    return res.status(201).json({ message: 'Movie added to the list' });
  });
}
