import Catering from "../models/Catering";

export const getAllCaterings = async () => {
  return await Catering.findAll();
};

export const getCateringById = async (id: string) => {
  return await Catering.findByPk(id);
};

export const getCateringBySupplierId = async (supplierId: string) => {
  return await Catering.findOne({ where: { supplier_id: supplierId } });
};

export const updateCateringBySupplierId = async (supplierId: string, data: any) => {
  const catering = await Catering.findOne({ where: { supplier_id: supplierId } });
  if (!catering) return null;
  return await catering.update(data);
};

export const updateCatering = async (id: string, data: any) => {
  const catering = await Catering.findByPk(id);
  if (!catering) return null;
  return await catering.update(data);
};

export const deleteCatering = async (id: string) => {
  const catering = await Catering.findByPk(id);
  if (!catering) return null;
  await catering.destroy();
  return true;
};
