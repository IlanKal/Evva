import { Request, Response } from "express";
import DJ from "../models/DJ";

// GET all DJs
export const getAllDJs = async (req: Request, res: Response) => {
  try {
    const djs = await DJ.findAll();
    res.json(djs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch DJs" });
  }
};

// GET DJ by ID
export const getDJById = async (req: Request, res: Response): Promise<void> => {
  const dj = await DJ.findByPk(req.params.id);
  if (!dj) {
    res.status(404).json({ error: "DJ not found" });
    return;
  }
  res.json(dj);
};

// POST create DJ
export const createDJ = async (req: Request, res: Response) => {
  try {
    const newDJ = await DJ.create(req.body);
    res.status(201).json(newDJ);
  } catch (error) {
    res.status(500).json({ error: "Failed to create DJ" });
  }
};

// PUT update DJ
export const updateDJ = async (req: Request, res: Response): Promise<void> => {
  const dj = await DJ.findByPk(req.params.id);
  if (!dj) {
    res.status(404).json({ error: "DJ not found" });
    return;
  }
  await dj.update(req.body);
  res.json(dj);
};

// DELETE DJ
export const deleteDJ = async (req: Request, res: Response): Promise<void> => {
  const dj = await DJ.findByPk(req.params.id);
  if (!dj) {
    res.status(404).json({ error: "DJ not found" });
    return;
  }
  await dj.destroy();
  res.json({ message: "DJ deleted" });
};
