import { errorHandler } from './errorHandler.js';
import { createWebSocketStream, RawData, WebSocketServer } from 'ws';
import { messageHandler } from './messageHandler.js';

const webSocketServer = new WebSocketServer({ port: 8080 });

webSocketServer.on('connection', (ws) => {
  const wsStream = createWebSocketStream(ws, {
    encoding: 'utf-8',
    decodeStrings: false,
  });

  wsStream.on('data', (chunk) => {
    ws.send(chunk);
  });

  wsStream.on('error', errorHandler(ws));

  // ws.on('message', messageHandler(webSocketServer));
  // ws.on('error', errorHandler(ws));
});

// const wsStream = createWebSocketStream(ws, {
//   encoding: 'utf-8',
//   decodeStrings: false,
// });

// wsStream.on('data', (chunk) => {
//   console.log(chunk);
// });
