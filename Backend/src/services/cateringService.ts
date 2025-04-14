import * as cateringRepository from "../repositories/cateringRepository";

export const getAllCaterings = async () => {
  return await cateringRepository.getAllCaterings();
};

export const getCateringById = async (id: string) => {
  const catering = await cateringRepository.getCateringById(id);
  if (!catering) throw new Error("Catering not found");
  return catering;
};

export const updateCatering = async (id: string, data: any) => {
  const updated = await cateringRepository.updateCatering(id, data);
  if (!updated) throw new Error("Catering not found");
  return updated;
};

export const deleteCatering = async (id: string) => {
  const deleted = await cateringRepository.deleteCatering(id);
  if (!deleted) throw new Error("Catering not found");
  return { message: "Catering deleted successfully" };
};
