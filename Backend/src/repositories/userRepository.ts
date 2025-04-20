import User from "../models/User";

export const getAllUsers = async () => {
  return await User.findAll();
};

export const getUserById = async (id: string) => {
  return await User.findByPk(id);
};

export const createUser = async (data: any) => {
  return await User.create(data);
};

export const updateUser = async (id: string, data: any) => {
  const user = await User.findByPk(id);
  if (!user) return null;
  return await user.update(data);
};

export const deleteUser = async (id: string) => {
  const user = await User.findByPk(id);
  if (!user) return null;
  await user.destroy();
  return true;
};
