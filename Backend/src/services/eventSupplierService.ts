import * as eventSupplierRepository from "../repositories/eventSupplierRepository";
import Supplier from "../models/Supplier";

export const addSupplierToEvent = async (event_id: number, supplier_id: number) => {
  return await eventSupplierRepository.addSupplierToEvent(event_id, supplier_id);
};

export const removeSupplierFromEvent = async (event_id: number, supplier_id: number) => {
  return await eventSupplierRepository.removeSupplierFromEvent(event_id, supplier_id);
};

export const getSuppliersByEvent = async (eventId: string) => {
  return await eventSupplierRepository.getSuppliersByEvent(eventId);
};

export const chooseSupplier = async (event_id: number, supplier_id: number) => {
  const supplier = await Supplier.findByPk(supplier_id);
  if (!supplier) throw new Error("Supplier not found");

  // 1. ננקה ספק קודם שנבחר באותה קטגוריה (אם קיים)
  await eventSupplierRepository.clearPreviousChosenSupplier(
    event_id,
    supplier.supplier_type,
    supplier_id
  );

  // 2. האם הספק כבר קיים בקשר לאירוע הזה?
  const existing = await eventSupplierRepository.findByEventAndSupplier(event_id, supplier_id);

  if (existing) {
    // רק עדכון שורה קיימת
    return await eventSupplierRepository.updateSupplierChoice(event_id, supplier_id);
  } else {
    // יצירת שורה חדשה
    return await eventSupplierRepository.createSupplierChoice(event_id, supplier_id);
  }

  //  פה אפשר גם להוסיף מייל ללקוח שנכנס אירוע  
  
};



export const confirmSupplier = async (event_id: number, supplier_id: number) => {
  const supplier = await Supplier.findByPk(supplier_id);
  if (!supplier) throw new Error("Supplier not found");

  // שלב 1 – אישור הספק הנבחר
  await eventSupplierRepository.confirmSupplierStatus(event_id, supplier_id);

  // שלב 2 – מחיקת שאר הספקים באותה קטגוריה
  await eventSupplierRepository.deleteOtherSuppliersOfSameType(
    event_id,
    supplier.supplier_type,
    supplier_id
  );
};

export const declineSupplier = async (event_id: number, supplier_id: number) => {
  return await eventSupplierRepository.declineSupplierStatus(event_id, supplier_id);
};