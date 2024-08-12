import { Request, Response } from 'express';

import Clinic from '../models/Clinic';
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
    const clinic = await Clinic.findOne({ userId: req.userId }, projection);
    logger.info('Clinic found: %o', clinic);

    if (!clinic) {
      logger.warn('Clinic not found for userId: %s', req.userId);
      return res.status(404).json({ message: 'Clinic not found' });
    }

    res.json(clinic);
  } catch (error) {
    logger.error('Error fetching clinic: %o', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

export const updateClinic = async (req: Request, res: Response) => {
  const { name, contacts, profilePicture, address } = req.body;
  logger.info('updateClinic called');
  logger.info('Request userId: %s', req.userId);
  logger.info('Request body: %o', req.body);

  try {
    const clinic = await Clinic.findOne({ userId: req.userId });
    const updatedClinic = {
      name,
      address,
      contacts: {
        ...clinic?.contacts,
        ...contacts,
      },
      profilePicture,
    };
    await Clinic.findOneAndUpdate({ userId: req.userId }, updatedClinic, {
      new: true,
    });

    logger.info('Updated clinic: %o', updatedClinic);
    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    logger.error('Error updating clinic: %o', error);
    res.status(500).json({ message: 'Server error', error });
  }
};
