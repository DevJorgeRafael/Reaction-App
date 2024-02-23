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

export const getMessages = async (userId1, userId2) => {
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
