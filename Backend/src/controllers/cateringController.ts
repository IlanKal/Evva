import { Request, Response } from "express";
import Catering from "../models/Catering";

// GET all catering entries
export const getAllCatering = async (req: Request, res: Response) => {
  try {
    const results = await Catering.findAll();
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch catering options" });
  }
};

// GET by ID
export const getCateringById = async (req: Request, res: Response): Promise<void> => {
  const catering = await Catering.findByPk(req.params.id);
  if (!catering) {
    res.status(404).json({ error: "Catering not found" });
    return;
  }
  res.json(catering);
};

// POST
export const createCatering = async (req: Request, res: Response) => {
  try {
    const newCatering = await Catering.create(req.body);
    res.status(201).json(newCatering);
  } catch (error) {
    res.status(500).json({ error: "Failed to create catering" });
  }
};

// PUT
export const updateCatering = async (req: Request, res: Response): Promise<void> => {
  const catering = await Catering.findByPk(req.params.id);
  if (!catering) {
    res.status(404).json({ error: "Catering not found" });
    return;
  }
  await catering.update(req.body);
  res.json(catering);
};

// DELETE
export const deleteCatering = async (req: Request, res: Response): Promise<void> => {
  const catering = await Catering.findByPk(req.params.id);
  if (!catering) {
    res.status(404).json({ error: "Catering not found" });
    return;
  }
  await catering.destroy();
  res.json({ message: "Catering deleted" });
};
