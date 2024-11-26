const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000"
    }
});


app.get("/", (req, res) => {
    res.send({ status: "on" });
});


io.on("connection", (socket) => {
    console.log('Novo usuário conectado');

    socket.on('sendMessage', (message) => {
        console.log('Mensagem recebida:', message);
        io.emit('receiveMessage', message); 
    });

    socket.on('disconnect', () => {
        console.log('Usuário desconectado');
    });
});

httpServer.listen(3001, () => {
    console.log("Servidor rodando na porta 3001");
});
