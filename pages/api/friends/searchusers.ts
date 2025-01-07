import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';

import db from '@/lib/db';

import { authOptions } from '../auth/[...nextauth]';

export default async function searchUsers(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
  const { userName } = req.query;

  if (!userName) {
    return res.status(400).json({ error: 'Name is required' });
  }

  const query = `SELECT * FROM users WHERE name LIKE ?`;
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
