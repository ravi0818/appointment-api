import { Request, Response } from 'express';

import Appointment from '@models/Appointment';
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

export const getRemainingSlots = async (req: Request, res: Response) => {
  const { availabilityId, date: dateString } = req.query;
  logger.info('getRemainingSlots called');

  try {
    const [day, month, year] = (dateString as string).split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));

    // Check if the date is valid
    if (isNaN(date.getTime())) {
      return handleError(res, 'Invalid date format', 400);
    }

    // Find the availability slot by ID
    const slot = await Availability.findById(availabilityId);
    if (!slot) {
      return handleError(res, 'Availability slot not found', 404);
    }

    // Count the number of booked appointments for the given availability and date
    const bookedAppointmentsCount = await Appointment.countDocuments({
      availabilityId,
      date,
      status: 'booked',
    });

    // Calculate the remaining slots
    const remainingSlots = slot.maxAppointments - bookedAppointmentsCount;

    logger.info('Remaining slots: %d', remainingSlots);
    return handleSuccess(res, 'Remaining slots retrieved successfully', 200, {
      totalSlots: slot.maxAppointments,
      remainingSlots,
    });
  } catch (error: unknown) {
    logger.error('Error retrieving remaining slots: %o', error);
    return handleError(res, 'Server error', 500, error);
  }
};
