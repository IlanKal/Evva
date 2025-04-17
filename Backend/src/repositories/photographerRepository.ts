import Photographer from "../models/Photographer";

export const getAllPhotographers = async () => {
  return await Photographer.findAll();
};

export const getPhotographerById = async (id: string) => {
  return await Photographer.findByPk(id);
};

export const updatePhotographer = async (id: string, data: any) => {
  const photographer = await Photographer.findByPk(id);
  if (!photographer) return null;
  return await photographer.update(data);
};

export const deletePhotographer = async (id: string) => {
  const photographer = await Photographer.findByPk(id);
  if (!photographer) return null;
  await photographer.destroy();
  return true;
};
