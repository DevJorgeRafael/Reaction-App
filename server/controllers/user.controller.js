import User from '../models/User.js';
import Message from '../models/Message.js';
import Notification from '../models/Notification.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { SECRET_KEY } from '../config/config.js';
import { uploadImage, deleteImage } from '../libs/cloudinary.js'
import fs from 'fs-extra'

export const register = async (req, res) => {
    try {
        const { username, name, email, password } = req.body;

        const userFoundByUsername = await User.findOne({ username: username })
        if (userFoundByUsername) return res.status(400).json({ username: 'Username already exists' });

        const userFoundByEmail = await User.findOne({ email: email})
        if (userFoundByEmail) return res.status(400).json({ email: 'Email already exists' });

        const user = new User({ username, name, email, password });
        await user.save();

        const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h'});
        res.cookie('token', token, { maxAge: 3600000 })

        const userObject = user.toObject()

        delete userObject.password

        res.status(201).json({ token, user: userObject });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ email: 'User not found' });       

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) return res.status(401).json({ password: 'Incorrect password' });
        
        const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h'});
        res.cookie('token', token, { maxAge: 3600000 })

        const userObject = user.toObject()

        delete userObject.password

        res.json({ 
            token,
            user: userObject
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const verifyToken = async (req, res) => {
    try {
        if (!req.cookies) return res.status(400).json({ message: 'Invalid cookies' })
        const { token } = req.cookies

        if (!token) return res.status(401).json({ message: 'Unauthorized' })

        jwt.verify(token, SECRET_KEY, async (err, user) => {
            if (err) return res.status(401).json({ message: 'Unauthorized token' })

            const userFound = await User.findById(user.userId)
            if (!userFound) return res.status(401).json({ message: "Unathorized", user: null })

            const userObject = userFound.toObject()
            delete userObject.password
            return res.json({ user: userObject })
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getUserByUsername = async (req, res) => {
    try {
        const { username } = req.params
        const userFound = await User.findOne({ username })
        if (!userFound) return res.status(404).json({ message: 'User not found' })

        const userObject = userFound.toObject()
        delete userObject.password
        res.json({ user: userObject })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const checkUsername = async (req, res) => {
    try {
        const { username } = req.params
        const userFound = await User.findOne({ username })
        if (userFound) return res.status(200).json({ message: 'Username already exists' })
        res.status(204).json({ message: 'Username available' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const updateUser = async (req, res) => {
    try {
        const { name, username, email, bio, _id } = req.body
        console.log(username)

        let updateObject = {};
        if (name) updateObject.name = name;
        if (username) updateObject.username = username;
        if (email) updateObject.email = email;
        if (bio) updateObject.bio = bio;

        if (bio === '') updateObject.bio = undefined;

        let userFound = await User.findOne({ username})
        if (userFound && userFound._id.toString() !== _id) return res.status(400).json({ username: 'Username already exists' });

        const user = await User.findById(_id)
        if (!user) return res.status(404).json({ message: 'User not found' })

        Object.assign(user, updateObject);
        await user.save();

        res.json({ user })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


export const updateUserImage = async (req, res) => {
    try {
        const { userId } = req.body;
        let image;

        if (req.files && req.files.image) {
            const result = await uploadImage(req.files.image.tempFilePath);
            await fs.remove(req.files.image.tempFilePath);
            image = {
                url: result.secure_url,
                public_id: result.public_id
            };
        }

        const userFromDB = await User.findById(userId);
        if (!userFromDB) return res.status(400).json({ message: 'User not found' });

        userFromDB.image = image;
        await userFromDB.save();

        return res.json({ user: userFromDB });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteUserImage = async (req, res) => {
    try {
        const { userId } = req.body;
        const userFromDB = await User.findById(userId);
        if (!userFromDB) return res.status(400).json({ message: 'User not found' });

        if (userFromDB.image) {
            await deleteImage(userFromDB.image.public_id);
            userFromDB.image = undefined;
            await userFromDB.save();
        }

        return res.json({ user: userFromDB });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};