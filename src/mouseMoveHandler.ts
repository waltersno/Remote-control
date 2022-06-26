import robot from 'robotjs';
import internal from 'stream';
import { terminalLogger } from './terminalLogger.js';

export const mouseMoveHandler = (
  command: string,
  commandParam: string,
  wsStream: internal.Duplex,
) => {
  const { x: mouseX, y: mouseY } = robot.getMousePos();
  switch (command) {
    case 'mouse_up':
      robot.moveMouse(mouseX, mouseY - +commandParam);
      wsStream.write(command);
      break;
    case 'mouse_down':
      robot.moveMouse(mouseX, mouseY + +commandParam);
      wsStream.write(command);
      break;
    case 'mouse_right':
      robot.moveMouse(mouseX + +commandParam, mouseY);
      wsStream.write(command);
      break;
    case 'mouse_left':
      robot.moveMouse(mouseX - +commandParam, mouseY);
      wsStream.write(command);
      break;
    case 'mouse_position':
      wsStream.write(`mouse_position ${mouseX},${mouseY}`);
      break;
    default:
      break;
  }
  terminalLogger.logSuccess();
};
