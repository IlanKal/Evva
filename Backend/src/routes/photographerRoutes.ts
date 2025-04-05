import express from "express";
import {
  getAllPhotographers,
  getPhotographerById,
  createPhotographer,
  updatePhotographer,
  deletePhotographer,
} from "../controllers/photographerController";

const router = express.Router();

router.get("/photographers", getAllPhotographers);
router.get("/photographers/:id", getPhotographerById);
router.post("/photographers", createPhotographer);
router.put("/photographers/:id", updatePhotographer);
router.delete("/photographers/:id", deletePhotographer);

export default router;
