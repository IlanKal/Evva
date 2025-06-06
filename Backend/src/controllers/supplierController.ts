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

  export const getSupplierById = async (req: Request, res: Response): Promise<void> => {
    try {
      const supplierIdStr = req.params.id.trim();
  
      const supplierId = Number(supplierIdStr);
      if (isNaN(supplierId)) {
        res.status(400).json({ error: 'Invalid supplier ID' });
        return;
      }
  
      const supplier = await supplierService.getSupplierById(supplierId);
      if (!supplier) {
        res.status(404).json({ error: 'Supplier not found' });
        return;
      }
  
      res.json(supplier);
    } catch (error) {
      console.error('Error in getSupplierById:', error);
      res.status(500).json({ error: 'Failed to fetch supplier data' });
    }
  };
  
  export const updateSupplier = async (req: Request, res: Response): Promise<void> => {
    try {
      const updated = await supplierService.updateSupplier(req.params.id.trim(), req.body);
      if (!updated) {
        res.status(404).json({ error: 'Supplier not found' });
        return;
      }
      res.json({ message: 'Supplier updated successfully' });
    } catch (error) {
      console.error('Error in updateSupplier:', error);
      res.status(500).json({ error: 'Failed to update supplier' });
    }
  };
  
  