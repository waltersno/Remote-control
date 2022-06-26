import { rawDataToString } from './utils.js';
import { RawData, Server, WebSocket } from 'ws';
import { terminalLogger } from './terminalLogger.js';

export const messageHandler = (wss: Server<WebSocket>) => (m: string) => {
  try {
    wss.clients.forEach((client) => client.send(rawDataToString(m)));
  } catch (error) {
    terminalLogger.logError();
  }
};
