import { Request, Response } from 'express';
import EventConversationService from '../services/EventRequestService';
import EventRequestCrudService from '../services/EventRequestCrudService';

export const conversation = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, conversationId, answer } = req.body;

    if (!userId && !conversationId) {
      res.status(400).json({ message: 'Missing userId or conversationId.' });
      return;
    }

    const result = await EventConversationService.continueConversation({
      userId,
      conversationId,
      answer,
    });

    res.status(200).json(result);
  } catch (error) {
    console.error('Error during conversation:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getEventRequestById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const eventRequest = await EventRequestCrudService.getById(id);

    if (!eventRequest) {
      res.status(404).json({ message: 'Event request not found.' });
      return;
    }

    res.status(200).json(eventRequest);
  } catch (error) {
    console.error('Error fetching event request by ID:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getEventRequestsByUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;
    const requests = await EventRequestCrudService.getByUserId(Number(userId));
    res.status(200).json(requests);
  } catch (error) {
    console.error('Error fetching event requests by user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const deleteEventRequest = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deleted = await EventRequestCrudService.delete(id);

    if (!deleted) {
      res.status(404).json({ message: 'Event request not found.' });
      return;
    }

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting event request:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
