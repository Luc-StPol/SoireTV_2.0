import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';

import db from '@/lib/db';

import { authOptions } from '../auth/[...nextauth]';

interface movieList {
  userId: string;
  typeList: string;
}

export default async function getFromMovieList(
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
