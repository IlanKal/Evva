import EventSupplier from "../models/EventSupplier";

export const addSupplierToEvent = async (event_id: number, supplier_id: number) => {
  return await EventSupplier.create({ event_id, supplier_id });
};

export const removeSupplierFromEvent = async (event_id: number, supplier_id: number) => {
  return await EventSupplier.destroy({
    where: { event_id, supplier_id }
  });
};

export const getSuppliersByEvent = async (eventId: string) => {
  return await EventSupplier.findAll({
    where: { event_id: eventId }
  });
};
