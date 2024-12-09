import db from '@/lib/db';
import { NextApiRequest, NextApiResponse } from 'next';

interface movieList {
  userId: string;
  movieId: string;
  typeList: string;
}

export default function addToMovieToList(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { userId, movieId, typeList }: movieList = req.body;

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
