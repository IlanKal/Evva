import express from "express";
import * as photographerController from "../controllers/photographerController";

const router = express.Router();

router.get("/photographers", photographerController.getAllPhotographers);
router.get("/photographers/:id", photographerController.getPhotographerById);
router.put("/photographers/:id", photographerController.updatePhotographer);
router.delete("/photographers/:id", photographerController.deletePhotographer);

export default router;
