import robot from 'robotjs';
import Jimp from 'jimp';
import internal from 'stream';

export const printScreen = async (wsStream: internal.Duplex) => {
  const { x: mouseX, y: mouseY } = robot.getMousePos();
  const screenSize = 100;
  const screen = robot.screen.capture(
    mouseX - screenSize,
    mouseY - screenSize,
    screenSize * 2,
    screenSize * 2,
  );

  const width = screen.byteWidth / screen.bytesPerPixel;
  const height = screen.height;

  const jimp = new Jimp(width, height);

  let red: number, green: number, blue: number;
  screen.image.forEach((byte: number, i: number) => {
    switch (i % 4) {
      case 0:
        return (blue = byte);
      case 1:
        return (green = byte);
      case 2:
        return (red = byte);
      case 3:
        jimp.bitmap.data[i - 3] = red;
        jimp.bitmap.data[i - 2] = green;
        jimp.bitmap.data[i - 1] = blue;
        jimp.bitmap.data[i] = 255;
    }
  });

  const base64Screen = await jimp.getBase64Async(Jimp.MIME_PNG);
  const base64 = base64Screen.split(',')[1];
  wsStream.write(`prnt_scrn ${base64}`);
};
