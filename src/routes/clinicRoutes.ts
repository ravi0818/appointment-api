import { Router } from 'express';

import { getClinic, updateClinic } from '@controllers/clinicController';

const router = Router();

router.get('/profile', getClinic);
router.post('/profile', updateClinic);

export default router;
