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

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { full_name, email, password, phone, rememberMe } = req.body;

    const result = await authService.registerUser({
      full_name,
      email,
      password,
      phone,
      rememberMe,
    });

    res.status(201).json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message || 'Registration failed' });
  }
};

export const registerSupplier = async (req: Request, res: Response) => {
  try {
    const result = await authService.registerSupplier(req.body);
    res.status(201).json(result);
  } catch (error:any) {
  console.error("REGISTER SUPPLIER ERROR:", error);
  res.status(400).json({ message: error.message || 'Unknown error' });
}
};

export const registerSupplierDetails = async (req: Request, res: Response) => {
  try {
    const result = await authService.registerSupplierDetails(req.body);
    res.status(201).json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message || 'Failed to save supplier details' });
  }
};



