import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Define the type for the JWT payload
interface JwtPayload {
  id: string;
  role: string;
}

// Middleware to verify JWT token
const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  // Get token from headers
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied, no token provided" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your-secret-key"
    ) as JwtPayload;

    // Attach user information to the request object
    req.userId = decoded.id;
    req.userRole = decoded.role;

    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default verifyToken;
