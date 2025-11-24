import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

// middleware/authenticateJWT.js
export default function authenticateJWT(req, res, next) {
     try {
    const header = req.headers.authorization;

    if (!header) {
        return res.status(401).json({ error: "Authorization header missing" });
    }

     const token = authHeader.split(" ")[1];
        if (!token) return res.status(401).json({ error: "Token not correct" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET || "supersecretkey");
        req.user = decoded;
        next();
    } catch (error) {
        console.error("Error JWT:", error.message);
        return res.status(401).json({ error: "Token not correct" });
    }
}
