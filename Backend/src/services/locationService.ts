import * as locationRepository from "../repositories/locationRepository";

export const getAllLocations = async () => {
  return await locationRepository.getAllLocations();
};

export const getLocationById = async (id: string) => {
  const location = await locationRepository.getLocationById(id);
  if (!location) throw new Error("Location not found");
  return location;
};

export const updateLocation = async (id: string, data: any) => {
  const updated = await locationRepository.updateLocation(id, data);
  if (!updated) throw new Error("Location not found");
  return updated;
};

export const deleteLocation = async (id: string) => {
  const deleted = await locationRepository.deleteLocation(id);
  if (!deleted) throw new Error("Location not found");
  return { message: "Location deleted successfully" };
};
