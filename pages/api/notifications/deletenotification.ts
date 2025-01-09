import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';

import db from '@/lib/db';

import { authOptions } from '../auth/[...nextauth]';

export default async function deleteNotification(
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

  const { id, type } = req.body;
  console.log('reqBody=', req.body);
  console.log('id=', type);
  const query = `DELETE FROM notifications WHERE userId = ? AND type = ? AND sendById = ?`;
  db.query(query, [id, type, session.user.id], (err) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        error: err.message,
        errno: err.errno,
      });
      return;
    }
    res.status(200).json({ message: 'Notification deleted' });
  });
}
