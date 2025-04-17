import { Request, Response } from 'express';
import * as authService from '../services/auth.service';

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password, type, rememberMe } = req.body;

    const result = await authService.login(email, password, type, rememberMe);

    res.status(200).json(result);
  } catch (error: any) {
    res.status(401).json({ message: error.message || 'Login failed' });
  }
};

export const logout = async (_req: Request, res: Response) => {
  res.status(200).json({ message: 'Logged out successfully' });
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    const newAccessToken = await authService.refreshAccessToken(refreshToken);

    res.status(200).json({ accessToken: newAccessToken });
  } catch (error: any) {
    res.status(403).json({ message: error.message || 'Invalid refresh token' });
  }
};
