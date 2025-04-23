import { Request, Response } from 'express';
import { parseExcelToGuests } from '../utils/excelParser';
import GuestUploadService  from '../services/GuestUploadService';

interface FileRequest extends Request {
  file?: Express.Multer.File;
}

export const uploadGuestsFile = async (req: FileRequest, res: Response): Promise<void> => {
  try {
    const { eventId } = req.params;

    if (!req.file) {
      res.status(400).json({ message: 'No file uploaded.' });
      return;
    }

    const guests = parseExcelToGuests(req.file.buffer);

    if (!guests.length) {
      res.status(400).json({ message: 'No valid guest entries found in the file.' });
      return;
    }

    const createdGuests = await GuestUploadService .createGuestsAndSendEmails(guests, parseInt(eventId));

    res.status(201).json({ message: 'Guests uploaded and emails sent successfully.', data: createdGuests });
  } catch (error) {
    console.error('Error uploading guests file:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};
