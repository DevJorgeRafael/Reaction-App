import Notification from "../models/Notification.js";
import Post from "../models/Post.js";

export const sendNotifications = async (userId, socket) => {
    try {
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
        socket.emit('notifications', notifications);
    } catch (error) {
        console.error(error);
    }
};

export const readNotification = async (req, res) => {
    try {
        const notification = await Notification.findByIdAndUpdate(req.params.id, 
            { read: true }, { new: true });
        
        return res.json(notification);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const readAllNotifications = async (req, res) => {
    try {
        const notifications = await Notification.updateMany(
            { user: req.params.userId, read: false },
            { read: true }
        );
        
        return res.json(notifications);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

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