import { createWebSocketStream, WebSocketServer } from 'ws';
import { terminalLogger } from './terminalLogger.js';
import { wsMessageHandler } from './wsMessageHandler.js';

const webSocketServer = new WebSocketServer({ port: 8080 });

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
