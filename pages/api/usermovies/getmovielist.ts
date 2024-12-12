import { NextApiRequest, NextApiResponse } from 'next';

import db from '@/lib/db';

export default function getMovieList(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { userId, typeList } = req.body;
    const query = `SELECT * FROM ${typeList} WHERE userId = ?`;
    db.query(query, [userId], (err, results) => {
      if (err) {
        res.status(500).json({
          error: err.message,
          errno: err.errno,
        });
        return;
      }
      if (!results) {
        res.status(404).json('Movies not found');
        return;
      }
      res.status(200).json({ results });
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error });
  }
}
