import express from 'express';
import multer from 'multer';
import { uploadGuestsFile } from '../controllers/GuestUploadController';
import { validateExcelFile } from '../middlewares/validateExcelFile';

const router = express.Router();

// Configure multer to read the file into memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

/**
 * Route: POST /api/guest-upload/:eventId
 * Description: Upload Excel with guests for specific event
 */
router.post('/upload/:eventId', upload.single('file'), validateExcelFile, uploadGuestsFile);

export default router;
