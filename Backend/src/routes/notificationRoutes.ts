import express from 'express';
import * as notificationController from '../controllers/notificationController';

const router = express.Router();

router.get('/notifications/supplier/:supplierId', notificationController.getNotificationsForSupplier);
router.get('/notifications/user/:userId', notificationController.getNotificationsForUser);

export default router;
