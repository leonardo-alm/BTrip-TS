import { Router } from 'express';
import { validateTripInput, validateIdParam } from '../middleware/validationMiddleware';
import {
  getMyTrips,
  getTrip,
  createTrip,
  updateTrip,
  deleteTrip,
  showStats,
} from '../controllers/tripController';

const router = Router();

router
  .route('/')
  .get(getMyTrips)
  .post(validateTripInput, createTrip);

router.route('/stats').get(showStats);

router
  .route('/:id')
  .get(validateIdParam, getTrip)
  .patch(validateTripInput, validateIdParam, updateTrip)
  .delete(validateIdParam, deleteTrip);

export default router;
