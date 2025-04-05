// controllers/photographerController.ts
import { Request, Response } from "express";
import Photographer from "../models/Photographer";

// GET all photographers
export const getAllPhotographers = async (req: Request, res: Response) => {
  try {
    const photographers = await Photographer.findAll();
    res.json(photographers);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch photographers" });
  }
};

// GET one photographer by ID
export const getPhotographerById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const photographer = await Photographer.findByPk(id);
    if (photographer) {
      res.json(photographer);
    } else {
      res.status(404).json({ error: "Photographer not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch photographer" });
  }
};

// CREATE a new photographer
export const createPhotographer = async (req: Request, res: Response) => {
  try {
    const newPhotographer = await Photographer.create(req.body);
    res.status(201).json(newPhotographer);
  } catch (error) {
    res.status(500).json({ error: "Failed to create photographer" });
  }
};

// UPDATE a photographer
export const updatePhotographer = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const [updated] = await Photographer.update(req.body, { where: { photographer_id: id } });
    if (updated) {
      const updatedPhotographer = await Photographer.findByPk(id);
      res.json(updatedPhotographer);
    } else {
      res.status(404).json({ error: "Photographer not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update photographer" });
  }
};

// DELETE a photographer
export const deletePhotographer = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deleted = await Photographer.destroy({ where: { photographer_id: id } });
    if (deleted) {
      res.json({ message: "Photographer deleted" });
    } else {
      res.status(404).json({ error: "Photographer not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete photographer" });
  }
};
