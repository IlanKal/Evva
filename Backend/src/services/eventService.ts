// src/services/eventService.ts
import * as eventRepository from "../repositories/eventRepository";
import * as yup from "yup";

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

export const getEventById = async (id: string) => {
  return await eventRepository.getEventById(id);
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
