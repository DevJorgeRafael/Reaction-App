import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { SECRET_KEY } from '../config/config.js';

export const register = async (req, res) => {
    try {
        const { username, name, email, password } = req.body;

        const user = new User({ username, name, email, password });
        await user.save();

        const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h'});
        res.cookie('token', token, { maxAge: 3600000 })

        res.status(201).json({ token, user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(401).json({ message: 'Incorrect password' });
        }

        const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h'});
        res.cookie('token', token, { maxAge: 3600000 })

        res.json({ 
            token,
            user: {
                _id: user._id,
                name: user.name,
                username: user.username,
                email: user.email,
                posts: user.posts
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const verifyToken = async (req, res) => {
    if(!req.cookies) return res.status(400).json({message: 'Invalid cookies'})
    const { token } = req.cookies

    if (!token) return res.status(401).json({ message: 'Unauthorized' })

    jwt.verify(token, SECRET_KEY, async (err, user) => {
        if (err) return res.status(401).json({ message: 'Unauthorized token' })

        const userFound = await User.findById(user.userId)
        console.log(userFound)
        if (!userFound) return res.status(401).json({ message: "Unathorized", user: null })

        return res.json({    
            user: {
                _id: userFound._id,
                name: userFound.name,
                username: userFound.username,
                email: userFound.email,
                posts: userFound.posts
            }      
        })
    })
}
