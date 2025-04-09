import { Server as HttpServer } from 'http';

import { NextApiRequest } from 'next';
import { Socket, Server as SocketIOServer } from 'socket.io';

import { NextApiResponseServerIO } from '@/lib/types/next';

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

    io.on('connection', (socket: Socket) => {
      const roomId = socket.handshake.query.roomId;
      if (roomId) {
        socket.join(roomId);
        console.log('Utilisateur connecté :', socket.id, 'to room:', roomId);
      }

      socket.on('disconnect', () => {
        console.log(`Utilisateur ${roomId} déconnecté :`, socket.id);
      });
    });
  } else {
    console.log('Socket.IO déjà initialisé');
  }
  res.end();
}
