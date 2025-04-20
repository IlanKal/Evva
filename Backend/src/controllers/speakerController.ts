import { Request, Response } from "express";
import * as speakerService from "../services/speakerService";

export const getAllSpeakers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const speakers = await speakerService.getAllSpeakers();
    res.json(speakers);
  } catch {
    res.status(500).json({ error: "Failed to fetch speakers" });
  }
};

export const getSpeakerById = async (req: Request, res: Response): Promise<void> => {
  try {
    const speaker = await speakerService.getSpeakerById(req.params.id);
    res.json(speaker);
  } catch (error: any) {
    res.status(404).json({ error: error.message || "Speaker not found" });
  }
};

export const updateSpeaker = async (req: Request, res: Response): Promise<void> => {
  try {
    const updated = await speakerService.updateSpeaker(req.params.id, req.body);
    res.json(updated);
  } catch (error: any) {
    res.status(404).json({ error: error.message || "Failed to update speaker" });
  }
};

export const deleteSpeaker = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await speakerService.deleteSpeaker(req.params.id);
    res.json(result);
  } catch (error: any) {
    res.status(404).json({ error: error.message || "Failed to delete speaker" });
  }
};
