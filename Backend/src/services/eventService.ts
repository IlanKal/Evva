import * as eventRepository from "../repositories/eventRepository";
import * as yup from "yup";
import MailService from "./MailService";

const eventSchema = yup.object({
  user_id: yup.number().required("User ID is required"),
  event_date: yup.date().required("Event date is required"),
  budget: yup.number().positive().required("Budget is required"),
  guest_count: yup.number().integer().positive().required("Guest count is required"),
  location: yup.string().notRequired(),
});

const eventUpdateSchema = yup.object({
  user_id: yup.number().notRequired(),
  event_date: yup.date().notRequired(),
  budget: yup.number().positive().notRequired(),
  guest_count: yup.number().integer().positive().notRequired(),
  location: yup.string().notRequired(),
});

export const getAllEvents = async () => {
  return await eventRepository.getAllEvents();
};

export const getEventsByUserId = async (userId: number) => {
  return await eventRepository.getEventsByUserId(userId);
};

export const getEventById = async (id: string) => {
  return await eventRepository.getEventById(id);
};

export const getEventByRequestId = async (requestId: number): Promise<number | null> => {
  return await eventRepository.getEventIdByRequestId(requestId);
};

export const createEvent = async (data: any) => {
  await eventSchema.validate(data, { abortEarly: false });
  return eventRepository.createEvent(data);
};

export const updateEvent = async (id: string, data: any) => {
  await eventUpdateSchema.validate(data, { abortEarly: false });
  return eventRepository.updateEvent(id, data);
};

export const deleteEvent = async (id: string) => {
  return await eventRepository.deleteEvent(id);
};

export const finishEvent = async (eventId: number): Promise<void> => {
  const approvedEventSuppliers = await eventRepository.getApprovedEventSuppliers(eventId);
  const supplierIds = approvedEventSuppliers.map(link => link.supplier_id);

  if (supplierIds.length === 0) {
    throw new Error("No approved suppliers found for this event.");
  }

  const suppliers = await eventRepository.getSuppliersByIds(supplierIds);

  const approvedGuests = await eventRepository.getApprovedGuestsByEventId(eventId);

  for (const guest of approvedGuests) {
    await MailService.sendRatingEmail(guest, suppliers, eventId);
  }
};