import Location from "../models/Location";

export const getAllLocations = async () => {
  return await Location.findAll();
};

export const getLocationById = async (id: string) => {
  return await Location.findByPk(id);
};

export const getLocationBySupplierId = async (supplierId: string) => {
  return await Location.findOne({ where: { supplier_id: supplierId } });
};

export const updateLocationBySupplierId = async (supplierId: string, data: any) => {
  const location = await Location.findOne({ where: { supplier_id: supplierId } });
  if (!location) return null;
  return await location.update(data);
};

export const updateLocation = async (id: string, data: any) => {
  const location = await Location.findByPk(id);
  if (!location) return null;
  return await location.update(data);
};

export const deleteLocation = async (id: string) => {
  const location = await Location.findByPk(id);
  if (!location) return null;
  await location.destroy();
  return true;
};
