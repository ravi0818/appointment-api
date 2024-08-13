import { Request, Response } from 'express';

import Patient from '@models/Patient';
import logger from '@utils/logger';
import { handleError, handleSuccess } from '@utils/responseHelper';

export const getPatient = async (req: Request, res: Response) => {
  const userId = req.userId as string;
  logger.info('getPatient called for userId: %s', userId);

  try {
    const projection = {
      _id: 0,
      name: 1,
      contacts: 1,
      age: 1,
      gender: 1,
      address: 1,
      profilePicture: 1,
    };

    const patient = await Patient.findOne({ userId }, projection);

    if (!patient) {
      logger.warn('Patient not found for userId: %s', userId);
      return handleError(res, 'Patient not found', 404);
    }

    return handleSuccess(res, 'Patient details fetched successfully', 200, patient);
  } catch (error: unknown) {
    logger.error('Error fetching patient: %o', error);
    return handleError(res, 'Server error', 500, error);
  }
};

export const updatePatient = async (req: Request, res: Response) => {
  const { name, contacts, profilePicture, age, gender, address } = req.body;
  const userId = req.userId as string;
  logger.info('updatePatient called for userId: %s', userId);

  try {
    const patient = await Patient.findOne({ userId });

    if (!patient) {
      logger.warn('Patient not found for userId: %s', userId);
      return handleError(res, 'Patient not found', 404);
    }

    const updatedPatient = {
      name,
      age,
      gender,
      address,
      contacts: {
        ...patient.contacts,
        ...contacts,
      },
      profilePicture,
    };

    const result = await Patient.findOneAndUpdate({ userId }, updatedPatient, { new: true });

    if (!result) {
      return handleError(res, 'Failed to update patient', 500);
    }

    return handleSuccess(res, 'Profile updated successfully', 200, result);
  } catch (error: unknown) {
    logger.error('Error updating patient: %o', error);
    return handleError(res, 'Server error', 500, error);
  }
};
