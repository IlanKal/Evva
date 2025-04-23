import { GuestInput } from '../utils/excelParser';
import GuestUploadRepository from '../repositories/GuestUploadRepository';
import MailService from './MailService';

class GuestUploadService {
  /**
   * Saves guests to DB and sends RSVP emails
   */
  static async createGuestsAndSendEmails(guests: GuestInput[], eventId: number) {
    const guestsWithEvent = guests.map((guest) => ({
      ...guest,
      event_id: eventId,
      rsvp: null
    }));

    const createdGuests = await GuestUploadRepository.createGuestsBatch(guestsWithEvent);

    for (const guest of createdGuests) {
      await MailService.sendRsvpEmail(guest);
    }

    return createdGuests;
  }

  /**
   * Update RSVP value (true/false) for guest
   */
  static async updateRsvp(guestId: number, rsvp: boolean) {
    return await GuestUploadRepository.updateGuestRsvp(guestId, rsvp);
  }

  /**
   * Get guests for a given event
   */
  static async getGuestsByEvent(eventId: number) {
    return await GuestUploadRepository.getGuestsByEventId(eventId);
  }
}

export default GuestUploadService;
