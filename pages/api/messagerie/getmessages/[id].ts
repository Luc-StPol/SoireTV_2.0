import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';

import db from '@/lib/db';

import { authOptions } from '../../auth/[...nextauth]';

export default async function getMessages(
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
  const query = `SELECT * FROM messagerie WHERE (senderId = ? AND receiverId = ?) OR (senderId = ? AND receiverId = ?)`;
  db.query(
    query,
    [id, session.user.id, session.user.id, id],
    (err, results) => {
      if (err) {
        res.status(500).json({
          error: err.message,
          errno: err.errno,
        });
        return;
      }
      res.status(200).json({ results });
    },
  );
}
