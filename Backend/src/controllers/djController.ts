import { Request, Response } from "express";
import * as djService from "../services/djService";

export const getAllDJs = async (_req: Request, res: Response): Promise<void> => {
  try {
    const djs = await djService.getAllDJs();
    res.json(djs);
  } catch {
    res.status(500).json({ error: "Failed to fetch DJs" });
  }
};

export const getDJById = async (req: Request, res: Response): Promise<void> => {
  try {
    const dj = await djService.getDJById(req.params.id);
    res.json(dj);
  } catch (error: any) {
    res.status(404).json({ error: error.message || "DJ not found" });
  }
};

export const updateDJ = async (req: Request, res: Response): Promise<void> => {
  try {
    const updated = await djService.updateDJ(req.params.id, req.body);
    res.json(updated);
  } catch (error: any) {
    res.status(404).json({ error: error.message || "Failed to update DJ" });
  }
};

export const deleteDJ = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await djService.deleteDJ(req.params.id);
    res.json(result);
  } catch (error: any) {
    res.status(404).json({ error: error.message || "Failed to delete DJ" });
  }
};
