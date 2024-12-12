import { NextApiRequest, NextApiResponse } from 'next';

import db from '@/lib/db';

export default function getBestMovie(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { userId } = req.query;
    const query = `SELECT w.*
                FROM watchedmovies w
                JOIN favoritesmovies f ON w.movieId = f.movieId
                WHERE w.userId = ? AND w.rating = 5
                LIMIT 5;`;
    db.query(query, [userId], (err, results) => {
      if (err) {
        res.status(500).json({
          error: err.message,
          errno: err.errno,
        });
        return;
      }

      return res.status(200).json(results);
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
