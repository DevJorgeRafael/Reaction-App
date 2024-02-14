import Post from '../models/Post.js'
import User from '../models/User.js'
import { uploadImage, deleteImage } from '../libs/cloudinary.js'
import fs from 'fs-extra'

export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 }).populate('user', 'username image -email');
        res.send(posts)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}



export const createPost = async (req, res) => {
    try {
        const { title, description, userId } = req.body;
        let image;

        const userFound = await User.findById(userId);
        if (!userFound) return res.status(400).json({ message: 'User not found' });

        if (req.files && req.files.image) {
            const result = await uploadImage(req.files.image.tempFilePath);
            await fs.remove(req.files.image.tempFilePath);
            image = {
                url: result.secure_url,
                public_id: result.public_id
            };
        }

        const user = {
            _id: userFound._id,
            name: userFound.name,
            username: userFound.username,
            image: userFound.image
        };

        const postObject = {
            title,
            user
        };

        if (description) {
            postObject.description = description;
        }

        if (image) {
            postObject.image = image;
        }

        const newPost = new Post(postObject);
        await newPost.save();

        userFound.posts.push(newPost);
        await userFound.save();

        return res.json(newPost);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};



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
        const user = await User.findById(req.body.userId);
        user.posts.pull(postRemoved);
        await user.save();

        return res.status(200).json({ postRemoved });
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

        // Comprobar si el usuario ya ha dado "like" al post
        if (post.likes.includes(req.body.userId)) {
            return res.status(400).json({ message: 'User has already liked this post' })
        }

        // Agregar el ID del usuario a los likes del post
        post.likes.push(req.body.userId);
        await post.save();

        return res.json(post)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}


export const unlikePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        const userId = req.body.userId; // Extraer userId del cuerpo de la solicitud
        if (!post) return res.sendStatus(404)

        const likeIndex = post.likes.indexOf(userId);
        if (likeIndex !== -1) {
            // Si el usuario ha dado "like" al post, eliminar su ID de los likes
            post.likes.splice(likeIndex, 1);
        }
        await post.save();

        return res.json(post)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

