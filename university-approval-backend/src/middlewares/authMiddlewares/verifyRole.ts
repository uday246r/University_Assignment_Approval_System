import { Response, NextFunction } from "express";
import { AuthRequest } from "./verifyToken";

export const verifyRole = (roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: "No authenticated user found" });
    }

    if (!roles.includes(req.user.role.toUpperCase())) {
      return res.status(403).json({ message: "Access Denied - Unauthorized Role" });
    }

    next();
  };
};
