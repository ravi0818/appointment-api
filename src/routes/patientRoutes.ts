import { Router } from 'express';

import { getPatient, updatePatient } from '@controllers/patientController';

const router = Router();

router.get('/profile', getPatient);
router.post('/profile', updatePatient);

export default router;
