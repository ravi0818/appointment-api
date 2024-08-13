import { Router } from 'express';

import {
  createDoctor,
  deleteDoctor,
  getAllDoctors,
  getDoctorById,
  getDoctorsByUserId,
  updateDoctor,
} from '@controllers/doctorController';

const router = Router();

router.get('/', getDoctorsByUserId);
router.get('/all', getAllDoctors);
router.post('/', createDoctor);
router.get('/:doctorId', getDoctorById);
router.post('/:doctorId', updateDoctor);
router.delete('/:doctorId', deleteDoctor);

export default router;
