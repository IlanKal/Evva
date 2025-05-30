import { Request, Response } from "express";
import * as eventService from "../services/eventService"; 

export const getAllEvents = async (_req: Request, res: Response): Promise<void> => {
  try {
    const events = await eventService.getAllEvents();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch events" });
  }
};

export const getEventsByUserId = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = Number(req.params.userId);
    if (isNaN(userId)) {
      res.status(400).json({ error: "Invalid user ID" });
      return;
    }

    const events = await eventService.getEventsByUserId(userId);
    res.json(events);
  } catch (error) {
    console.error("Failed to fetch user events:", error);
    res.status(500).json({ error: "Failed to fetch user events" });
  }
};

export const getEventByRequestId = async (req: Request, res: Response): Promise<void> => {
  try {
    const requestId = Number(req.params.id); // לתאם עם שם הפרמטר בנתיב
    if (isNaN(requestId)) {
      res.status(400).json({ error: "Invalid requestId" });
      return;
    }

    const eventId = await eventService.getEventByRequestId(requestId);

    if (!eventId) {
      res.status(404).json({ error: "Event not found" });
      return;
    }

    res.json({ event_id: eventId });
  } catch (error) {
    console.error("Failed to fetch event by requestId:", error);
    res.status(500).json({ error: "Failed to fetch event" });
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
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch event" });
  }
};

export const createEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const newEvent = await eventService.createEvent(req.body);
    res.status(201).json(newEvent);
  } catch (error) {
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
  } catch (error) {
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
  } catch (error) {
    res.status(500).json({ error: "Failed to delete event" });
  }
};

export const finishEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { event_id } = req.body;

    if (!event_id) {
      res.status(400).json({ error: "Missing event_id" });
      return;
    }

    const suppliers = await eventService.finishEvent(event_id);

    res.json({
      message: "Event marked as finished. Rating emails sent to guests.",
      suppliers,
    });
  } catch (error) {
    console.error("Failed to finish event:", error);
    res.status(500).json({ error: "Failed to finish event" });
  }
};

