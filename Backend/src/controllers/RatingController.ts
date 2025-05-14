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
