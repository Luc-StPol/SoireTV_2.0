import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';

import db from '@/lib/db';

import { authOptions } from '../auth/[...nextauth]';

export default async function getfriendslist(
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
  const query =
    'SELECT u.id, u.name, u.profilPicture,  f.id AS friendshipId FROM users u JOIN friendslist f On u.id = f.friendId OR u.id = f.userId WHERE ? IN (f.userId, f.friendId) AND u.id != ?';
  db.query(query, [session.user.id, session.user.id], (err, results) => {
    if (err) {
      res.status(500).json({
        error: err.message,
        errno: err.errno,
      });
      console.log(err);
      return;
    }
    console.log('Friend list=', results);
    return res.status(200).json({
      results,
    });
  });
}
