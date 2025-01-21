import { Server as HTTPServer, Server as NetServer } from 'http';
import { Socket } from 'net';

import { NextApiResponse } from 'next';
import { Server as SocketIOServer } from 'socket.io';

export type NextApiResponseServerIO = {
  end(): unknown;
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer;
    };
  };
};

export interface NextApiResponseWithSocket extends NextApiResponse {
  socket: {
    server: HTTPServer & {
      io?: SocketIOServer;
    };
  };
}

// Type pour `getServerSession`
export type GetServerSessionRequest = IncomingMessage & {
  cookies: Partial<{ [key: string]: string }>;
};
export type GetServerSessionResponse = ServerResponse<IncomingMessage>;
