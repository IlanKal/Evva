import express from "express";
import { testCopilotConnection } from "../controllers/copilotController";

const router = express.Router();

router.get("/test-copilot", testCopilotConnection);

export default router;
