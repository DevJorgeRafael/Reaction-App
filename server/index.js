import { connectDB } from './db.js'
import { PORT } from './config/config.js'
import app from './app.js' // Aquí cambiamos la importación
import { Server } from 'socket.io'
import { sendNotifications } from './controllers/notification.controller.js'
import { sendPosts } from './controllers/post.controller.js'
import { createMessage, getChatMessages, readMessage } from './controllers/message.controller.js'
import { getChats } from './controllers/chat.controller.js'

connectDB()

const server = app.listen(PORT, () => {
    console.log('Server on port', PORT);
});

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
})

export const userSockets = {}

io.on('connection', async (socket) => {
    const userId = socket.handshake.query.userId;

    if (userId) {
        userSockets[userId] = socket;

        sendNotifications(userId, socket);
        sendPosts(socket);
        getChats(userId, socket)

        socket.on('send_message', async ({ senderId, receiverId, content }, callback) => {
            const newMessage = await createMessage(senderId, receiverId, content);
            console.log(newMessage)
            callback(newMessage);
        })

        socket.on('read_message', async ({ messageId}) => {
            await readMessage(messageId);
        })

        socket.on('get_chat_messages', async ({ userId1, userId2 }) => {
            getChatMessages(userId1, userId2);
        });

        socket.on('disconnect', () => {
            delete userSockets[userId];
        });

        socket.on('logout', (userId) => {
            delete userSockets[userId];
        })
    }
})

export { io }
