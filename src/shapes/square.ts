import robot from 'robotjs';
import { terminalLogger } from '../terminalLogger.js';

export const drawSquare = (width: number) => {
  const { x, y } = robot.getMousePos();
  robot.mouseToggle('down');
  robot.moveMouseSmooth(x + width, y);
  robot.moveMouseSmooth(x + width, y + width);
  robot.moveMouseSmooth(x, y + width);
  robot.moveMouseSmooth(x, y);
  robot.mouseToggle('up');
  terminalLogger.logSuccess();
};
