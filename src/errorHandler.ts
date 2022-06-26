import { WebSocket } from 'ws';

export const errorHandler = (ws: WebSocket) => (error: Error) => {
  ws.send(error);
};
