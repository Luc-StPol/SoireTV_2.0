import { RowDataPacket } from 'mysql2';
import { NextApiRequest, NextApiResponse } from 'next';

import db from '@/lib/db';

interface movieList {
  userId: string;
  movieId: string;
  typeList: string;
}

interface movieData extends RowDataPacket {
  movieId?: string;
}

export default function getMovie(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { userId, movieId, typeList }: movieList = req.body;
  const query = `SELECT movieId FROM ${typeList} WHERE userId = ? AND movieID = ?`;
  db.query(query, [userId, movieId], (err, results: movieData[]) => {
    if (err) {
      res.status(500).json({
        error: err.message,
        errno: err.errno,
      });
      return;
    }
    if (results.length === 0) {
      res.status(200).json(false);
      return;
    }
    res.status(200).json(true);
  });
}
