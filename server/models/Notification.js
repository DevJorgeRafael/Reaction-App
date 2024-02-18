import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    fromUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    target: { type: mongoose.Schema.Types.Mixed },
    read: { type: Boolean, default: false },
    date: { type: Date, default: Date.now }
});


export default mongoose.model('Notification', notificationSchema);