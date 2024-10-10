import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';

 const adminAuth = async (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.ADMIN_JWT_SECRET);
        const user = await User.findById(decoded.userId);

        if (!user || user.role !== 'admin') {
            return res.status(403).json({ error: 'Access denied, admin only' });
        }

        // Add user info to request
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};



export default adminAuth;