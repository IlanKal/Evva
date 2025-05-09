import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

const allowedSupplierTypes = ['catering', 'dj', 'photographer', 'speaker', 'location'];
const allowedRegions = ['North', 'Center', 'South', 'All'];
const allowedDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const registerSupplierValidationRules = [
  body('name')
    .notEmpty()
    .withMessage('Name is required'),

  body('email')
    .isEmail()
    .withMessage('A valid email is required'),

  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),

  body('available_days')
    .isArray({ min: 1 })
    .withMessage('At least one available day is required')
    .custom((days: string[]) => {
      return days.every((day) => allowedDays.includes(day));
    })
    .withMessage('Invalid day in available_days'),

  body('region')
    .isString()
    .custom((region) => allowedRegions.includes(region))
    .withMessage('Invalid region'),

  body('contact_info')
    .notEmpty()
    .withMessage('Contact info is required'),

  body('supplier_type')
    .isString()
    .custom((type) => allowedSupplierTypes.includes(type))
    .withMessage('Invalid supplier type'),
];

const validateRegisterSupplier = [
    ...registerSupplierValidationRules,
    (req: Request, res: Response, next: NextFunction): void => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({  
          message: 'Validation failed',
          errors: errors.array(),
        });
        return;
      }
      next();
    },
  ];

export default validateRegisterSupplier;
