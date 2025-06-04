import * as userRepository from "../repositories/userRepository";
import bcrypt from 'bcryptjs';
import * as yup from "yup";

const userSchema = yup.object({
  full_name: yup.string().required("Full name is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  phone: yup.string().nullable(),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  role: yup.string().notRequired(),
});


const userUpdateSchema = yup.object({
  full_name: yup.string().notRequired(),
  email: yup.string().email("Invalid email format").notRequired(),
  phone: yup.string().nullable().notRequired(),
  password: yup.string().min(6, "Password must be at least 6 characters").notRequired(),
  role: yup.string().notRequired(),
});

export const getAllUsers = async () => {
  return await userRepository.getAllUsers();
};

export const getUserById = async (id: string) => {
  return await userRepository.getUserById(id);
};

export const createUser = async (data: any) => {
      await userSchema.validate(data, { abortEarly: false });
    return userRepository.createUser(data);
  
};

export const updateUser = async (id: string, data: any) => {
  await userUpdateSchema.validate(data, { abortEarly: false });

  const updatedData = { ...data };

  if (data.password) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    updatedData.password = hashedPassword;
  }

  return userRepository.updateUser(id, updatedData);
};

export const deleteUser = async (id: string) => {
  return await userRepository.deleteUser(id);
};
