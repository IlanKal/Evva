import { Request, Response } from "express";
import { filterRelevantSuppliers } from "../services/filterSuppliersService";
import { optimizeSuppliers } from "../services/optimizeSuppliersService";
import { prepareSuppliersForOptimization } from "../services/prepareSuppliersForOptimizationService";

export const filterSuppliersByRequestId = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    console.log("🔍 controller called");
    const requestId = Number(req.params.requestId);
    if (isNaN(requestId)) {
      res.status(400).json({ error: "Invalid requestId" });
      return;
    }

    // פילטור ראשוני
    const filteredSuppliers = await filterRelevantSuppliers(requestId);
    console.log("📦 Filtered Suppliers:", JSON.stringify(filteredSuppliers, null, 2));
    //הכנת הספקים לפורמט שהאלגוריתם מבין
    const preparedSuppliers = await prepareSuppliersForOptimization(
      requestId,
      filteredSuppliers
    );
    //מציאת קומבינציה אופטימלית 
    const optimizedSuppliers = await optimizeSuppliers(
      requestId,
      preparedSuppliers
    );
    res.json(optimizedSuppliers);
  } catch (error) {
    console.error("❌ Error filtering suppliers:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
