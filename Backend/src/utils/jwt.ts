import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); // Load secrets from .env file

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'access_secret';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'refresh_secret';

type TokenPayload = {
  id: number;
  type: 'user' | 'supplier';
};

// Creates access token (short-lived, 30m or 7d)
export const generateAccessToken = (
  payload: TokenPayload,
  rememberMe: boolean
): string => {
  const expiresIn = rememberMe ? '7d' : '30m';
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn });
};

// Creates refresh token (always 7d)
export const generateRefreshToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
};

// Validates a refresh token and returns the payload (or null if invalid)
export const verifyRefreshToken = (
  token: string
): TokenPayload | null => {
  try {
    return jwt.verify(token, REFRESH_TOKEN_SECRET) as TokenPayload;
  } catch (err) {
    return null;
  }
};

// Validates an access token (optional, used in middleware)
export const verifyAccessToken = (
  token: string
): TokenPayload | null => {
  try {
    return jwt.verify(token, ACCESS_TOKEN_SECRET) as TokenPayload;
  } catch (err) {
    return null;
  }
};
