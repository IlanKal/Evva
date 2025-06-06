import { Request, Response } from 'express';
import RatingService from '../services/RatingService';

export const submitRatings = async (req: Request, res: Response): Promise<void> => {
  try {
    const { guest_id, user_id, event_id, ratings } = req.body;

    // Validation (למקרה שלא תפס כבר ב-Middleware)
    if (!event_id || !ratings || (!guest_id && !user_id)) {
      res.status(400).json({ message: 'Missing required fields.' });
      return;
    }

    // שלח לדילוג העסקי
    await RatingService.processRatings({ guest_id, user_id, event_id, ratings });

    res.status(200).json({ message: 'Ratings submitted successfully.' });
  } catch (error) {
    console.error('Error submitting ratings:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

export const hasGuestRated = async (req: Request, res: Response): Promise<void> => {
  try {
    const guestId = Number(req.query.guest_id);
    const eventId = Number(req.query.event_id);

    if (!guestId || !eventId) {
      res.status(400).json({ message: 'Missing parameters' });
      return;
    }

    const hasRated = await RatingService.checkIfGuestRated(guestId, eventId);
    res.status(200).json(hasRated);
  } catch (error) {
    console.error('Error in hasGuestRated controller:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

