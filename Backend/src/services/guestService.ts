
import * as guestRepo from "../repositories/guestRepository";
import * as yup from "yup";

const guestSchema = yup.object({
    event_id: yup.number().required("Event ID is required"),
    full_name: yup.string().required("Full name is required"),
    phone: yup.string().nullable(),
    email: yup.string().email().nullable(),
    rsvp: yup
    .mixed<'PENDING' | 'APPROVED' | 'REJECTED'>()
    .oneOf(['PENDING', 'APPROVED', 'REJECTED'])
    .nullable(),
    });
  
  const guestUpdateSchema = guestSchema.noUnknown().shape({
    event_id: yup.number().notRequired(),
    full_name: yup.string().notRequired(),
    phone: yup.string().nullable(),
    email: yup.string().email().nullable(),
    rsvp: yup
    .mixed<'PENDING' | 'APPROVED' | 'REJECTED'>()
    .oneOf(['PENDING', 'APPROVED', 'REJECTED'])
    .nullable(),
    });  
export const getAllGuests = () => guestRepo.getAllGuests();

export const getGuestById = (id: string) => guestRepo.getGuestById(id);

export const createGuest = async (data: any) => {
    await guestSchema.validate(data, { abortEarly: false });
    return guestRepo.createGuest(data);
  };

  export const updateGuest = async (id: string, data: any) => {
    await guestUpdateSchema.validate(data, { abortEarly: false });
    return guestRepo.updateGuest(id, data);
  };

export const deleteGuest = (id: string) => guestRepo.deleteGuest(id);

export const bulkCreateGuests = async (guests: any[]) => {
    for (const guest of guests) {
      await guestSchema.validate(guest, { abortEarly: false });
    }
    return guestRepo.bulkCreateGuests(guests);
  };

  