import db from '@/lib/db';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function getRating(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { userId, movieId } = req.body;

  try {
    const query =
      'SELECT rating FROM watchedmovies WHERE userId = ? AND movieId = ?';
    db.query(query, [userId, movieId], (err, results) => {
      if (err) {
        res.status(500).json({
          error: err.message,
          errno: err.errno,
        });
        return;
      }
      res.status(200).json({ results });
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error });
  }
}
