import express from 'express';
import { matchRouter } from './routes/matches.js';
import { attachWebSockets } from './ws/server.js';
import http from 'http';

const PORT = Number(process.env.PORT);
const HOST = process.env.HOST;

const app = express();

const server = http.createServer(app);

app.use(express.json());

app.get('/' , (req , res) => {
    res.send("Hello from express server");
})

app.use('/matches' , matchRouter);


const {broadcastMatchCreated} = attachWebSockets(server);
app.locals.broadcastMatchCreated = broadcastMatchCreated

server.listen(PORT , HOST, () => {

    const baseUrl  = HOST === '0.0.0.0' ? `http://localhost${PORT}` : `http://${HOST}:${PORT}`;
    
    console.log(`server is running on ${baseUrl}`);
    console.log(`websocket server is running on ${baseUrl.replace('http','ws')}/ws`);
})