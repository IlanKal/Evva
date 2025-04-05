import { Request, Response } from "express";
import Guest from "../models/Guest";

// GET all guests
export const getAllGuests = async (req: Request, res: Response) => {
    try {
      const guests = await Guest.findAll();
      res.json(guests);
    } catch (error) {
      console.error("Error fetching guests:", error);
      res.status(500).json({ error: "Failed to fetch guests" });
    }
  };

// GET guest by ID
export const getGuestById = async (req: Request, res: Response) => {
    try {
      const guest = await Guest.findByPk(req.params.id);
      if (!guest) {
        res.status(404).json({ error: "Guest not found" });
        return;
      }
      res.json(guest);
    } catch (error) {
      console.error("Error fetching guest by ID:", error);
      res.status(500).json({ error: "Failed to fetch guest" });
    }
  };
  
// POST create new guest
export const createGuest = async (req: Request, res: Response) => {
    try {
      const newGuest = await Guest.create(req.body);
      res.status(201).json(newGuest);
    } catch (error) {
      console.error("Error creating guest:", error);
      res.status(500).json({ error: "Failed to create guest" });
    }
  };
// PUT update guest
export const updateGuest = async (req: Request, res: Response) => {
    try {
      const guest = await Guest.findByPk(req.params.id);
      if (!guest) {
        res.status(404).json({ error: "Guest not found" });
        return;
      }
      await guest.update(req.body);
      res.json(guest);
    } catch (error) {
      console.error("Error updating guest:", error);
      res.status(500).json({ error: "Failed to update guest" });
    }
  };

// DELETE guest
export const deleteGuest = async (req: Request, res: Response) => {
  try {
    const guest = await Guest.findByPk(req.params.id);
    if (!guest) {
      res.status(404).json({ error: "Guest not found" });
      return;
    }
    await guest.destroy();
    res.json({ message: "Guest deleted" });
  } catch (error) {
    console.error("Error deleting guest:", error);
    res.status(500).json({ error: "Failed to delete guest" });
  }
};

// POST bulk create guests (e.g. from Excel file)
export const bulkCreateGuests = async (req: Request, res: Response): Promise<void> => {
    try {
      const guests = req.body;
      if (!Array.isArray(guests)) {
        res.status(400).json({ error: "Input must be an array of guests" });
        return;
      }
  
      const inserted = await Guest.bulkCreate(guests);
      res.status(201).json(inserted);
    } catch (error) {
      res.status(500).json({ error: "Failed to insert guests in bulk" });
    }
};