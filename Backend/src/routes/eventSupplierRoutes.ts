import express from "express";
import {
  addSupplierToEvent,
  removeSupplierFromEvent,
  getSuppliersByEvent
} from "../controllers/eventSupplierController";

const router = express.Router();

router.post("/event-suppliers", addSupplierToEvent);
router.delete("/event-suppliers", removeSupplierFromEvent);
router.get("/event-suppliers/:eventId", getSuppliersByEvent);

export default router;
