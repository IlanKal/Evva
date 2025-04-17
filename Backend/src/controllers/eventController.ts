import { Request, Response } from "express";
import * as eventService from "../services/eventService";

export const getAllEvents = async (_req: Request, res: Response): Promise<void> => {
  try {
    const events = await eventService.getAllEvents();
    res.json(events);
  } catch {
    res.status(500).json({ error: "Failed to fetch events" });
  }
};

export const getEventById = async (req: Request, res: Response): Promise<void> => {
  try {
    const event = await eventService.getEventById(req.params.id.trim());
    if (!event) {
      res.status(404).json({ error: "Event not found" });
      return;
    }
    res.json(event);
  } catch {
    res.status(500).json({ error: "Failed to fetch event" });
  }
};

export const createEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const newEvent = await eventService.createEvent(req.body);
    res.status(201).json(newEvent);
  } catch {
    res.status(500).json({ error: "Failed to create event" });
  }
};

export const updateEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const updated = await eventService.updateEvent(req.params.id.trim(), req.body);
    if (!updated) {
      res.status(404).json({ error: "Event not found" });
      return;
    }
    res.json(updated);
  } catch {
    res.status(500).json({ error: "Failed to update event" });
  }
};

export const deleteEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await eventService.deleteEvent(req.params.id.trim());
    if (!deleted) {
      res.status(404).json({ error: "Event not found" });
      return;
    }
    res.json({ message: "Event deleted" });
  } catch {
    res.status(500).json({ error: "Failed to delete event" });
  }
};
