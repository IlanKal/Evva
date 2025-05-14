import { Request, Response } from 'express';
import * as supplierService from '../services/supplierService';

export const getRateableSuppliers = async (req: Request, res: Response): Promise<void> => {
    try {
      const { type, id, event_id } = req.query;
  
      if (
        !type || !id || !event_id ||
        (type !== 'user' && type !== 'guest')
      ) {
        res.status(400).json({ error: 'Missing or invalid query parameters.' });
        return;
      }
  
      const suppliers = await supplierService.getRateableSuppliers({
        type,
        id: Number(id),
        eventId: Number(event_id),
      });
  
      res.json({ suppliers });
    } catch (error) {
      console.error('Error in getRateableSuppliers:', error);
      res.status(500).json({ error: 'Failed to load suppliers.' });
    }
  };
  