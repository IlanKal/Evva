import { Request, Response } from "express";
import * as eventSupplierService from "../services/eventSupplierService";

export const addSupplierToEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const created = await eventSupplierService.addSupplierToEvent(req.body.event_id, req.body.supplier_id);
    res.status(201).json(created);
  } catch (error) {
    console.error("❌ Error creating event-supplier relation:", error);
    res.status(500).json({ error: "Failed to add supplier to event" });
  }
};

export const removeSupplierFromEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await eventSupplierService.removeSupplierFromEvent(req.body.event_id, req.body.supplier_id);
    if (deleted) {
      res.json({ message: "Supplier removed from event" });
    } else {
      res.status(404).json({ error: "Relation not found" });
    }
  } catch (error) {
    console.error("❌ Error deleting event-supplier relation:", error);
    res.status(500).json({ error: "Failed to remove supplier from event" });
  }
};

export const getSuppliersByEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const suppliers = await eventSupplierService.getSuppliersByEvent(req.params.eventId);
    res.json(suppliers);
  } catch (error) {
    console.error("❌ Error fetching suppliers by event:", error);
    res.status(500).json({ error: "Failed to fetch suppliers for event" });
  }
};
