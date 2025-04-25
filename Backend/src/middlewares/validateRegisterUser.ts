import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

const registerUserValidationRules = [
  body('full_name')
    .notEmpty()
    .withMessage('Full name is required'),

  body('email')
    .isEmail()
    .withMessage('A valid email is required'),

  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),

  body('phone')
    .notEmpty()
    .withMessage('Phone number is required'),
];

const validateRegisterUser = [
    ...registerUserValidationRules,
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
  
export default validateRegisterUser;
