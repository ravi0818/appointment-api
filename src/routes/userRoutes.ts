import { Router } from 'express';

import { savePushToken } from '@controllers/userController';

const router = Router();

router.post('/save-push-token', savePushToken);

export default router;
