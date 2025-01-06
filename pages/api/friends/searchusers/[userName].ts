import { NextApiRequest, NextApiResponse } from 'next';

import db from '@/lib/db';

export default async function searchUsers(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { userName } = req.query;

  if (!userName) {
    return res.status(400).json({ error: 'Name is required' });
  }

  const query = `SELECT id, name, profilPicture FROM users WHERE name LIKE ?`;
  db.query(query, [`%${userName}%`], (err, results) => {
    if (err) {
      return res.status(500).json({
        error: err.message,
        errno: err.errno,
      });
    }
    return res.status(200).json({ users: results });
  });
}
