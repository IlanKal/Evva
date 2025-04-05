import { Request, Response } from "express";
import Location from "../models/Location";

// GET all
export const getAllLocations = async (req: Request, res: Response): Promise<void> => {
  try {
    const locations = await Location.findAll();
    res.json(locations);
  } catch {
    res.status(500).json({ error: "Failed to fetch locations" });
  }
};

// GET by ID
export const getLocationById = async (req: Request, res: Response): Promise<void> => {
  try {
    const location = await Location.findByPk(req.params.id);
    if (!location) {
      res.status(404).json({ error: "Location not found" });
      return;
    }
    res.json(location);
  } catch {
    res.status(500).json({ error: "Failed to fetch location" });
  }
};

// POST
export const createLocation = async (req: Request, res: Response): Promise<void> => {
  try {
    const newLocation = await Location.create(req.body);
    res.status(201).json(newLocation);
  } catch {
    res.status(500).json({ error: "Failed to create location" });
  }
};

// PUT
export const updateLocation = async (req: Request, res: Response): Promise<void> => {
  try {
    const location = await Location.findByPk(req.params.id);
    if (!location) {
      res.status(404).json({ error: "Location not found" });
      return;
    }
    await location.update(req.body);
    res.json(location);
  } catch {
    res.status(500).json({ error: "Failed to update location" });
  }
};

// DELETE
export const deleteLocation = async (req: Request, res: Response): Promise<void> => {
  try {
    const location = await Location.findByPk(req.params.id);
    if (!location) {
      res.status(404).json({ error: "Location not found" });
      return;
    }
    await location.destroy();
    res.json({ message: "Location deleted" });
  } catch {
    res.status(500).json({ error: "Failed to delete location" });
  }
};
