import * as supplierRepository from '../repositories/supplierRepository';
import * as cateringRepository from '../repositories/cateringRepository';
import * as djRepository from '../repositories/djRepository';
import * as locationRepository from '../repositories/locationRepository';
import * as photographerRepository from '../repositories/photographerRepository';
import * as speakerRepository from '../repositories/speakerRepository';
import Guest from '../models/Guest';
import Event from '../models/event';
import bcrypt from 'bcryptjs';


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

export const getSupplierById = async (id: number) => {
  const idStr = id.toString();
  const supplier = await supplierRepository.findSupplierById(idStr);
  if (!supplier) return null;
  let extraData = {};

  switch (supplier.supplier_type) {
    case 'catering':
      extraData = (await cateringRepository.getCateringBySupplierId(idStr))?.get({ plain: true }) ?? {};
      break;
    case 'dj':
      extraData = (await djRepository.getDJBySupplierId(idStr))?.get({ plain: true }) ?? {};
      break;
    case 'location':
      extraData = (await locationRepository.getLocationBySupplierId(idStr))?.get({ plain: true }) ?? {};
      break;
    case 'photographer':
      extraData = (await photographerRepository.getPhotographerBySupplierId(idStr))?.get({ plain: true }) ?? {};
      break;
    case 'speaker':
      extraData = (await speakerRepository.getSpeakerBySupplierId(idStr))?.get({ plain: true }) ?? {};
      break;
  }

  return {
    ...supplier.get({ plain: true }),
    ...extraData
  };
};

export const updateSupplier = async (id: string, data: any) => {
  const existingSupplier = await supplierRepository.findSupplierById(id);
  if (!existingSupplier) return null;

  const updatedData = { ...data };

  if (data.password) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    updatedData.password = hashedPassword;
  }

  await supplierRepository.updateSupplier(id, updatedData);

  switch (existingSupplier.supplier_type) {
    case 'catering':
      await cateringRepository.updateCateringBySupplierId(id, data);
      break;
    case 'dj':
      await djRepository.updateDJBySupplierId(id, data);
      break;
    case 'photographer':
      await photographerRepository.updatePhotographerBySupplierId(id, data);
      break;
    case 'speaker':
      await speakerRepository.updateSpeakerBySupplierId(id, data);
      break;
    case 'location':
      await locationRepository.updateLocationBySupplierId(id, data);
      break;
  }

  return true;
};
