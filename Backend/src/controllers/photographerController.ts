import { Request, Response } from "express";
import * as photographerService from "../services/photographerService";

export const getAllPhotographers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const photographers = await photographerService.getAllPhotographers();
    res.json(photographers);
  } catch {
    res.status(500).json({ error: "Failed to fetch photographers" });
  }
};

export const getPhotographerById = async (req: Request, res: Response): Promise<void> => {
  try {
    const photographer = await photographerService.getPhotographerById(req.params.id);
    res.json(photographer);
  } catch (error: any) {
    res.status(404).json({ error: error.message || "Photographer not found" });
  }
};

export const updatePhotographer = async (req: Request, res: Response): Promise<void> => {
  try {
    const updated = await photographerService.updatePhotographer(req.params.id, req.body);
    res.json(updated);
  } catch (error: any) {
    res.status(404).json({ error: error.message || "Failed to update photographer" });
  }
};

export const deletePhotographer = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await photographerService.deletePhotographer(req.params.id);
    res.json(result);
  } catch (error: any) {
    res.status(404).json({ error: error.message || "Failed to delete photographer" });
  }
};
