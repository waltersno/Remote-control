import { drawCircle } from './shapes/circle.js';
import internal from 'stream';
import { drawSquare } from './shapes/square.js';
import { drawRectangle } from './shapes/drawRectangle.js';

export const paintHandler = (data: string, wsStream: internal.Duplex) => {
  switch (true) {
    case data.startsWith('draw_circle'):
      const radius = data.split(' ')[1];
      drawCircle(+radius);
      wsStream.write(data);
      break;
    case data.startsWith('draw_square'):
      const width = data.split(' ')[1];
      drawSquare(+width);
      wsStream.write(data);
      break;
    case data.startsWith('draw_rectangle'):
      const widthValue = data.split(' ')[1];
      const length = data.split(' ')[2];
      drawRectangle(+widthValue, +length);
      wsStream.write(data);
      break;
    default:
      break;
  }
};
