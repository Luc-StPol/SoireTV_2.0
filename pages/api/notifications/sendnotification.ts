import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';

import db from '@/lib/db';

import { authOptions } from '../auth/[...nextauth]';

export default async function sendNotification(
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
  const { id, message, type } = req.body;
  const status = 'unread';
  const query =
    'INSERT INTO notifications (userId, status, message, type, sendById) VALUES (?, ?, ?, ?, ?)';
  db.query(
    query,
    [id, status, message, type, session.user.id],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).json({
          error: err.message,
          errno: err.errno,
        });
        return;
      }
      res.status(200).json({
        results,
      });
    },
  );
}
