import { Server as HttpServer } from 'http';

import { NextApiRequest } from 'next';
import { Server as SocketIOServer } from 'socket.io';

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

    io.on('connection', (socket) => {
      console.log('Utilisateur connecté :', socket.id);

      // Joindre l'utilisateur à sa room
      socket.on('join', async (userId: string) => {
        socket.join(userId);
        console.log(`Utilisateur ${userId} a rejoint sa room.`);

        // Récupérer les notifications non lues
        // Récupérer les notifications non lues
        try {
          const notifications = await db.query(
            'SELECT * FROM notifications WHERE userId = ? AND status = ?',
            [userId, 'unread'],
          );

          // Envoyer les notifications non lues au client
          socket.emit('unread_notifications', notifications[0]);
          console.log(
            'Notifications non lues envoyées au client:',
            notifications,
          );
        } catch (error) {
          console.error(
            'Erreur lors de la récupération des notifications non lues:',
            error,
          );
        }
      });

      // Gérer l'envoi de demandes d'amis
      socket.on('send_friend_request', async (data: FriendRequest) => {
        // Envoyer la notification en temps réel si le destinataire est connecté
        io.to(data.receiverId).emit('friend_request_notification', data);
      });

      socket.on('disconnect', () => {
        console.log('Utilisateur déconnecté :', socket.id);
      });
    });
  } else {
    console.log('Socket.IO déjà initialisé');
  }

  res.end();
}
