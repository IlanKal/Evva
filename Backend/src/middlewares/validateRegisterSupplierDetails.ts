import { Request, Response, NextFunction } from 'express';
import { body, validationResult, ValidationChain } from 'express-validator';

const validateCommonFields: ValidationChain[] = [
  body('supplier_id')
    .isInt({ gt: 0 })
    .withMessage('supplier_id must be a positive integer'),

  body('supplier_type')
    .isIn(['catering', 'dj', 'photographer', 'speaker', 'location'])
    .withMessage('Invalid supplier_type'),

  body('details')
    .isObject()
    .withMessage('details must be provided as an object'),
];

function handleValidationErrors(req: Request, res: Response, next: NextFunction): void {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ message: 'Validation failed', errors: errors.array() });
    return;
  }
  next();
}

function validateDetailsByType(req: Request, res: Response, next: NextFunction): void {
  const { supplier_type, details } = req.body;
  const detailErrors: { msg: string; param: string }[] = [];

  switch (supplier_type) {
    case 'catering':
      if (typeof details.price_per_person !== 'number')
        detailErrors.push({ msg: 'price_per_person must be a number', param: 'price_per_person' });
      break;

    case 'dj':
      if (!Array.isArray(details.music_styles))
        detailErrors.push({ msg: 'music_styles must be an array of strings', param: 'music_styles' });
      break;

    case 'photographer':
      ['has_magnets', 'has_stills', 'has_video'].forEach((field) => {
        if (typeof details[field] !== 'boolean') {
          detailErrors.push({ msg: `${field} must be a boolean`, param: field });
        }
      });
      break;

    case 'speaker':
      if (typeof details.price_per_lecture !== 'number')
        detailErrors.push({ msg: 'price_per_lecture must be a number', param: 'price_per_lecture' });
      if (typeof details.lecture_duration !== 'number')
        detailErrors.push({ msg: 'lecture_duration must be a number', param: 'lecture_duration' });
      if (typeof details.lecture_field !== 'string')
        detailErrors.push({ msg: 'lecture_field must be a string', param: 'lecture_field' });
      break;

    case 'location':
      if (typeof details.capacity !== 'number')
        detailErrors.push({ msg: 'capacity must be a number', param: 'capacity' });
      if (typeof details.price !== 'number')
        detailErrors.push({ msg: 'price must be a number', param: 'price' });
      break;
  }

  if (detailErrors.length > 0) {
    res.status(400).json({ message: 'Validation failed', errors: detailErrors });
    return;
  }

  next();
}
const validateRegisterSupplierDetails = [
  ...validateCommonFields,
  handleValidationErrors,
  validateDetailsByType,
];

export default validateRegisterSupplierDetails;
