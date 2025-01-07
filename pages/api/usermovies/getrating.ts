import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';

import db from '@/lib/db';

import { authOptions } from '../auth/[...nextauth]';

export default async function getRating(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
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
