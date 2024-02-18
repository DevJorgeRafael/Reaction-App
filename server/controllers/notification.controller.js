import Notification from "../models/Notification.js";

export const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ user: req.params.userId })
            .populate('user', '_id username name image')
            .populate('fromUser', '_id username name image')
            .sort({ date: -1 });
        return res.json(notifications);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

