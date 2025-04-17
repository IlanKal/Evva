import express from "express";
import { filterSuppliersByRequestId } from "../controllers/filterSuppliersController";

const router = express.Router();

router.get("/filter-suppliers/:requestId", filterSuppliersByRequestId);

export default router;
