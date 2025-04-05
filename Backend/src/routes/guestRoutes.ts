import express from "express";
import {
  getAllGuests,
  getGuestById,
  createGuest,
  updateGuest,
  deleteGuest,
  bulkCreateGuests
} from "../controllers/guestController";

const router = express.Router();

router.get("/guests", getAllGuests);
router.get("/guests/:id", getGuestById);
router.post("/guests", createGuest);
router.put("/guests/:id", updateGuest);
router.delete("/guests/:id", deleteGuest);
router.post("/guests/bulk", bulkCreateGuests);

export default router;
