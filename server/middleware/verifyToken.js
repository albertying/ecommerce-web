import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers.authorization;

  if (!bearerHeader) return res.status(401).json({ error: "Token not found" });

  const token = bearerHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.json({ error: error.message });
  }
};

export default verifyToken;
