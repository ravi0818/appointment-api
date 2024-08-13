import { Router } from 'express';

import verifyToken from '@middlewares/authMiddleware';

import appointmentRoutes from './appointmentRoutes';
import authRoutes from './authRoutes';
import availabilityRoutes from './availabilityRoutes';
import clinicRoutes from './clinicRoutes';
import doctorRoutes from './doctorRoutes';
import patientRoutes from './patientRoutes';
import userRoutes from './userRoutes';

const router = Router();

router.use('/auth', authRoutes);

router.use(verifyToken);
router.use('/user', userRoutes);
router.use('/patient', patientRoutes);
router.use('/clinic', clinicRoutes);
router.use('/doctor', doctorRoutes);
router.use('/appointment', appointmentRoutes);
router.use('/availability', availabilityRoutes);

export default router;
