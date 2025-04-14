// src/repositories/guestRepository.ts
import Guest from "../models/Guest";

export const getAllGuests = async () => Guest.findAll();

export const getGuestById = async (id: string) => Guest.findByPk(id);

export const createGuest = async (data: any) => Guest.create(data);

export const updateGuest = async (id: string, data: any) => {
  const guest = await Guest.findByPk(id);
  if (!guest) return null;
  return await guest.update(data);
};

export const deleteGuest = async (id: string) => {
  const guest = await Guest.findByPk(id);
  if (!guest) return null;
  await guest.destroy();
  return true;
};

export const bulkCreateGuests = async (guests: any[]) => Guest.bulkCreate(guests);
