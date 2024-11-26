const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");

require('dotenv').config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "https://frontend-chat-blue.vercel.app/"
    }
});

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
  
    })
    .catch((err) => {
        console.log("Erro ao conectar ao MongoDB Atlas", err);
    });

const messageSchema = new mongoose.Schema({
    user: String,
    message: String,
    timestamp: { type: Date, default: Date.now }
});

const Message = mongoose.model("Message", messageSchema);

app.get("/", (req, res) => {
    res.send({ status: "on" });
});

io.on("connection", async (socket) => {

    try {
        const messages = await Message.find();
        socket.emit('allMessages', messages);
    } catch (err) {
        console.log('Erro ao buscar mensagens:', err);
    }

    socket.on('sendMessage', async (message) => {

        const newMessage = new Message({
            user: message.user,
            message: message.message
        });

        try {
            await newMessage.save();
            io.emit('receiveMessage', message);
        } catch (err) {
            console.log('Erro ao salvar mensagem no banco de dados:', err);
        }
    });

    socket.on('disconnect', () => {
        console.log('Usuário desconectado');
    });
});

httpServer.listen(process.env.PORT || 3001, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT || 3001}`);
});
