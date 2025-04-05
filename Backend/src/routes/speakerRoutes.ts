import express from "express";
import {
  getAllSpeakers,
  getSpeakerById,
  createSpeaker,
  updateSpeaker,
  deleteSpeaker
} from "../controllers/speakerController";

const router = express.Router();

router.get("/speakers", getAllSpeakers);
router.get("/speakers/:id", getSpeakerById);
router.post("/speakers", createSpeaker);
router.put("/speakers/:id", updateSpeaker);
router.delete("/speakers/:id", deleteSpeaker);

export default router;
