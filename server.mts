import { createServer } from 'node:http';

import next from 'next';
import { Server } from 'socket.io';

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 3000;
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.on('connection', (socket) => {
    console.log('Un utilisateur est connecté.');

    socket.on('message', (msg) => {
      console.log('Message reçu:', msg);
      socket.emit('message', `Echo: ${msg}`);
    });

    socket.on('disconnect', () => {
      console.log("Un utilisateur s'est déconnecté.");
    });
  });

  httpServer
    .once('error', (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
