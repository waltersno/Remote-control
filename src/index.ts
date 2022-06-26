import { createWebSocketStream, WebSocketServer } from 'ws';
import { terminalLogger } from './terminalLogger.js';
import { wsMessageHandler } from './wsMessageHandler.js';

const PORT = 8080;

const webSocketServer = new WebSocketServer({ port: PORT }, () => {
  terminalLogger.log(`Server started on the ${PORT} port!`);
});

webSocketServer.on('connection', (ws) => {
  const wsStream = createWebSocketStream(ws, {
    encoding: 'utf-8',
    decodeStrings: false,
  });

  wsStream.on('data', wsMessageHandler(wsStream));

  wsStream.on('error', () => {
    terminalLogger.logError();
  });
});
