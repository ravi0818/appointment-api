import { Request, Response } from 'express';

import Patient from '../models/Patient';
import logger from '../utils/logger';

export const getClinic = async (req: Request, res: Response) => {
  logger.info('getClinic called');
  logger.info('Request userId: %s', req.userId);

  try {
    const projection = {
      _id: 0,
      name: 1,
      contacts: 1,
      address: 1,
      profilePicture: 1,
    };
    const patient = await Patient.findOne({ userId: req.userId }, projection);
    logger.info('Patient found: %o', patient);

    if (!patient) {
      logger.warn('Patient not found for userId: %s', req.userId);
      return res.status(404).json({ message: 'Patient not found' });
    }

    res.json(patient);
  } catch (error) {
    logger.error('Error fetching patient: %o', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

export const updateClinic = async (req: Request, res: Response) => {
  const { name, contacts, profilePicture, age, gender, address } = req.body;
  logger.info('updateClinic called');
  logger.info('Request userId: %s', req.userId);
  logger.info('Request body: %o', req.body);

  try {
    const patient = await Patient.findOne({ userId: req.userId });
    const updatedPatient = {
      name,
      age,
      gender,
      address,
      contacts: {
        ...patient?.contacts,
        ...contacts,
      },
    };
    await Patient.findOneAndUpdate({ userId: req.userId }, updatedPatient, {
      new: true,
    });

    logger.info('Updated patient: %o', updatedPatient);
    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    logger.error('Error updating patient: %o', error);
    res.status(500).json({ message: 'Server error', error });
  }
};
