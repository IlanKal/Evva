import express from "express";
import * as djController from "../controllers/djController";

const router = express.Router();

router.get("/djs", djController.getAllDJs);
router.get("/djs/:id", djController.getDJById);
router.put("/djs/:id", djController.updateDJ);
router.delete("/djs/:id", djController.deleteDJ);

export default router;
