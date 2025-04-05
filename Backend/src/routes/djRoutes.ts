import express from "express";
import {
  getAllDJs,
  getDJById,
  createDJ,
  updateDJ,
  deleteDJ
} from "../controllers/djController";

const router = express.Router();

router.get("/djs", getAllDJs);
router.get("/djs/:id", getDJById);
router.post("/djs", createDJ);
router.put("/djs/:id", updateDJ);
router.delete("/djs/:id", deleteDJ);

export default router;
