import { Request, Response } from "express";
import EventSupplier from "../models/EventSupplier";

// Add supplier to event
export const addSupplierToEvent = async (req: Request, res: Response) => {
  const { event_id, supplier_id } = req.body;

  try {
    const created = await EventSupplier.create({ event_id, supplier_id });
    res.status(201).json(created);
  } catch (error) {
    console.error("❌ Error creating event-supplier relation:", error);
    res.status(500).json({ error: "Failed to add supplier to event" });
  }
};

// Delete supplier from event
export const removeSupplierFromEvent = async (req: Request, res: Response) => {
  const { event_id, supplier_id } = req.body;

  try {
    const deleted = await EventSupplier.destroy({
      where: { event_id, supplier_id },
    });

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

// Get all suppliers for a specific event
export const getSuppliersByEvent = async (req: Request, res: Response) => {
    const { eventId } = req.params;
  
    try {
      const eventSuppliers = await EventSupplier.findAll({
        where: { event_id: eventId }
      });
  
      res.json(eventSuppliers);
    } catch (error) {
      console.error("❌ Error fetching suppliers by event:", error);
      res.status(500).json({ error: "Failed to fetch suppliers for event" });
    }
  };