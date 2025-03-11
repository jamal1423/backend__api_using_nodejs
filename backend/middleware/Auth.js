import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"];

    if (!token) return res.status(401).json({ 
        "statuscode":401,
        "message": "Access denied. No token provided." 
    });

    try {
        const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ 
            "statuscode":400,
            "message": "Invalid token" 
        });
    }
};
