import robot from 'robotjs';
import { terminalLogger } from '../terminalLogger.js';
export const drawRectangle = (width: number, length: number) => {
  const { x, y } = robot.getMousePos();
  robot.mouseToggle('down');
  robot.moveMouseSmooth(x + width, y);
  robot.moveMouseSmooth(x + width, y + length);
  robot.moveMouseSmooth(x, y + length);
  robot.moveMouseSmooth(x, y);
  robot.mouseToggle('up');
  terminalLogger.logSuccess();
};
