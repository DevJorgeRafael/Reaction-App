import Notification from "../models/Notification.js";
import Post from "../models/Post.js";

export const getNotifications = async (req, res) => {
    try {
        let notifications = await Notification.find({ user: req.params.userId })
            .populate('user', '_id username name image')
            .populate('fromUser', '_id username name image')
            .sort({ date: -1 });

        for (let notification of notifications) {
            if (notification.target && notification.target.postId) {
                const post = await Post.findById(notification.target.postId);
                notification.target.post = post;
            }
        }
        return res.json(notifications);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

