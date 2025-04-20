import express from "express";
import * as locationController from "../controllers/locationController";

const router = express.Router();

router.get("/locations", locationController.getAllLocations);
router.get("/locations/:id", locationController.getLocationById);
router.put("/locations/:id", locationController.updateLocation);
router.delete("/locations/:id", locationController.deleteLocation);

export default router;
