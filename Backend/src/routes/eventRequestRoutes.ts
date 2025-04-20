import express from 'express';
import { 
  conversation, 
  getEventRequestById,
  getEventRequestsByUser,
  deleteEventRequest
} from '../controllers/EventRequestController';

const router = express.Router();

router.post('/conversation', conversation); 
router.get('/event-request/:id', getEventRequestById);
router.get('/event-request/user/:userId', getEventRequestsByUser);
router.delete('/event-request/:id', deleteEventRequest);

export default router;
