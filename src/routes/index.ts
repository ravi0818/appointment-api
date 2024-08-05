import { Router } from 'express';

import verifyToken from '@middlewares/authMiddleware';

import authRoutes from './authRoutes';
import clinicRoutes from './clinicRoutes';
import patientRoutes from './patientRoutes';

const router = Router();

router.use('/auth', authRoutes);

router.use(verifyToken);
router.use('/patient', patientRoutes);
router.use('/clinic', clinicRoutes);

export default router;
