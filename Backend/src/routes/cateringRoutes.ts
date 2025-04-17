import express from "express";
import * as cateringController from "../controllers/cateringController";

const router = express.Router();

router.get("/caterings", cateringController.getAllCaterings);
router.get("/caterings/:id", cateringController.getCateringById);
router.put("/caterings/:id", cateringController.updateCatering);
router.delete("/caterings/:id", cateringController.deleteCatering);

export default router;
