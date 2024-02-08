import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../config/config.js';

export const register = async (req, res) => {
    try {
        const { username, name, email, password } = req.body;
        const user = new User({ username, name, email, password });
        await user.save();

        const token = jwt.sign({ userId: user._id }, SECRET_KEY);

        res.status(201).json({ token, user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !await user.comparePassword(password)) {
            return res.status(401).json({ message: 'Invalid email/password' });
        }
        const token = jwt.sign({ userId: user._id }, SECRET_KEY);
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const verifyToken = async (req, res) => {
    const { token } = req.cookies

    if (!token) return res.status(401).json({ message: 'No autorizado' })

    jwt.verify(token, SECRET_KEY, async (err, user) => {
        if (err) return res.status(401).json({ message: 'No autorizado' })

        const userFound = await User.findOne({ email: user.email})
        if (!userFound) return res.status(401).json({ message: "No Autorizado", user: null })

        console.log(userFound)
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
