import * as photographerRepository from "../repositories/photographerRepository";

export const getAllPhotographers = async () => {
  return await photographerRepository.getAllPhotographers();
};

export const getPhotographerById = async (id: string) => {
  const photographer = await photographerRepository.getPhotographerById(id);
  if (!photographer) throw new Error("Photographer not found");
  return photographer;
};

export const updatePhotographer = async (id: string, data: any) => {
  const updated = await photographerRepository.updatePhotographer(id, data);
  if (!updated) throw new Error("Photographer not found");
  return updated;
};

export const deletePhotographer = async (id: string) => {
  const deleted = await photographerRepository.deletePhotographer(id);
  if (!deleted) throw new Error("Photographer not found");
  return { message: "Photographer deleted successfully" };
};
