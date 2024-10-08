import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
  throw new Error("JWT_SECRET não está definido");
}

export interface AuthenticatedRequest extends Request {
  user?: { userId: string; restaurantId: string };
}

export const authenticateToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.sendStatus(401); // Não autorizado
  }

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      return res.sendStatus(403); // Proibido
    }
    if (typeof decoded !== "string" && decoded?.userId) {
      req.user = {
        userId: (decoded as JwtPayload).userId as string,
        restaurantId: (decoded as JwtPayload).restaurantId as string,
      };
    }
    next();
  });
};
