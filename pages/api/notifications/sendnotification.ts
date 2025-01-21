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

export default async function sendNotification(
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

      // Envoyer la notification en temps réel via Socket.IO
      if (res.socket && res.socket.server && res.socket.server.io) {
        const io = res.socket.server.io as SocketIOServer;
        io.to(id).emit('new_notification', {
          id,
          message,
          type,
        });
        console.log('Nouvelle notification envoyée:', { id, message, type });
      }

      res.status(200).json({
        results,
      });
    },
  );
}
