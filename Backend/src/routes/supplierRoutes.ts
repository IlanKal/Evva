import express from 'express';
import * as supplierController from '../controllers/supplierController';

const router = express.Router();

router.get('/suppliers/rate', supplierController.getRateableSuppliers);
router.get('/suppliers/:id', supplierController.getSupplierById);
router.put('/suppliers/:id', supplierController.updateSupplier);


export default router;