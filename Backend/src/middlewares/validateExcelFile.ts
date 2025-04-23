import { Request, Response, NextFunction } from 'express';

export function validateExcelFile(req: Request, res: Response, next: NextFunction): void {
  const file = req.file;

  if (!file) {
    res.status(400).json({ message: 'No file uploaded.' });
    return;
  }

  if (!file.originalname.toLowerCase().endsWith('.xlsx')) {
    res.status(400).json({ message: 'Only .xlsx Excel files are allowed.' });
    return;
  }

  next();
}
