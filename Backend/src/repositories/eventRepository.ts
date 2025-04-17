// src/repositories/eventRepository.ts
import Event from "../models/event";

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
