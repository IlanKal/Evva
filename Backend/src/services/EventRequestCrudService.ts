import EventRequestRepository from '../repositories/EventRequestRepository';

class EventRequestCrudService {
  static async getById(requestId: string) {
    return await EventRequestRepository.getById(requestId);
  }

  static async getByUserId(userId: number) {
    return await EventRequestRepository.findByUserId(userId);
  }

  static async delete(requestId: string) {
    const deletedCount = await EventRequestRepository.delete(requestId);
    return deletedCount > 0;
  }
}

export default EventRequestCrudService;
