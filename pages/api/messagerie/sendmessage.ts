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

export default async function sendMessage(
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
  const senderId = session.user.id;
  const { receiverId, message, friendshipId } = req.body;
  const roomId = 'friendRoom' + friendshipId;
  const query =
    'INSERT INTO messagerie(senderId, receiverId, message) VALUES(?, ?, ?)';
  db.query(query, [session.user.id, receiverId, message], (err, results) => {
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
      io.to(roomId).emit('new_message', {
        senderId,
        receiverId,
        message,
      });
    }

    res.status(200).json({
      results,
    });
  });
}
