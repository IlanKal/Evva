// src/routes/registerSupplierRoute.ts
import express from "express";
import { Request, Response } from "express";
import Supplier from "../models/Supplier";
import DJ from "../models/DJ";
import Photographer from "../models/Photographer";
import Speaker from "../models/Speaker";
import Catering from "../models/Catering";
import Location from "../models/Location";


// רישום ספק משולב (שתי טבלאות):
// תחילה מוסיפים את הספק הכללי לטבלת suppliers,
// לאחר מכן מוסיפים את המידע הספציפי לטבלה לפי סוג הספק (dj, photographer, וכו').
// דוגמא לJSON: {
//  "type": "dj",
//  "supplier": {
//    "name": "DJ Yahel",
//    "email": "yahel@example.com",
//    "password": "123456",
//    "available_days": "Sunday, Wednesday",
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
const router = express.Router();

router.post("/register-supplier", async (req: Request, res: Response): Promise<void> => {
  const { type, supplier, details } = req.body;

  if (!type || !supplier || !details) {
    res.status(400).json({ error: "Missing type, supplier or details" });
    return;
  }

  try {
    const newSupplier = await Supplier.create(supplier);
    const supplier_id = newSupplier.get("supplier_id");

    switch (type.toLowerCase()) {
      case "dj":
        await DJ.create({ ...details, supplier_id });
        break;
      case "photographer":
        await Photographer.create({ ...details, supplier_id });
        break;
      case "speaker":
        await Speaker.create({ ...details, supplier_id });
        break;
      case "catering":
        await Catering.create({ ...details, supplier_id });
        break;
      case "location":
        await Location.create({ ...details, supplier_id });
        break;
      default:
        res.status(400).json({ error: "Invalid supplier type" });
        return;
    }

    res.status(201).json({ message: "Supplier registered successfully" });
  } catch (error) {
    console.error("❌ Error registering supplier:", error);
    res.status(500).json({ error: "Server error during supplier registration" });
  }
});

export default router;
