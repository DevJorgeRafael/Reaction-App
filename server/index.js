import { connectDB } from './db.js'
import { PORT } from './config/config.js'
import { app, server } from './app.js'
import { Server } from 'socket.io'
import { sendNotifications } from './controllers/notification.controller.js'
import { sendPosts } from './controllers/post.controller.js'
import { createMessage, getMessages } from './controllers/message.controller.js'

connectDB()

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
})

const userSockets = {}

io.on('connection', async (socket) => {
    const userId = socket.handshake.query.userId;

    if (userId) {
        userSockets[userId] = socket;

        sendNotifications(userId, socket);
        sendPosts(socket);

        socket.on('send_message', async ({ senderId, receiverId, content }) => {
            createMessage(senderId, receiverId, content);
        })

        socket.on('get_messages', async ({ userId1, userId2 }) => {
            const messages = await getMessages(userId1, userId2);
            socket.emit('messages', messages);
        });

        socket.on('disconnect', () => {
            delete userSockets[userId];
        });

        socket.on('logout', (userId) => {
            delete userSockets[userId];
        })
    }
})

server.listen(PORT)
console.log('Server on port', PORT)

export { io, userSockets }
