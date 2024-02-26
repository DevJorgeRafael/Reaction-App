import { userSockets } from "../index.js";
import Message from "../models/Message.js";
import Notification from "../models/Notification.js";
import User from "../models/User.js";
import { getPopulatedNotification } from "./notification.controller.js";


export const sendMessage = async (req, res) => {
    try {
        const { senderId, receiverId, content } = req.body;
        const message = new Message({ sender: senderId, receiver: receiverId, content });
        await message.save();

        const populatedMessage = await Message.findById(message._id)
            .populate('sender', '_id username name image')
            .populate('receiver', '_id username name image');

        const receiverSocket = userSockets[receiverId];
        if (receiverSocket) {
            receiverSocket.emit('message', populatedMessage);
        }

        return res.json(populatedMessage);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getChatMessages = async (userId1, userId2) => {
    try {
        const messages = await Message.find({
            $or: [
                { sender: userId1, receiver: userId2 },
                { sender: userId2, receiver: userId1 }
            ]
        })
            .populate('sender', '_id username name image')
            .populate('receiver', '_id username name image')

        return messages
    } catch (error) {
        console.log(error.message)
    }
};

export const getChats = async (userId, socket) => {
    try {
        const messages = await Message.find({
            $or: [
                { sender: userId },
                { receiver: userId }
            ]
        })
            .populate('sender', '_id username name image')
            .populate('receiver', '_id username name image')
            .sort({ date: -1 }); 

        const chats = {};
        messages.forEach(message => {
            let chatId;
            if (message.sender._id.toString() === userId) {
                chatId = message.receiver._id.toString();
            } else {
                chatId = message.sender._id.toString();
            }

            if (!chats[chatId]) {
                chats[chatId] = {
                    user: message.sender._id.toString() === userId ? message.receiver : message.sender,
                    lastMessage: message
                };
            }
        });

        const chatsArray = Object.values(chats);
        socket.emit('chats', chatsArray);
    } catch (error) {
        console.log('error on getChats', error.message);
    }
};



export const createMessage = async (senderId, receiverId, content) => {
    const message = new Message({ sender: senderId, receiver: receiverId, content });
    await message.save();

    const populatedMessage = await Message.findById(message._id)
        .populate('sender', '_id username name image')
        .populate('receiver', '_id username name image');

    const notification = new Notification({
        user: populatedMessage.receiver._id,
        fromUser: populatedMessage.sender._id,
        type: 'message',
        target: { messageId: populatedMessage._id },
    })

    await notification.save();

    const populatedNotification = await getPopulatedNotification(notification);

    const receiverSocket = userSockets[receiverId];
    if (receiverSocket) {
        receiverSocket.emit('message', populatedMessage);
        receiverSocket.emit('notification', populatedNotification);
    }
};
