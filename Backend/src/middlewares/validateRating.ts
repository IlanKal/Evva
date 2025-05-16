import { Request, Response, NextFunction } from 'express';
import Guest from '../models/Guest';

const validateRating = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { guest_id, user_id, event_id, ratings } = req.body;

    if (!event_id || !ratings || (!guest_id && !user_id)) {
      res.status(400).json({ message: 'Missing required fields.' });
      return;
    }

    if (guest_id) {
      const guest = await Guest.findByPk(guest_id);

      if (!guest) {
        res.status(404).json({ message: 'Guest not found.' });
        return;
      }

      if (guest.has_rated) {
        res.status(400).json({ message: 'Guest has already rated.' });
        return;
      }

      if (guest.rsvp !== 'APPROVED') {
        res.status(403).json({ message: 'Guest is not approved for rating.' });
        return;
      }
    }

    next();
  } catch (error) {
    console.error('Error in validateRating middleware:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

export default validateRating;
