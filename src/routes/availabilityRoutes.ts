import { Router } from 'express';

import {
  createAvailability,
  deleteAvailability,
  getDoctorAvailability,
  updateAvailability,
} from '@controllers/availabilityController';

const router = Router();

router.post('/', createAvailability);
router.get('/doctor/:doctorId', getDoctorAvailability);
router.put('/:availabilityId', updateAvailability);
router.delete('/:availabilityId', deleteAvailability);

export default router;
