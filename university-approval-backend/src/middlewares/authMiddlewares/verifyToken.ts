import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface JwtPayload {
  userId: string;
  role: string;
}

export interface AuthRequest extends Request {
  user?: JwtPayload;
}

export const verifyToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
console.log("header is here", authHeader);
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

    req.user = decoded;

    next();
  } catch (err) {
    console.error("Token verification failed:", err);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};
