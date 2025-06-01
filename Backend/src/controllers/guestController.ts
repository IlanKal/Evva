import { Request, Response } from "express";
import * as guestService from "../services/guestService";

export const getAllGuests = async (_req: Request, res: Response): Promise<void> => {
  try {
    const guests = await guestService.getAllGuests();
    res.json(guests);
  } catch {
    res.status(500).json({ error: "Failed to fetch guests" });
  }
};

export const getGuestById = async (req: Request, res: Response): Promise<void> => {
  try {
    const guest = await guestService.getGuestById(req.params.id);
    if (!guest) {
      res.status(404).json({ error: "Guest not found" });
      return;
    }
    res.json(guest);
  } catch {
    res.status(500).json({ error: "Failed to fetch guest" });
  }
};

export const createGuest = async (req: Request, res: Response): Promise<void> => {
  try {
    const newGuest = await guestService.createGuest(req.body);
    res.status(201).json(newGuest);
  } catch {
    res.status(500).json({ error: "Failed to create guest" });
  }
};

export const updateGuest = async (req: Request, res: Response): Promise<void> => {
  try {
    const updated = await guestService.updateGuest(req.params.id, req.body);
    if (!updated) {
      res.status(404).json({ error: "Guest not found" });
      return;
    }
    res.json(updated);
  } catch {
    res.status(500).json({ error: "Failed to update guest" });
  }
};

export const deleteGuest = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await guestService.deleteGuest(req.params.id);
    if (!deleted) {
      res.status(404).json({ error: "Guest not found" });
      return;
    }
    res.json({ message: "Guest deleted" });
  } catch {
    res.status(500).json({ error: "Failed to delete guest" });
  }
};

export const bulkCreateGuests = async (req: Request, res: Response): Promise<void> => {
  try {
    const guests = req.body;
    if (!Array.isArray(guests)) {
      res.status(400).json({ error: "Input must be an array of guests" });
      return;
    }

    const inserted = await guestService.bulkCreateGuests(guests);
    res.status(201).json(inserted);
  } catch {
    res.status(500).json({ error: "Failed to insert guests in bulk" });
  }
};

export const getGuestsByEventId = async (req: Request, res: Response): Promise<void> => {
  const eventId = Number(req.params.eventId);

  if (isNaN(eventId)) {
    res.status(400).json({ error: "Invalid eventId" });
    return;
  }

  try {
    const guests = await guestService.getGuestsByEventId(eventId);
    res.json(guests);
  } catch (err) {
    console.error("❌ Failed to get guests by event ID:", err);
    res.status(500).json({ error: "Failed to fetch guests" });
  }
};
