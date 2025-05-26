import EventRequest from '../models/EventRequest';
import { EventType } from '../constants/eventTypes';

interface CreateEventRequestData {
  user_id: number;
  event_type?: EventType;
  event_date: string;
  budget: number;
  guest_count: number;
  title?: string;
  company_name?: string;
  event_start_time?: string;
  event_duration_hours?: number;
  location?: string;
  catering_preferences?: object;
  photographer_preferences?: object;
  dj_preferences?: object;
  location_preferences?: object;
  lecturer_preferences?: object;
  additional_notes?: string;
  event_id?: number;
}


class EventRequestRepository {
  
  static async create(data: CreateEventRequestData): Promise<EventRequest> {
    const eventRequest = await EventRequest.create(data);
    return eventRequest;
  }

  static async getById(requestId: string): Promise<EventRequest | null> {
    return EventRequest.findByPk(requestId);
  }

  static async update(requestId: string, data: Partial<CreateEventRequestData>): Promise<[number, EventRequest[]]> {
    return EventRequest.update(data, {
      where: { request_id: requestId },
      returning: true,
    });
  }

  static async delete(requestId: string): Promise<number> {
    return EventRequest.destroy({ where: { request_id: requestId } });
  }

  static async findByUserId(userId: number): Promise<EventRequest[]> {
    return EventRequest.findAll({ where: { user_id: userId } });
  }

}

export default EventRequestRepository;
