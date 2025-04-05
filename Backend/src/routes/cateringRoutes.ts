import express from "express";
import {
  getAllCatering,
  getCateringById,
  createCatering,
  updateCatering,
  deleteCatering
} from "../controllers/cateringController";

const router = express.Router();

router.get("/catering", getAllCatering);
router.get("/catering/:id", getCateringById);
router.post("/catering", createCatering);
router.put("/catering/:id", updateCatering);
router.delete("/catering/:id", deleteCatering);

export default router;
