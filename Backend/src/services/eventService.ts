// import { EventRepository } from "../repositories/eventRepository";
// import { copilotAPI } from "../config/copilot";

// export class EventService {
//   private eventRepo = new EventRepository();

//   async getAllEvents() {
//     const events = await this.eventRepo.getAllEvents();
//     const insights = await this.analyzeEventsWithCopilot(events);
//     return { events, insights };
//   }

//   async createEvent(name: string, date: string, location: string) {
//     return await this.eventRepo.createEvent({ name, date, location });
//   }

//   private async analyzeEventsWithCopilot(events: any[]) {
//     try {
//       const response = await copilotAPI.post("/generate", {
//         prompt: `Analyze these business events: ${JSON.stringify(events)}`,
//       });
//       return response.data;
//     } catch (error) {
//       console.error("Copilot API Error:", error);
//       return { error: "Analysis failed" };
//     }
//   }
// }
