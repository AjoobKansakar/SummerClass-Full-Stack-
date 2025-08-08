import jwt from 'jsonwebtoken';

export function authMiddleware (req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(403).send ('Token not found');

    try {
        console.log(token);
        
        const data = jwt.verify(token, process.env.JWT_SECRET);
        req.user = data;
    }   catch (e) {
        console.log(e);
        
        return res.status(401).send(e);
    }
    next();
}