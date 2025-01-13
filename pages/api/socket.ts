import { Server as HttpServer } from 'http';

import { verify } from 'jsonwebtoken';
import { NextApiRequest } from 'next';
import { Socket, Server as SocketIOServer } from 'socket.io';

import db from '@/lib/asyncDb';
import { NextApiResponseServerIO } from '@/lib/types/next';

type FriendRequest = {
  senderId: string;
  receiverId: string;
  message: string;
};

interface JwtPayload {
  id: string;
}

// Types des événements Socket.IO
interface ServerToClientEvents {
  notification: (message: string) => void;
}

interface ClientToServerEvents {
  sendNotification: (data: { toUserId: string; message: string }) => void;
  join: (userId: string) => void;
  notifications: (notifications: unknown) => void;
  send_friend_request: (data: FriendRequest) => void;
}

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

    io.on(
      'connection',
      (socket: Socket<ClientToServerEvents, ServerToClientEvents>) => {
        console.log('Utilisateur connecté :', socket.id);

        try {
          const token = socket.handshake.query.token as string | undefined;

          if (!token) {
            socket.disconnect();
            return;
          }
          // Vérifier le token et récupérer l'ID utilisateur
          const jwtSecret = process.env.JWT_SECRET;
          if (!jwtSecret) {
            throw new Error(
              "JWT_SECRET est manquant dans les variables d'environnement !",
            );
          }

          const decoded = verify(token, jwtSecret) as JwtPayload;
          const userId = decoded.id;

          console.log(`Utilisateur connecté : ${userId}`);
        } catch (err) {
          console.error('Authentification échouée :', err);
          socket.disconnect(); // Déconnecter si l'authentification échoue
        }

        // Joindre l'utilisateur à sa room
        socket.on('join', async (userId: string) => {
          socket.join(userId);
          console.log(`Utilisateur ${userId} a rejoint sa room.`);

          // Récupérer les notifications
          try {
            const [notifications] = await db.query(
              'SELECT * FROM notifications WHERE userId = ?',
              [userId],
            );

            // Envoyer les notifications au client
            socket.emit('notification', JSON.stringify(notifications));
            console.log('Notifications envoyées au client:', notifications);
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
      },
    );
  } else {
    console.log('Socket.IO déjà initialisé');
  }

  res.end();
}
