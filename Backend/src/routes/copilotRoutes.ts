import express from "express";
import { testCopilotConnection } from "../controllers/copilotController"; // ייבוא הקונטרולר

const router = express.Router();

router.post("/test-copilot", testCopilotConnection);

export default router;
