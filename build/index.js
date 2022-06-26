import { WebSocketServer } from 'ws';
import { controller } from './controller.js';
const webSocketServer = new WebSocketServer({ port: 8080 });
webSocketServer.on('connection', (ws) => {
    ws.on('message', (m) => {
        console.log(m.toString());
        console.log('message');
        webSocketServer.clients.forEach((client) => client.send(m));
    });
    ws.on('error', (e) => ws.send(e));
    ws.send('Hi there, I am a WebSocket server');
});
controller();
