import { Request, Response } from 'express';

import Availability from '@models/Availability';
import logger from '@utils/logger';
import { handleError, handleSuccess } from '@utils/responseHelper';

export const createAvailability = async (req: Request, res: Response) => {
  const { doctorId, day, startTime, endTime, maxAppointments } = req.body;

  logger.info('Creating availability for doctorId: %s', doctorId);

  try {
    const availability = new Availability({
      doctorId,
      day,
      startTime,
      endTime,
      maxAppointments,
    });

    const savedAvailability = await availability.save();
    return handleSuccess(res, 'Availability created successfully', 201, savedAvailability);
  } catch (error: unknown) {
    logger.error('Error creating availability: %o', error);
    return handleError(res, 'Error creating availability', 500, error);
  }
};

export const getDoctorAvailability = async (req: Request, res: Response) => {
  const { doctorId } = req.params;

  logger.info('Fetching availability for doctorId: %s', doctorId);

  try {
    const availability = await Availability.find({ doctorId });

    if (!availability.length) {
      return handleError(res, 'No availability found', 404);
    }

    return handleSuccess(res, 'Availability fetched successfully', 200, availability);
  } catch (error: unknown) {
    logger.error('Error fetching availability: %o', error);
    return handleError(res, 'Error fetching availability', 500, error);
  }
};

export const updateAvailability = async (req: Request, res: Response) => {
  const { availabilityId } = req.params;
  const updateData = req.body;

  logger.info('Updating availability with ID: %s', availabilityId);

  try {
    const updatedAvailability = await Availability.findByIdAndUpdate(availabilityId, updateData, { new: true });

    if (!updatedAvailability) {
      return handleError(res, 'Availability not found', 404);
    }

    return handleSuccess(res, 'Availability updated successfully', 200, updatedAvailability);
  } catch (error: unknown) {
    logger.error('Error updating availability: %o', error);
    return handleError(res, 'Error updating availability', 500, error);
  }
};

export const deleteAvailability = async (req: Request, res: Response) => {
  const { availabilityId } = req.params;

  logger.info('Deleting availability with ID: %s', availabilityId);

  try {
    const deletedAvailability = await Availability.findByIdAndDelete(availabilityId);

    if (!deletedAvailability) {
      return handleError(res, 'Availability not found', 404);
    }

    return handleSuccess(res, 'Availability deleted successfully', 200);
  } catch (error: unknown) {
    logger.error('Error deleting availability: %o', error);
    return handleError(res, 'Error deleting availability', 500, error);
  }
};
