import { Request, Response } from 'express';

import User from '@models/User';
import logger from '@utils/logger';
import { handleError, handleSuccess } from '@utils/responseHelper';

export const savePushToken = async (req: Request, res: Response) => {
  const { pushToken } = req.body;
  const userId = req.userId as string;

  logger.info('savePushToken called for userId: %s', userId);

  try {
    const user = await User.findOne({ userId });

    if (!user) {
      return handleError(res, 'User not found', 404);
    }

    user.pushToken = pushToken || user.pushToken;
    const updatedUser = await user.save();

    logger.info('Updated user with ID: %s', updatedUser._id);
    return handleSuccess(res, 'Push token saved successfully', 200, updatedUser);
  } catch (error) {
    logger.error('Error updating user: %o', error);
    return handleError(res, 'Server error', 500, error);
  }
};
