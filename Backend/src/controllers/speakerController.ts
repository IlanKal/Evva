import { Request, Response } from "express";
import Speaker from "../models/Speaker";

// GET all speakers
export const getAllSpeakers = async (req: Request, res: Response) => {
  try {
    const speakers = await Speaker.findAll();
    res.json(speakers);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch speakers" });
  }
};

// GET speaker by ID
export const getSpeakerById = async (req: Request, res: Response): Promise<void> => {
  const speaker = await Speaker.findByPk(req.params.id);
  if (!speaker) {
    res.status(404).json({ error: "Speaker not found" });
    return;
  }
  res.json(speaker);
};

// POST create speaker
export const createSpeaker = async (req: Request, res: Response) => {
  try {
    const newSpeaker = await Speaker.create(req.body);
    res.status(201).json(newSpeaker);
  } catch (error) {
    res.status(500).json({ error: "Failed to create speaker" });
  }
};

// PUT update speaker
export const updateSpeaker = async (req: Request, res: Response): Promise<void> => {
  const speaker = await Speaker.findByPk(req.params.id);
  if (!speaker) {
    res.status(404).json({ error: "Speaker not found" });
    return;
  }
  await speaker.update(req.body);
  res.json(speaker);
};

// DELETE speaker
export const deleteSpeaker = async (req: Request, res: Response): Promise<void> => {
  const speaker = await Speaker.findByPk(req.params.id);
  if (!speaker) {
    res.status(404).json({ error: "Speaker not found" });
    return;
  }
  await speaker.destroy();
  res.json({ message: "Speaker deleted" });
};
