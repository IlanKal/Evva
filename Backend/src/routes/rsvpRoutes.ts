import express from 'express';
import { handleRsvpResponse } from '../controllers/RsvpController';

const router = express.Router();

/**
 * Route: GET /rsvp/:guestId/:response
 * Description: Handle RSVP link clicks (yes/no)
 */
router.get('/:guestId/:response', handleRsvpResponse);

export default router;
