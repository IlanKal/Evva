import { Request, Response } from "express";
import Supplier from "../models/Supplier";

// GET all suppliers
export const getAllSuppliers = async (req: Request, res: Response) => {
  try {
    const suppliers = await Supplier.findAll();
    res.json(suppliers);
  } catch (error) {
    console.error("Error fetching suppliers:", error);
    res.status(500).json({ error: "Failed to fetch suppliers" });
  }
};

// GET supplier by ID
export const getSupplierById = async (req: Request, res: Response): Promise<void> => {
  try {
    const supplier = await Supplier.findByPk(req.params.id);
    if (!supplier) {
      res.status(404).json({ error: "Supplier not found" });
      return;
    }
    res.json(supplier);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch supplier" });
  }
};


// POST create new supplier
export const createSupplier = async (req: Request, res: Response) => {
  try {
    const newSupplier = await Supplier.create(req.body);
    res.status(201).json(newSupplier);
  } catch (error) {
    res.status(500).json({ error: "Failed to create supplier" });
  }
};

// PUT update supplier
export const updateSupplier = async (req: Request, res: Response): Promise<void> => {
  try {
    const supplier = await Supplier.findByPk(req.params.id);
    if (!supplier) {
      return;
    }
    await supplier.update(req.body);
    res.json(supplier);
  } catch (error) {
    res.status(500).json({ error: "Failed to update supplier" });
  }
};

// DELETE supplier
export const deleteSupplier = async (req: Request, res: Response): Promise<void> => {
  try {
    const supplier = await Supplier.findByPk(req.params.id);
    if (!supplier) {
      return;
    }
    await supplier.destroy();
    res.json({ message: "Supplier deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete supplier" });
  }
};
