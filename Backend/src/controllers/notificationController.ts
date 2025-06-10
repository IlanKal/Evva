import { Request, Response } from 'express';
import * as notificationService from '../services/notificationService';

export const getNotificationsForSupplier = async (req: Request, res: Response) => {
  const supplierId = Number(req.params.supplierId);
  try {
    const notifications = await notificationService.getSupplierNotifications(supplierId);
    res.json(notifications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch supplier notifications' });
  }
};

export const getNotificationsForUser = async (req: Request, res: Response) => {
  const userId = Number(req.params.userId);
  try {
    const notifications = await notificationService.getUserNotifications(userId);
    res.json(notifications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch user notifications' });
  }
};