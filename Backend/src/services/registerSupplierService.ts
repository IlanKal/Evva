
import * as supplierRepository from "../repositories/registerSupplierRepository";
import * as yup from "yup";
import { REGIONS } from "../constants/regions";
import { WEEKDAYS } from "../constants/weekdays";

const supplierSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  region: yup.mixed().oneOf(REGIONS),
  available_days: yup
    .array()
    .of(yup.string().oneOf(WEEKDAYS))
    .nullable(),
  rating: yup.number().min(0).max(5),
  ratings_count: yup.number().min(0),
  image_url: yup.string().url().nullable(),
  additional_info: yup.string().nullable(),
  contact_info: yup.string().nullable(),
});

export const registerSupplier = async (type: string, supplier: any, details: any) => {
  await supplierSchema.validate(supplier, { abortEarly: false });

  const newSupplier = await supplierRepository.createSupplier({...supplier,supplier_type: type.toLowerCase(),});
  const supplier_id = newSupplier.get("supplier_id");
  await supplierRepository.createSpecificSupplier(type.toLowerCase(), { ...details, supplier_id });

  return { message: "Supplier registered successfully" };
};

export const getAllSuppliers = async () => {
  return await supplierRepository.getAllSuppliers();
};

export const getSupplierById = async (id: string) => {
  const supplier = await supplierRepository.getSupplierById(id);
  if (!supplier) throw new Error("Supplier not found");
  return supplier;
};

export const updateSupplier = async (id: string, data: any) => {
  await supplierSchema.validate(data, { abortEarly: false });
  const updated = await supplierRepository.updateSupplier(id, data);
  if (!updated) throw new Error("Supplier not found");
  return updated;
};

export const deleteSupplier = async (id: string) => {
  const deleted = await supplierRepository.deleteSupplier(id);
  if (!deleted) throw new Error("Supplier not found");
  return { message: "Supplier deleted" };
};
