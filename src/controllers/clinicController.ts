import { Request, Response } from 'express';

import Clinic from '../models/Clinic';
import logger from '../utils/logger';
import { handleError, handleSuccess } from '../utils/responseHelper';

export const getClinic = async (req: Request, res: Response) => {
  const userId = req.userId as string;

  logger.info('getClinic called for userId: %s', userId);

  try {
    const projection = {
      _id: 0,
      name: 1,
      contacts: 1,
      address: 1,
      profilePicture: 1,
    };

    const clinic = await Clinic.findOne({ userId }, projection);

    if (!clinic) {
      logger.warn('Clinic not found for userId: %s', userId);
      return handleError(res, 'Clinic not found', 404);
    }

    return handleSuccess(res, 'Clinic details fetched successfully', 200, clinic);
  } catch (error: unknown) {
    logger.error('Error fetching clinic: %o', error);
    return handleError(res, 'Server error', 500, error);
  }
};

export const updateClinic = async (req: Request, res: Response) => {
  const userId = req.userId as string;
  const { name, contacts, profilePicture, address } = req.body;

  logger.info('updateClinic called for userId: %s', userId);

  try {
    const clinic = await Clinic.findOne({ userId });

    if (!clinic) {
      logger.warn('Clinic not found for userId: %s', userId);
      return handleError(res, 'Clinic not found', 404);
    }

    const updatedClinic = {
      name,
      address,
      contacts: {
        ...clinic.contacts,
        ...contacts,
      },
      profilePicture,
    };

    const result = await Clinic.findOneAndUpdate({ userId }, updatedClinic, { new: true });

    if (!result) {
      return handleError(res, 'Failed to update clinic', 500);
    }

    return handleSuccess(res, 'Clinic profile updated successfully', 200, result);
  } catch (error: unknown) {
    logger.error('Error updating clinic: %o', error);
    return handleError(res, 'Server error', 500, error);
  }
};
