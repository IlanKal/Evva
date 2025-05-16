import express from "express";
import { createEventFromRequest } from "../controllers/createEventFromRequestController";

const router = express.Router();
router.post("/events/create-from-request/:requestId", createEventFromRequest);
export default router;