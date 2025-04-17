import bcrypt from 'bcryptjs';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utils/jwt';
import * as authRepository from '../repositories/auth.repository';

export const login = async (
  email: string,
  password: string,
  type: 'user' | 'supplier',
  rememberMe: boolean
) => {
  const user = await authRepository.findUserByEmailAndType(email, type);

  if (!user) {
    throw new Error('User not found');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid password');
  }

  const payload = { id: user.id, type };

  const accessToken = generateAccessToken(payload, rememberMe);
  const refreshToken = generateRefreshToken(payload);

  return {
    id: user.id,
    type,
    accessToken,
    refreshToken,
  };
};

export const refreshAccessToken = async (refreshToken: string) => {
  const payload = verifyRefreshToken(refreshToken);
  if (!payload) {
    throw new Error('Invalid refresh token');
  }

  return generateAccessToken({ id: payload.id, type: payload.type }, false);
};
