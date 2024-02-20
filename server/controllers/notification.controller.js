import { userSockets } from "../index.js";
import Notification from "../models/Notification.js";
import Post from "../models/Post.js";

export const sendNotifications = async (userId, socket) => {
    try {
        let notifications = await Notification.find({ user: userId })
            .populate('user', '_id username name image')
            .populate('fromUser', '_id username name image')
            .sort({ date: -1 });

        notifications = await populateNotifications(notifications);

        socket.emit('notifications', notifications);
    } catch (error) {
        console.error(error);
    }
};

export const getPopulatedNotification = async (notification) => {
    const populatedNotification = await Notification.findById(notification._id)
        .populate('user', '_id username name image')
        .populate('fromUser', '_id username name image');

    if (populatedNotification.target && populatedNotification.target.postId) {
        const post = await Post.findById(populatedNotification.target.postId);
        populatedNotification.target.post = post;
    }
    return populatedNotification;
}

export const populateNotifications = async (notifications) => {
    for (let notification of notifications) {
        if (notification.target && notification.target.postId) {
            const post = await Post.findById(notification.target.postId);
            notification.target.post = post;
        }
    }
    return notifications;
}

export const readNotification = async (req, res) => {
    try {
        const notification = await Notification.findByIdAndUpdate(req.params.id, 
            { read: true }, { new: true });

        const populatedNotification = await getPopulatedNotification(notification);
        
        return res.json(populatedNotification);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const readAllNotifications = async (req, res) => {
    try {
        await Notification.updateMany(
            { user: req.params.userId, read: false },
            { read: true }
        );

        let notifications = await Notification.find({ user: req.params.userId })
            .populate('user', '_id username name image')
            .populate('fromUser', '_id username name image')
            .sort({ date: -1 });

        const populatedNotifications = await populateNotifications(notifications);

        return res.json(populatedNotifications);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


export const removeNotification = async (req, res) => {
    try {
        const notification = await Notification.findByIdAndDelete(req.params.id);
        return res.json(notification);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const removeAllNotifications = async (req, res) => {
    try {
        const notifications = await Notification.deleteMany({ user: req.params.userId });

        return res.json(notifications);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

