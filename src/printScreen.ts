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

  const jimpOption = {
    data: screen.image,
    width: screen.width,
    height: screen.height,
  };

  const jimp = new Jimp(jimpOption);

  const base64Screen = await jimp.getBase64Async(Jimp.MIME_PNG);
  const base64 = base64Screen.split(',')[1];
  wsStream.write(`prnt_scrn ${base64}`);
};
