import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,   
        trim: true
    },
    image: {
        url: String,
        public_id: String
    },
    user: {
        _id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        name: String,
        username: String,
        image: {
            url: String,
            public_id: String
        }
    }, 
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Referencias a los usuarios que han dado "like" al post
    date: { type: Date, default: Date.now }
})

export default mongoose.model('Post', postSchema)
