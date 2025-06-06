import express from "express";
import * as eventSupplierController from "../controllers/eventSupplierController";

const router = express.Router();

router.post("/event-suppliers", eventSupplierController.addSupplierToEvent);
router.delete("/event-suppliers", eventSupplierController.removeSupplierFromEvent);
router.get("/event-suppliers/:eventId", eventSupplierController.getSuppliersByEvent);
router.post("/event-suppliers/choose", eventSupplierController.chooseSupplier);// לקוח בוחר ספק מסוים
router.post("/event-suppliers/confirm", eventSupplierController.confirmSupplier);// ספק מאשר את העבודה מול לקוח 
router.post("/event-suppliers/decline", eventSupplierController.declineSupplier);//הספק דחה את העבודה מול הלקוח 
router.get("/status/:event_id", eventSupplierController.getSupplierStatusByEvent);
router.get("/:supplierId/dashboard", eventSupplierController.getDashboardForSupplier); //הצגת אירועי הספק 

export default router;
