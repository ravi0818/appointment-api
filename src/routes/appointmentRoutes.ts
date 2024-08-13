import { Router } from 'express';

import {
  bookAppointment,
  cancelAppointment,
  deleteAppointment,
  getDoctorAppointmentsByDate,
  getUserAppointments,
} from '@controllers/appointmentController';

const router = Router();

router.post('/', bookAppointment);
router.get('/user', getUserAppointments);
router.patch('/:appointmentId/cancel', cancelAppointment);
router.get('/doctor/:doctorId', getDoctorAppointmentsByDate);
router.delete('/:appointmentId', deleteAppointment);

export default router;
