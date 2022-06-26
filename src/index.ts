import { terminalLogger } from './terminalLogger.js';
import { createWebSocketStream, WebSocketServer } from 'ws';

const webSocketServer = new WebSocketServer({ port: 8080 });

webSocketServer.on('connection', (ws) => {
  const wsStream = createWebSocketStream(ws, {
    encoding: 'utf-8',
    decodeStrings: false,
  });

  wsStream.on('data', (chunk) => {
    console.log(chunk);
    ws.send(chunk);
  });

  wsStream.on('error', () => {
    terminalLogger.logError();
  });
});
