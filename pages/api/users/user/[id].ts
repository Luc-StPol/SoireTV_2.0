import { NextApiRequest, NextApiResponse } from 'next/types';

import db from '@/lib/db';

export default function user(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id } = req.query;
  const query = 'SELECT * FROM users WHERE id = ?';
  db.query(query, [id], (err, results) => {
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
    res.status(200).json({
      results,
    });
  });
}
