// רישום ספק משולב (שתי טבלאות):
// תחילה מוסיפים את הספק הכללי לטבלת suppliers,
// לאחר מכן מוסיפים את המידע הספציפי לטבלה לפי סוג הספק (dj, photographer, וכו').
// דוגמא לJSON: {
//  "type": "dj",
//  "supplier": {
//    "name": "DJ Yahel",
//    "email": "yahel@example.com",
//    "password": "123456",
//    "available_days": ["Sunday", "Wednesday"],
//    "region": "Center",
//    "rating": 5,
//    "image_url": "https://example.com/dj.jpg",
//    "additional_info": "Great vibes guaranteed!",
//    "contact_info": "050-0000000"
//  },
//  "details": {
//    "price_per_hour": 800,
//    "music_styles": "House, Techno"
//  }
//}
// src/routes/registerSupplierRoute.ts
// src/routes/registerSupplierRoute.ts
import express from "express";
import {
    registerSupplier,
    getAllSuppliers,
    getSupplierById,
    updateSupplier,
    deleteSupplier
  } from "../controllers/registerSupplierController";

const router = express.Router();

router.post("/register-supplier", registerSupplier);
router.get("/suppliers", getAllSuppliers);
router.get("/suppliers/:id", getSupplierById);
router.put("/suppliers/:id", updateSupplier);
router.delete("/suppliers/:id", deleteSupplier);

export default router;
