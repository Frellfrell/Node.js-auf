import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

// middleware/authenticateJWT.js
export default function authenticateJWT(req, res, next) {
    const header = req.headers.authorization;

    if (!header) {
        return res.status(401).json({ error: "Authorization header missing" });
    }

    const [type, token] = header.split(" ");

    if (type !== "Bearer" || !token) {
        return res.status(401).json({ error: "Invalid Authorization format" });
    }

    try {
        const payload = jwt.verify(token, JWT_SECRET);

        if (!payload || !payload.id) {
            return res.status(401).json({ error: "Invalid token payload" });
        }

        req.user = payload;
        next();
    } catch (err) {
        return res.status(401).json({ error: "Token expired or invalid" });
    }
}
