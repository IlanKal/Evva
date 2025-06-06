import * as userRepository from "../repositories/userRepository";
import bcrypt from 'bcryptjs';
import * as yup from "yup";
import { Event, EventSupplier, EventRequest } from "../models";

const userSchema = yup.object({
  full_name: yup.string().required("Full name is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  phone: yup.string().nullable(),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  role: yup.string().notRequired(),
});


const userUpdateSchema = yup.object({
  full_name: yup.string().notRequired(),
  email: yup.string().email("Invalid email format").notRequired(),
  phone: yup.string().nullable().notRequired(),
  password: yup.string().min(6, "Password must be at least 6 characters").notRequired(),
  role: yup.string().notRequired(),
});

export const getAllUsers = async () => {
  return await userRepository.getAllUsers();
};

export const getUserById = async (id: string) => {
  return await userRepository.getUserById(id);
};

export const createUser = async (data: any) => {
      await userSchema.validate(data, { abortEarly: false });
    return userRepository.createUser(data);
  
};

export const updateUser = async (id: string, data: any) => {
  await userUpdateSchema.validate(data, { abortEarly: false });

  const updatedData = { ...data };

  if (data.password) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    updatedData.password = hashedPassword;
  }

  return userRepository.updateUser(id, updatedData);
};

export const deleteUser = async (id: string) => {
  return await userRepository.deleteUser(id);
};

export const fetchUserEvents = async (userId: number) => {
  const events = await Event.findAll({
    where: { user_id: userId },
    order: [["event_date", "DESC"]],
    include: [
      { model: EventSupplier, as: "EventSuppliers" },
      { model: EventRequest, as: "EventRequest" },
    ],
  }) as (Event & {
    EventSuppliers?: EventSupplier[];
    EventRequest?: {
      event_type?: string;
      dj_preferences?: object | null;
      location_preferences?: object | null;
      catering_preferences?: object | null;
      photographer_preferences?: object | null;
      lecturer_preferences?: object | null;
    };
  })[];

  const now = new Date();

  return events.map((event) => {
    const suppliers = event.EventSuppliers || [];
    const approved = suppliers.filter(s => s.approval_status === "APPROVED").length;

    // בדיקה כמה ספקים הלקוח ביקש
    const request = event.EventRequest;
    const requestedCount = [
      request?.dj_preferences,
      request?.location_preferences,
      request?.catering_preferences,
      request?.photographer_preferences,
      request?.lecturer_preferences,
    ].filter((pref) => pref !== null && pref !== undefined).length;

    // חישוב סטטוס
    let status: "draft" | "in_progress" | "completed" = "draft";
    if (approved === requestedCount && requestedCount > 0) {
      status = "completed";
    } else if (approved > 0 || suppliers.length > 0) {
      status = "in_progress";
    }

    // בדיקת תאריך עבר
    const isPast = event.event_date ? new Date(event.event_date) < now : false;

    return {
      event_id: event.event_id,
      event_type: request?.event_type || "unknown",
      event_date: event.event_date,
      guest_count: event.guest_count,
      budget: event.budget,
      location: event.location,
      status,
      isPast,
    };
  });
};