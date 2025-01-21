import { NextApiRequest } from 'next';
import { getServerSession } from 'next-auth/next';
import { Server as SocketIOServer } from 'socket.io';

import db from '@/lib/db';
import {
  GetServerSessionRequest,
  GetServerSessionResponse,
  NextApiResponseWithSocket,
} from '@/lib/types/next';

import { authOptions } from '../auth/[...nextauth]';

export default async function deleteNotification(
  req: NextApiRequest,
  res: NextApiResponseWithSocket,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const session = await getServerSession(
    req as GetServerSessionRequest,
    res as GetServerSessionResponse,
    authOptions,
  );
  if (!session) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const { id, type, notificationId } = req.body;

  console.log('reqBody=', req.body);
  const query = `DELETE FROM notifications WHERE ( userId = ? AND type = ? AND sendById = ?) OR id = ?`;
  console.log(query);
  db.query(query, [id, type, session.user.id, notificationId], (err) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        error: err.message,
        errno: err.errno,
      });
      return;
    }
    if (res.socket && res.socket.server && res.socket.server.io) {
      const io = res.socket.server.io as SocketIOServer;
      io.to(id).emit('remove_notification', {
        id,
      });
    }
    res.status(200).json({ message: 'Notification deleted' });
  });
}
