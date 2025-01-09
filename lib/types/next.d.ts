import { Server as NetServer } from 'http';
import { Socket } from 'net';

import { Server as SocketIOServer } from 'socket.io';

export type NextApiResponseServerIO = {
  end(): unknown;
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer;
    };
  };
};
