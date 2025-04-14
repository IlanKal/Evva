import * as eventSupplierRepository from "../repositories/eventSupplierRepository";

export const addSupplierToEvent = async (event_id: number, supplier_id: number) => {
  return await eventSupplierRepository.addSupplierToEvent(event_id, supplier_id);
};

export const removeSupplierFromEvent = async (event_id: number, supplier_id: number) => {
  return await eventSupplierRepository.removeSupplierFromEvent(event_id, supplier_id);
};

export const getSuppliersByEvent = async (eventId: string) => {
  return await eventSupplierRepository.getSuppliersByEvent(eventId);
};
