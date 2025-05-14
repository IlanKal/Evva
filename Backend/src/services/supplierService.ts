import * as supplierRepository from '../repositories/supplierRepository';
import Guest from '../models/Guest';
import Event from '../models/event';

interface Params {
    type: 'user' | 'guest';
    id: number;
    eventId: number;
  }
  
export const getRateableSuppliers = async ({ type, id, eventId }: Params) => {
  if (type === 'guest') {
    const guest = await Guest.findByPk(id);
    if (!guest || guest.event_id !== eventId || guest.rsvp !== 'APPROVED') {
      throw new Error('Guest is not allowed to rate this event.');
    }
  } else if (type === 'user') {
    const event = await Event.findByPk(eventId);
    if (!event || event.user_id !== id) {
      throw new Error('User is not authorized for this event.');
    }
  } else {
    throw new Error('Invalid rater type.');
  }

  return await supplierRepository.getApprovedSuppliersForEvent(eventId);
};
