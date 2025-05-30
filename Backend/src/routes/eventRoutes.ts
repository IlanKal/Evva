import express from "express";
import * as eventController from "../controllers/eventController";

const router = express.Router();

router.get("/events", eventController.getAllEvents);
router.get("/events/:id", eventController.getEventById);
router.get("/events/by-request/:id", eventController.getEventByRequestId);
router.post("/events", eventController.createEvent);
router.put("/events/:id", eventController.updateEvent);
router.delete("/events/:id", eventController.deleteEvent);
router.post("/events/finish", eventController.finishEvent);
router.get('/events/user/:userId', eventController.getEventsByUserId);


export default router;

