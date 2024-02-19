import { connectDB } from './db.js'
import {PORT} from './config/config.js'
import { app, server} from './app.js'
import { Server } from 'socket.io'
import Notification from './models/Notification.js'
import Post from './models/Post.js'

connectDB() 

export const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
})

export const userSockets = {}

io.on('connection', async (socket) => {
    console.log('A client has connected')
    const userId = socket.handshake.query.userId;
    if (userId) {
        // Añade el socket del usuario al objeto
        userSockets[userId] = socket;

        let notifications = await Notification.find({ user: userId })
            .populate('user', '_id username name image')
            .populate('fromUser', '_id username name image')
            .sort({ date: -1 });

        for (let notification of notifications) {
            if (notification.target && notification.target.postId) {
                const post = await Post.findById(notification.target.postId);
                notification.target.post = post;
            }
        }

        socket.emit('notifications', notifications)
    }
})



server.listen(PORT)
console.log('Server on port', PORT)