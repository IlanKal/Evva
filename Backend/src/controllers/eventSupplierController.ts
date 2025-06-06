import { Request, Response } from "express";
import * as eventSupplierService from "../services/eventSupplierService";
import { getEventSupplierStatus } from "../services/getEventSupplierStatusService";
import { getSupplierDashboardEvents } from "../services/supplierEventService";

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

export const chooseSupplier = async (req: Request, res: Response): Promise<void> => {
  const { event_id, supplier_id } = req.body;
  try {
    await eventSupplierService.chooseSupplier(event_id, supplier_id);
    res.status(200).json({ message: "Supplier chosen successfully" });
  } catch (error) {
    console.error("❌ Error choosing supplier:", error);
    res.status(500).json({ error: "Failed to choose supplier" });
  }
};

export const confirmSupplier = async (req: Request, res: Response): Promise<void> => {
  const { event_id, supplier_id } = req.body;

  try {
    await eventSupplierService.confirmSupplier(event_id, supplier_id);
    res.status(200).json({ message: "Supplier confirmed successfully" });
  } catch (error) {
    console.error("❌ Error confirming supplier:", error);
    res.status(500).json({ error: "Failed to confirm supplier" });
  }
};

export const declineSupplier = async (req: Request, res: Response): Promise<void> => {
  const { event_id, supplier_id } = req.body;

  try {
    await eventSupplierService.declineSupplier(event_id, supplier_id);
    res.status(200).json({ message: "Supplier declined successfully" });
  } catch (error) {
    console.error("❌ Error declining supplier:", error);
    res.status(500).json({ error: "Failed to decline supplier" });
  }
};

export const getSupplierStatusByEvent = async (req: Request, res: Response): Promise<void> => {
  const event_id = parseInt(req.params.event_id);
  try {
    const statusMap = await getEventSupplierStatus(event_id);
    res.status(200).json(statusMap);
  } catch (error) {
    console.error("❌ Failed to get supplier status by event:", error);
    res.status(500).json({ error: "Failed to get supplier status" });
  }
};

export const getDashboardForSupplier = async (req: Request, res: Response): Promise<void> => {
  const supplierId = parseInt(req.params.supplierId);

  if (isNaN(supplierId)) {
    res.status(400).json({ message: "Invalid supplier ID" });
    return;
  }

  try {
    const dashboardData = await getSupplierDashboardEvents(supplierId);
    res.status(200).json(dashboardData);
  } catch (error) {
    console.error("❌ Error getting supplier dashboard:", error);
    res.status(500).json({ message: "Failed to fetch supplier dashboard" });
  }
};