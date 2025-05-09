import { Request, Response } from 'express';
import GuestUploadService from '../services/GuestUploadService';
import RsvpStatus from '../types/RsvpStatus'; // ⬅️ שימוש בטיפוס המרכזי

export const handleRsvpResponse = async (req: Request, res: Response): Promise<void> => {
  try {
    const guestId = parseInt(req.params.guestId);
    const response = req.params.response;

    if (!['yes', 'no'].includes(response)) {
      res.status(400).send('<h3>Invalid response</h3>');
      return;
    }

    const rsvpValue: RsvpStatus = response === 'yes' ? 'APPROVED' : 'REJECTED';
    const updatedGuest = await GuestUploadService.updateRsvp(guestId, rsvpValue);

    if (!updatedGuest) {
      res.status(404).send('<h3>Guest not found</h3>');
      return;
    }

    res.send(`
      <div style="font-family: Arial, sans-serif; padding: 40px; text-align: center;">
        <h2>Thank you, ${updatedGuest.full_name}!</h2>
        <p>Your response has been recorded as:</p>
        <p style="font-size: 20px; font-weight: bold; color: ${rsvpValue === 'APPROVED' ? '#4CAF50' : '#f44336'};">
          ${rsvpValue === 'APPROVED' ? 'I will attend' : 'I won\'t attend'}
        </p>
      </div>
    `);
  } catch (error) {
    console.error('RSVP error:', error);
    res.status(500).send('<h3>Internal server error</h3>');
  }
};
