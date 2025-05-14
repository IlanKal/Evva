import { Request, Response } from "express";
import { EventRequest, Event } from "../models";
import { filterRelevantSuppliers } from "../services/filterSuppliersService";
import { prepareSuppliersForOptimization } from "../services/prepareSuppliersForOptimizationService";
import { optimizeSuppliers } from "../services/optimizeSuppliersService";

export const createEventFromRequest = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const requestId = Number(req.params.requestId);
    if (isNaN(requestId)) {
      res.status(400).json({ error: "Invalid requestId" });
      return;
    }

    // 1. שליפת בקשת האירוע
    const request = await EventRequest.findByPk(requestId);
    if (!request) {
      res.status(404).json({ error: "Event request not found" });
      return;
    }

    // 2. יצירת האירוע בפועל
    const newEvent = await Event.create({
      user_id: request.user_id,
      event_date: request.event_date,
      guest_count: request.guest_count,
      budget: request.budget,
      location: request.location,
      event_request_id: request.request_id,
    });

    // 3. עדכון בקשת האירוע עם ID
    await request.update({ event_id: newEvent.event_id });

    // 4. פילטור + הכנה לאופטימיזציה
    const filteredSuppliers = await filterRelevantSuppliers(requestId);
    const preparedSuppliers = await prepareSuppliersForOptimization(requestId, filteredSuppliers);

    // 5. אופטימיזציה
    const { best_combination, alternatives } = await optimizeSuppliers(requestId, preparedSuppliers);

    // 7. שליחת תשובה לפרונט
    res.status(201).json({
      message: "Event created successfully",
      event_id: newEvent.event_id,
      suppliers: {
        best_combination,
        alternatives,
      },
    });
  } catch (error) {
    console.error("❌ Error creating event from request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
