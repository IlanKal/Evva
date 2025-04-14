import Supplier from "../models/Supplier";
import DJ from "../models/DJ";
import Photographer from "../models/Photographer";
import Speaker from "../models/Speaker";
import Catering from "../models/Catering";
import Location from "../models/Location";

export const createSupplier = async (data: any) => {
  return await Supplier.create(data);
};

export const createSpecificSupplier = async (type: string, data: any) => {
  switch (type) {
    case "dj": return await DJ.create(data);
    case "photographer": return await Photographer.create(data);
    case "speaker": return await Speaker.create(data);
    case "catering": return await Catering.create(data);
    case "location": return await Location.create(data);
    default: throw new Error("Invalid supplier type");
  }
};

export const getAllSuppliers = async () => {
  return await Supplier.findAll();
};

export const getSupplierById = async (id: string) => {
  return await Supplier.findByPk(id);
};

export const updateSupplier = async (id: string, data: any) => {
  const supplier = await Supplier.findByPk(id);
  if (!supplier) return null;
  return await supplier.update(data);
};

export const deleteSupplier = async (id: string) => {
  const supplier = await Supplier.findByPk(id);
  if (!supplier) return null;
  await supplier.destroy();
  return true;
};
