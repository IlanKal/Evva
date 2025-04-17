import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../utils/jwt';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    type: 'user' | 'supplier';
  };
}

export const authenticateToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1]; // Expected format: Bearer <token>

  if (!token) {
    return res.status(401).json({ message: 'Access token missing' });
  }

  const payload = verifyAccessToken(token);
  if (!payload) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }

  req.user = { id: payload.id, type: payload.type };
  next();
};
