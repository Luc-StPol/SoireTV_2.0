import { NextApiRequest, NextApiResponse } from 'next';

import { getMovieList } from '@/lib/api/usersMovieList';
import db from '@/lib/db';

export default async function getMoviesFromList(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const data = req.body;

  const response = await getMovieList(data);
  const results = response.results;

  if (!Array.isArray(results) || results.length === 0) {
    return res.status(204).json({ message: 'No movie added yet' });
  }

  // Extract movieIds from response
  const movieIds = results.map((movie: { movieId: string }) => movie.movieId);

  const query = `SELECT * FROM movies WHERE id IN (?)`;
  db.query(query, [movieIds], (err, results) => {
    if (err) {
      return res.status(500).json({
        error: err.message,
        errno: err.errno,
      });
    }
    return res.status(200).json({ movies: results });
  });
}
