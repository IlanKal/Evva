import EventRequestRepository from '../repositories/EventRequestRepository';

class EventRequestCrudService {
  static async getById(requestId: string) {
    return await EventRequestRepository.getById(requestId);
  }

  static async getByUserId(userId: number) {
    return await EventRequestRepository.findByUserId(userId);
  }
  
  static async update(requestId: string, data: any) {
    const [count, [updatedRequest]] = await EventRequestRepository.update(requestId, data);
    if (count === 0) return null;
    return updatedRequest;
  }

  static async delete(requestId: string) {
    const deletedCount = await EventRequestRepository.delete(requestId);
    return deletedCount > 0;
  }
}

export default EventRequestCrudService;
