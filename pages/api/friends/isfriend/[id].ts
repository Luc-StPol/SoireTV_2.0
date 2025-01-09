import { error } from 'console';

import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';

import db from '@/lib/db';

import { authOptions } from '../../auth/[...nextauth]';

export default async function isfollowed(
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

  const { id } = req.query;
  const query = `SELECT * FROM friendslist WHERE (userId = ? AND friendId = ?) OR(userId = ? AND friendId = ?) `;
  db.query(
    query,
    [session.user.id, id, id, session.user.id],
    (err, results) => {
      if (err) {
        res.status(500).json({
          error: err.message,
          errno: err.errno,
        });
        return;
      }
      if (!results) {
        res.status(204).json(error);
        return;
      }
      res.status(200).json(results);
    },
  );
}
