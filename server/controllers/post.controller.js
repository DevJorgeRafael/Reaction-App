import Post from '../models/Post.js'
import User from '../models/User.js'
import { uploadImage, deleteImage } from '../libs/cloudinary.js'
import fs from 'fs-extra'

export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('user', 'username');
        res.send(posts)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const createPost = async (req, res) => {
    try {
        const { title, description, userId } = req.body
        let image;

        if (req.files.image) {
            const result = await uploadImage(req.files.image.tempFilePath)
            await fs.remove(req.files.image.tempFilePath)
            image = {
                url: result.secure_url,
                public_id: result.public_id
            }
        }

        const newPost = new Post({ title, description, image, user: userId })
        await newPost.save()

        // Agregar el post al usuario que lo creó
        const user = await User.findById(userId);
        user.posts.push(newPost);
        await user.save();

        return res.json(newPost)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.message })
    }
}


export const updatePost = async (req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true })
        return res.send(updatedPost)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const deletePost = async (req, res) => {
    try {
        const postRemoved = await Post.findByIdAndDelete(req.params.id)
        if (!postRemoved) return res.sendStatus(404)

        if (postRemoved.image.public_id) {
            await deleteImage(postRemoved.image.public_id)
        }

        // Eliminar la referencia al post del usuario que lo creó
        const user = await User.findById(req.userId);
        user.posts.pull(postRemoved);
        await user.save();

        return res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('user', 'username');
        if (!post) return res.sendStatus(404)

        return res.json(post)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.sendStatus(404)

        // Agregar el ID del usuario a los likes del post
        post.likes.push(req.userId);
        await post.save();

        return res.json(post)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const unlikePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.sendStatus(404)

        // Eliminar el ID del usuario de los likes del post
        post.likes.pull(req.userId);
        await post.save();

        return res.json(post)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
