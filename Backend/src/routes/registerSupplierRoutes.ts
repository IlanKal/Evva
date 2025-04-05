// routes/registerSupplierRoutes.ts
import express from "express";
import {
  registerPhotographer,
  registerCatering,
  registerLocation,
  registerSpeaker,
  registerDJ
} from "../controllers/registerSupplierController";

const router = express.Router();

// Photographer
router.post("/register/photographer", registerPhotographer);

// Catering
router.post("/register/catering", registerCatering);

// Location
router.post("/register/location", registerLocation);

// Speaker
router.post("/register/speaker", registerSpeaker);

// DJ
router.post("/register/dj", registerDJ);

export default router;
