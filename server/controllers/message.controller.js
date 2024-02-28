import { userSockets } from "../index.js";
import Message from "../models/Message.js";
import Notification from "../models/Notification.js";
import Chat from "../models/Chat.js";
import User from "../models/User.js";
import { getPopulatedNotification } from "./notification.controller.js";
import { getChats } from "./chat.controller.js";


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

        const userSocket = userSockets[userId1]
        if (userSocket) {
            userSocket.emit('chat_messages', messages);
        }
    } catch (error) {
        console.log(error.message)
    }
};


export const createMessage = async (senderId, receiverId, content) => {
    try {
        const message = new Message({ sender: senderId, receiver: receiverId, content });
        await message.save();

        const populatedMessage = await Message.findById(message._id)
            .populate('sender', '_id username name image')
            .populate('receiver', '_id username name image');

        let chat = await Chat.findOne({ users: { $all: [senderId, receiverId] } });

        if (!chat) {
            chat = new Chat({ users: [senderId, receiverId] });
        }

        chat.messages.push(message._id);
        await chat.save();

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
            await getChats(receiverId, receiverSocket);
            receiverSocket.emit('notification', populatedNotification);
        }
        const senderSocket = userSockets[senderId];
        if (senderSocket) {
            await getChats(senderId, senderSocket);
        }

        return populatedMessage;
    } catch (error) {
        console.log('Error on CreateMessage', error.message)
    }
};


export const readMessage = async (messageId) => {
    try {
        await Message.findByIdAndUpdate(messageId, { read: true })
        const messageUpdated = await Message.findById(messageId)
            .populate('receiver')
            .populate('sender')

        const senderSocket = userSockets[messageUpdated.sender._id];
        const receiverSocket = userSockets[messageUpdated.receiver._id];
        if (senderSocket) {
            senderSocket.emit('read_message', messageUpdated);
        }
        if (receiverSocket) {
            receiverSocket.emit('read_message', messageUpdated);
            await getChats(messageUpdated.receiver._id, senderSocket);
        }

        return messageUpdated
    } catch (error) {
        console.log('Error on readMessage', error.message)
    }
};

