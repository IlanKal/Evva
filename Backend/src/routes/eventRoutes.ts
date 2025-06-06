import express from "express";
import * as eventController from "../controllers/eventController";


const router = express.Router();

router.get("/events", eventController.getAllEvents);
router.get("/events/:id", eventController.getEventById);
router.post("/events", eventController.createEvent);
router.put("/events/:id", eventController.updateEvent);
router.delete("/events/:id", eventController.deleteEvent);
router.post("/events/finish", eventController.finishEvent);

export default router;
