import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../config/config.js'

export const authMiddleware = (req, res, next) => {
    if (!req.cookies) return res.status(400).json({ message: 'Invalid cookies' })

    const { token } = req.cookies
    if (!token) return res.status(401).json({ message: 'Unauthorized' })

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' })
        } else {
            next()
        }
    })
};

