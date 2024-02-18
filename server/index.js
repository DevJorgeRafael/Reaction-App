import { connectDB } from './db.js'
import {PORT} from './config/config.js'
import { app, server} from './app.js'
import { Server } from 'socket.io'

connectDB() 

export const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
})

io.on('connection', (socket) => {
    console.log('A client has connected')

    // Asume que el ID de usuario se envía como un parámetro de consulta cuando el cliente se conecta
    const userId = socket.handshake.query.userId;
    if (userId) {
        socket.join(userId);  // Agrega este socket a la "room" para este ID de usuario
    }
})

server.listen(PORT)
console.log('Server on port', PORT)