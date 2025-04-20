import { Request, Response } from "express";
import * as locationService from "../services/locationService";

export const getAllLocations = async (_req: Request, res: Response): Promise<void> => {
  try {
    const locations = await locationService.getAllLocations();
    res.json(locations);
  } catch {
    res.status(500).json({ error: "Failed to fetch locations" });
  }
};

export const getLocationById = async (req: Request, res: Response): Promise<void> => {
  try {
    const location = await locationService.getLocationById(req.params.id);
    res.json(location);
  } catch (error: any) {
    res.status(404).json({ error: error.message || "Location not found" });
  }
};

export const updateLocation = async (req: Request, res: Response): Promise<void> => {
  try {
    const updated = await locationService.updateLocation(req.params.id, req.body);
    res.json(updated);
  } catch (error: any) {
    res.status(404).json({ error: error.message || "Failed to update location" });
  }
};

export const deleteLocation = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await locationService.deleteLocation(req.params.id);
    res.json(result);
  } catch (error: any) {
    res.status(404).json({ error: error.message || "Failed to delete location" });
  }
};
