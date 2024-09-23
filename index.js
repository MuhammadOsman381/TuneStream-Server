const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const axios = require('axios');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'],
}));

const io = socketIo(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        credentials: true
    }
});

app.get('/', (req, res) => {
    res.send('Socket.IO Server');
});

io.on('connection', (socket) => {
    socket.on('load-comments', (comments) => {
        io.emit('load-comments', comments);
    });
    socket.on('add-comment', (comment) => {
        io.emit('add-comment', comment);
    });
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

const PORT = 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
