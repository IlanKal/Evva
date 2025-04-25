import Guest from '../models/Guest';
import { GuestCreationAttributes } from '../models/Guest';
import RsvpStatus from '../types/RsvpStatus';

class GuestUploadRepository {
  static async createGuestsBatch(guests: GuestCreationAttributes[]) {
    return await Guest.bulkCreate(guests, { returning: true });
  }

  static async updateGuestRsvp(guestId: number, rsvp: RsvpStatus) {
    const guest = await Guest.findByPk(guestId);
    if (!guest) return null;

    guest.rsvp = rsvp;
    await guest.save();

    return guest;
  }

  static async getGuestsByEventId(eventId: number) {
    return await Guest.findAll({ where: { event_id: eventId } });
  }
}

export default GuestUploadRepository;
