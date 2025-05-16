import Event from "../models/event";
import EventSupplier from '../models/EventSupplier';
import Supplier from '../models/Supplier';
import Guest from '../models/Guest';

export const getAllEvents = async () => {
  return await Event.findAll();
};

export const getEventById = async (id: string) => {
  return await Event.findByPk(id.trim());
};

export const createEvent = async (data: any) => {
  return await Event.create(data);
};

export const updateEvent = async (id: string, data: any) => {
  const event = await Event.findByPk(id.trim());
  if (!event) return null;
  return await event.update(data);
};

export const deleteEvent = async (id: string) => {
  const event = await Event.findByPk(id.trim());
  if (!event) return null;
  await event.destroy();
  return true;
};

export const getApprovedEventSuppliers = async (eventId: number) => {
  return await EventSupplier.findAll({
    where: {
      event_id: eventId,
      approval_status: 'APPROVED',
    },
  });
};

export const getSuppliersByIds = async (supplierIds: number[]) => {
  return await Supplier.findAll({
    where: { supplier_id: supplierIds },
  });
};

export const getApprovedGuestsByEventId = async (eventId: number) => {
  return await Guest.findAll({
    where: {
      event_id: eventId,
      rsvp: 'APPROVED',
    },
  });
};
