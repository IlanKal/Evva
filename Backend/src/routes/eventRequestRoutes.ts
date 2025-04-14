import express from 'express';
import { conversation } from '../controllers/EventRequestController';

const router = express.Router();

router.post('/conversation', conversation); 

export default router;
