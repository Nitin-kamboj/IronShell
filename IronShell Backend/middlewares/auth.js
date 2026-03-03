import jwt from "jsonwebtoken";
import "dotenv/config";
function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ success: false, message: "No Token" })
    }
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ success: false, message: "Invalid Token" })
        }
        req.user = decoded;
        req.user_id = decoded.user_id;
        next();
    })
}

export const isAdmin = (req, res, next) => {
    if (req.user.is_admin) {
        next();
    } else {
        return res.status(403).json({ message: "Access denied. Admins only." });
    }
};
export { authenticateToken };

export const isStaff = (req, res, next) => {
    if (req.user.is_staff) {
        next();
    } else {
        return res.status(403).json({ message: "Access denied. Staff access only." });
    }
}