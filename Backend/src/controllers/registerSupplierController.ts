import { Request, Response } from "express";
import * as registerSupplierService from "../services/registerSupplierService";

export const registerSupplier = async (req: Request, res: Response): Promise<void> => {
  const { type, supplier, details } = req.body;

  if (!type || !supplier || !details) {
    res.status(400).json({ error: "Missing type, supplier or details" });
    return;
  }

  try {
    const result = await registerSupplierService.registerSupplier(type, supplier, details);
    res.status(201).json(result);
  } catch (error: any) {
    console.error("❌ Error registering supplier:", error);
    res.status(500).json({ error: "Server error during supplier registration" });
  }
};

export const getAllSuppliers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const suppliers = await registerSupplierService.getAllSuppliers();
    res.json(suppliers);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch suppliers" });
  }
};

export const getSupplierById = async (req: Request, res: Response): Promise<void> => {
  try {
    const supplier = await registerSupplierService.getSupplierById(req.params.id);
    res.json(supplier);
  } catch (error: any) {
    res.status(404).json({ error: error.message || "Supplier not found" });
  }
};

export const updateSupplier = async (req: Request, res: Response): Promise<void> => {
  try {
    const updated = await registerSupplierService.updateSupplier(req.params.id, req.body);
    res.json(updated);
  } catch (error: any) {
    res.status(404).json({ error: error.message || "Failed to update supplier" });
  }
};

export const deleteSupplier = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await registerSupplierService.deleteSupplier(req.params.id);
    res.json(result);
  } catch (error: any) {
    res.status(404).json({ error: error.message || "Failed to delete supplier" });
  }
};
