import { NextApiRequest, NextApiResponse } from 'next';

import db from '@/lib/db';

interface movieList {
  userId: string;
  typeList: string;
}

export default function getFromMovieList(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { userId, typeList }: movieList = req.body;
  const query = `SELECT movieId FROM ${typeList} WHERE userId = ?`;
  db.query(query, [userId], (err, results) => {
    if (err) {
      res.status(500).json({
        error: err.message,
        errno: err.errno,
      });
      return;
    }
    if (!results) {
      res.status(404).json('User not found');
      return;
    }
    res.status(200).json({ results });
  });
}
