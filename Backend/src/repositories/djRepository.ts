import DJ from "../models/DJ";

export const getAllDJs = async () => {
  return await DJ.findAll();
};

export const getDJById = async (id: string) => {
  return await DJ.findByPk(id);
};

export const updateDJ = async (id: string, data: any) => {
  const dj = await DJ.findByPk(id);
  if (!dj) return null;
  return await dj.update(data);
};

export const deleteDJ = async (id: string) => {
  const dj = await DJ.findByPk(id);
  if (!dj) return null;
  await dj.destroy();
  return true;
};
