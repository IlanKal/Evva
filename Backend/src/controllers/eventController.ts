// import { Request, Response } from "express";
// import { EventService } from "../services/eventService";

// const eventService = new EventService();

// export class EventController {
//   static async getAllEvents(req: Request, res: Response) {
//     try {
//       const data = await eventService.getAllEvents();
//       res.json(data);
//     } catch (error) {
//       res.status(500).json({ error: "Error fetching events" });
//     }
//   }

//   static async createEvent(req: Request, res: Response) {
//     try {
//       const { name, date, location } = req.body;
//       const event = await eventService.createEvent(name, date, location);
//       res.status(201).json(event);
//     } catch (error) {
//       res.status(500).json({ error: "Error adding event" });
//     }
//   }
// }
