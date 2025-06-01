import express from 'express';
import { submitRatings, hasGuestRated } from '../controllers/RatingController';
import validateRating from '../middlewares/validateRating';

const router = express.Router();

router.post('/rate/multi', validateRating, submitRatings);
router.get('/rate/has-rated', hasGuestRated);

export default router;
