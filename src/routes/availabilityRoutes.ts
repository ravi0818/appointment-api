import { Router } from 'express';

import {
  createAvailability,
  deleteAvailability,
  getDoctorAvailability,
  getRemainingSlots,
  updateAvailability,
} from '@controllers/availabilityController';

const router = Router();

router.post('/', createAvailability);
router.get('/doctor/:doctorId', getDoctorAvailability);
router.put('/:availabilityId', updateAvailability);
router.delete('/:availabilityId', deleteAvailability);
router.get('/slots', getRemainingSlots);

export default router;
