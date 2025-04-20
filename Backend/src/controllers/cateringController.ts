import { Request, Response } from "express";
import * as cateringService from "../services/cateringService";

export const getAllCaterings = async (_req: Request, res: Response): Promise<void> => {
  try {
    const caterings = await cateringService.getAllCaterings();
    res.json(caterings);
  } catch {
    res.status(500).json({ error: "Failed to fetch caterings" });
  }
};

export const getCateringById = async (req: Request, res: Response): Promise<void> => {
  try {
    const catering = await cateringService.getCateringById(req.params.id);
    res.json(catering);
  } catch (error: any) {
    res.status(404).json({ error: error.message || "Catering not found" });
  }
};

export const updateCatering = async (req: Request, res: Response): Promise<void> => {
  try {
    const updated = await cateringService.updateCatering(req.params.id, req.body);
    res.json(updated);
  } catch (error: any) {
    res.status(404).json({ error: error.message || "Failed to update catering" });
  }
};

export const deleteCatering = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await cateringService.deleteCatering(req.params.id);
    res.json(result);
  } catch (error: any) {
    res.status(404).json({ error: error.message || "Failed to delete catering" });
  }
};
