import express from 'express';
import * as supplierController from '../controllers/supplierController';

const router = express.Router();

router.get('/suppliers/rate', supplierController.getRateableSuppliers);

export default router;