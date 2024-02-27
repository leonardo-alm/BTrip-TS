import { ValidationChain, body, param, validationResult } from 'express-validator';
import { Request, Response, NextFunction, RequestHandler } from 'express';
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from '../errors/customErrors';
import { TRIP_STATUS, TRIP_TYPE } from '../utils/constants';
import mongoose from 'mongoose';
import Trip from '../models/TripModel';
import User from '../models/UserModel';


const withValidationErrors = (validateValues: ValidationChain[]): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(validateValues.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages: string[] = errors.array().map((error) => error.msg);

      if (errorMessages[0].startsWith('no trip')) {
        throw new NotFoundError(errorMessages[0]);
      }
      if (errorMessages[0].startsWith('not authorized')) {
        throw new UnauthorizedError('not authorized to access this route');
      }
      throw new BadRequestError(errorMessages.join(', '));
    }

    next();
  };
};

export const validateTripInput = withValidationErrors([
  body('tripFrom').notEmpty().withMessage('location from is required'),
  body('tripTo').notEmpty().withMessage('location to is required'),
  body('tripDate').notEmpty().withMessage('trip date is required'),
  body('tripStatus')
    .isIn(Object.values(TRIP_STATUS))
    .withMessage('invalid status value'),
  body('tripType')
    .isIn(Object.values(TRIP_TYPE))
    .withMessage('invalid type value'),
]);

export const validateIdParam = withValidationErrors([
  param('id').custom(async (value, { req }) => {
    const isValidMongoId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidMongoId) throw new BadRequestError('invalid MongoDB id');
    const trip = await Trip.findById(value);
    if (!trip) throw new NotFoundError(`no trip with id ${value}`);
    const isOwner = req.currentUser.userId === trip.createdBy!.toString();

    if (!isOwner)
      throw new UnauthorizedError('not authorized to access this route');
  }),
]);

export const validateRegisterInput = withValidationErrors([
  body('name').notEmpty().withMessage('name is required'),
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('invalid email format')
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        throw new BadRequestError('email already exists');
      }
    }),
  body('password')
    .notEmpty()
    .withMessage('password is required')
    .isLength({ min: 6 })
    .withMessage('password must be at least 6 characters long'),
  body('lastName').notEmpty().withMessage('last name is required'),
]);

export const validateLoginInput = withValidationErrors([
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('invalid email format'),
  body('password').notEmpty().withMessage('password is required'),
]);

export const validateUpdateUserInput = withValidationErrors([
  body('name').notEmpty().withMessage('name is required'),
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('invalid email format')
    .custom(async (email, { req }) => {
      const user = await User.findOne({ email });
      if (user && user._id.toString() !== req.currentUser.userId) {
        throw new BadRequestError('email already exists');
      }
    }),
  body('lastName').notEmpty().withMessage('last name is required'),
]);
