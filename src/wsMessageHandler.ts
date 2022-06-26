import { terminalLogger } from './terminalLogger.js';
import { mouseMoveHandler } from './mouseMoveHandler.js';
import internal from 'stream';
import { paintHandler } from './paintHandler.js';
import { printScreen } from './printScreen.js';

export const wsMessageHandler =
  (wsStream: internal.Duplex) => (data: string) => {
    try {
      terminalLogger.log(`Received: ${data}`);

      switch (true) {
        case data.startsWith('mouse_'):
          const commandArr: string[] = data.split(' ');
          const command = commandArr[0];
          const commandParam = commandArr[1];
          mouseMoveHandler(command, commandParam, wsStream);
          break;
        case data.startsWith('draw_'):
          paintHandler(data, wsStream);
          break;
        case data.startsWith('prnt_scrn'):
          printScreen(wsStream);
          break;
        default:
          break;
      }
    } catch {
      terminalLogger.logError();
    }
  };
