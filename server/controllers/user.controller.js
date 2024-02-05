import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../config/config.js';

export const register = async (req, res) => {
    try {
        const { username, name, email, password } = req.body;
        const user = new User({ username, name, email, password });
        await user.save();

        const token = jwt.sign({ userId: user._id }, SECRET_KEY);

        res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user || !await user.comparePassword(password)) {
            return res.status(401).json({ message: 'Invalid username/password' });
        }
        const token = jwt.sign({ userId: user._id }, SECRET_KEY);
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
