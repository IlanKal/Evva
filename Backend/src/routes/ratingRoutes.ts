import express from 'express';
import { submitRatings } from '../controllers/RatingController';
import validateRating from '../middlewares/validateRating';

const router = express.Router();

router.post('/rate/multi', validateRating, submitRatings);

export default router;
