import express from "express";
import * as speakerController from "../controllers/speakerController";

const router = express.Router();

router.get("/speakers", speakerController.getAllSpeakers);
router.get("/speakers/:id", speakerController.getSpeakerById);
router.put("/speakers/:id", speakerController.updateSpeaker);
router.delete("/speakers/:id", speakerController.deleteSpeaker);

export default router;
