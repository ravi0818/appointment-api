import { Request, Response } from 'express';

import User from '@models/User';
import logger from '@utils/logger';

export const savePushToken = async (req: Request, res: Response) => {
  const { pushToken } = req.body;
  logger.info('savePushToken called');
  logger.info('Request userId: %s', req.userId);
  logger.info('Request body: %o', req.body);

  try {
    const user = await User.findOne({ userId: req.userId });
    const updatedUser = {
      ...user,
      pushToken: pushToken || user?.pushToken,
    };
    await User.findOneAndUpdate({ _id: req.userId }, updatedUser, {
      new: true,
    });

    logger.info('Updated user: %o', updatedUser);
    res.json({ message: 'Push token saved successfully' });
  } catch (error) {
    logger.error('Error updating user: %o', error);
    res.status(500).json({ message: 'Server error', error });
  }
};
