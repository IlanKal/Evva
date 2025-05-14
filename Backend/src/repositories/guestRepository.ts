import Guest from "../models/Guest";

const validRsvpStatuses = ['PENDING', 'APPROVED', 'REJECTED'];

export const getAllGuests = async () => Guest.findAll();

export const getGuestById = async (id: string) => Guest.findByPk(id);

export const createGuest = async (data: any) => {
  if (data.rsvp && !validRsvpStatuses.includes(data.rsvp)) {
    throw new Error(`Invalid RSVP status: ${data.rsvp}`);
  }
  return Guest.create(data);
};

export const updateGuest = async (id: string, data: any) => {
  const guest = await Guest.findByPk(id);
  if (!guest) return null;

  if (data.rsvp && !validRsvpStatuses.includes(data.rsvp)) {
    throw new Error(`Invalid RSVP status: ${data.rsvp}`);
  }

  return await guest.update(data);
};

export const deleteGuest = async (id: string) => {
  const guest = await Guest.findByPk(id);
  if (!guest) return null;
  await guest.destroy();
  return true;
};

export const bulkCreateGuests = async (guests: any[]) => {
  for (const guest of guests) {
    if (guest.rsvp && !validRsvpStatuses.includes(guest.rsvp)) {
      throw new Error(`Invalid RSVP status in bulkCreate: ${guest.rsvp}`);
    }
  }
  return Guest.bulkCreate(guests);
};