import { Server as HttpServer } from 'http';

import { NextApiRequest } from 'next';
import { Socket, Server as SocketIOServer } from 'socket.io';

import db from '@/lib/asyncDb';
import { NextApiResponseServerIO } from '@/lib/types/next';

type FriendRequest = {
  senderId: string;
  receiverId: string;
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIO,
) {
  if (!res.socket.server.io) {
    console.log('Initialisation de Socket.IO');
    const io = new SocketIOServer(res.socket.server as HttpServer, {
      path: '/api/socketio',
      cors: {
        origin: '*',
        methods: ['GET', 'POST'],
      },
    });

    res.socket.server.io = io;

    // Object to store socket.id to userId mapping
    const socketUserMap: { [key: string]: string } = {};

    io.on('connection', (socket: Socket) => {
      const userId = socket.handshake.query.userId;
      if (userId) {
        socket.join(userId);
        console.log('Utilisateur connecté :', socket.id);
      }

      // Joindre l'utilisateur à sa room
      socket.on('join', async (userId: string) => {
        socket.join('userId');

        // Récupérer les notifications non lues
        try {
          const notifications = await db.query(
            'SELECT * FROM notifications WHERE userId = ? AND status = ?',
            [userId, 'unread'],
          );
          // Envoyer les notifications non lues au client
          socket.emit('unread_notifications', notifications[0]);
        } catch (error) {
          console.error(
            'Erreur lors de la récupération des notifications non lues:',
            error,
          );
        }
      });

      socket.on('disconnect', () => {
        const userId = socketUserMap[socket.id];
        console.log(`Utilisateur ${userId} déconnecté :`, socket.id);
        delete socketUserMap[socket.id]; // Remove the mapping
      });
    });
  } else {
    console.log('Socket.IO déjà initialisé');
  }
  res.end();
}
