import bcrypt from 'bcryptjs';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from '../utils/jwt';
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

  const payload = { id: user.id, type: type as 'user' | 'supplier' };

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

export const registerUser = async ({
  full_name,
  email,
  password,
  phone,
  rememberMe,
}: {
  full_name: string;
  email: string;
  password: string;
  phone: string;
  rememberMe: boolean;
}) => {
  const existingUser = await authRepository.findUserByEmail(email);
  if (existingUser) {
    throw new Error('Email is already registered');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await authRepository.createUser({
    full_name,
    email,
    password: hashedPassword,
    phone,
  });

  const payload = { id: newUser.user_id, type: 'user' as const };

  const accessToken = generateAccessToken(payload, rememberMe);
  const refreshToken = generateRefreshToken(payload);

  return {
    user_id: newUser.user_id,
    role: 'user',
    accessToken,
    refreshToken,
  };
};

export const registerSupplier = async ({
  name,
  email,
  password,
  available_days,
  region,
  contact_info,
  supplier_type,
  rememberMe,
}: {
  name: string;
  email: string;
  password: string;
  available_days: string[];
  region: string;
  contact_info: string;
  supplier_type: 'catering' | 'dj' | 'photographer' | 'speaker' | 'location';
  rememberMe: boolean;
}) => {
  const existingSupplier = await authRepository.findSupplierByEmail(email);
  if (existingSupplier) {
    throw new Error('Email is already registered');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newSupplier = await authRepository.createSupplier({
    name,
    email,
    password: hashedPassword,
    available_days,
    region,
    contact_info,
    supplier_type,
  });

  const payload = { id: newSupplier.supplier_id, type: 'supplier' as const };

  const accessToken = generateAccessToken(payload, rememberMe);
  const refreshToken = generateRefreshToken(payload);

  return {
    supplier_id: newSupplier.supplier_id,
    role: 'supplier',
    accessToken,
    refreshToken,
  };
};

export const registerSupplierDetails = async ({
  supplier_id,
  supplier_type,
  details,
}: {
  supplier_id: number;
  supplier_type: 'catering' | 'dj' | 'photographer' | 'speaker' | 'location';
  details: any;
}) => {
  await authRepository.saveSupplierDetails(supplier_id, supplier_type, details);

  return { message: 'Supplier details saved successfully' };
};


