import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.json({ success: false, message: "Not authorized. Login again." });
  }

  try {
    const token_decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = token_decoded.id; // ✅ store userId directly on req
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.json({ success: false, message: "error" });
  }
};

export default authMiddleware;
