import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header required' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const payload = jwt.verify(token, 'SECRET_KEY');
        req.userId = payload.userId;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};
