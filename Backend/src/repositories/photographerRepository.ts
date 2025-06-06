import Photographer from "../models/Photographer";

export const getAllPhotographers = async () => {
  return await Photographer.findAll();
};

export const getPhotographerById = async (id: string) => {
  return await Photographer.findByPk(id);
};

export const getPhotographerBySupplierId = async (supplierId: string) => {
  return await Photographer.findOne({ where: { supplier_id: supplierId } });
};

export const updatePhotographerBySupplierId = async (supplierId: string, data: any) => {
  const photographer = await Photographer.findOne({ where: { supplier_id: supplierId } });
  if (!photographer) return null;
  return await photographer.update(data);
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
