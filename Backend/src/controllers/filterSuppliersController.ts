import { Request, Response } from "express";
import { filterRelevantSuppliers } from "../services/filterSupplierService";

export const filterSuppliersByRequestId = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const requestId = Number(req.params.requestId);
    if (isNaN(requestId)) {
      res.status(400).json({ error: "Invalid requestId" });
      return;
    }

    const filteredSuppliers = await filterRelevantSuppliers(requestId);
    res.json(filteredSuppliers);
  } catch (error) {
    console.error("❌ Error filtering suppliers:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
