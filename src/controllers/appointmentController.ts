import { Request, Response } from 'express';

import Appointment from '@models/Appointment';
import Availability from '@models/Availability';
import logger from '@utils/logger';
import { handleError, handleSuccess } from '@utils/responseHelper';

export const bookAppointment = async (req: Request, res: Response) => {
  const userId = req.userId;
  const { availabilityId, date } = req.body;
  logger.info('bookAppointment called');

  try {
    const slot = await Availability.findById(availabilityId);
    if (!slot) {
      return handleError(res, 'Availability slot not found', 404);
    }

    const appointmentCount = await Appointment.countDocuments({
      availabilityId,
      date,
      status: 'booked',
    });

    if (appointmentCount >= slot.maxAppointments) {
      return handleError(res, 'Slot is fully booked', 400);
    }

    const appointment = new Appointment({
      doctorId: slot.doctorId,
      userId,
      availabilityId,
      date,
      status: 'booked',
    });
    await appointment.save();

    logger.info('Appointment booked: %o', appointment);
    return handleSuccess(res, 'Appointment booked successfully', 201, appointment);
  } catch (error: unknown) {
    logger.error('Error booking appointment: %o', error);
    return handleError(res, 'Server error', 500, error);
  }
};

export const getUserAppointments = async (req: Request, res: Response) => {
  const userId = req.userId;
  logger.info('getUserAppointments called');

  try {
    const appointments = await Appointment.find({ userId });
    return handleSuccess(res, 'Appointments fetched successfully', 200, appointments);
  } catch (error: unknown) {
    logger.error('Error fetching appointments: %o', error);
    return handleError(res, 'Server error', 500, error);
  }
};

export const cancelAppointment = async (req: Request, res: Response) => {
  const { appointmentId } = req.params;
  logger.info('cancelAppointment called');

  try {
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return handleError(res, 'Appointment not found', 404);
    }

    appointment.status = 'cancelled';
    await appointment.save();

    logger.info('Appointment cancelled: %o', appointment);
    return handleSuccess(res, 'Appointment cancelled successfully', 200, appointment);
  } catch (error: unknown) {
    logger.error('Error cancelling appointment: %o', error);
    return handleError(res, 'Server error', 500, error);
  }
};

export const getDoctorAppointmentsByDate = async (req: Request, res: Response) => {
  const { doctorId } = req.params;
  const { date } = req.query;
  logger.info('getDoctorAppointmentsByDate called');

  try {
    const appointments = await Appointment.find({ doctorId, date });
    return handleSuccess(res, 'Appointments fetched successfully', 200, appointments);
  } catch (error: unknown) {
    logger.error('Error fetching appointments: %o', error);
    return handleError(res, 'Server error', 500, error);
  }
};

export const deleteAppointment = async (req: Request, res: Response) => {
  const { appointmentId } = req.params;
  logger.info('deleteAppointment called');

  try {
    const deletedAppointment = await Appointment.findByIdAndDelete(appointmentId);
    if (!deletedAppointment) {
      return handleError(res, 'Appointment not found', 404);
    }

    logger.info('Appointment deleted: %o', deletedAppointment);
    return handleSuccess(res, 'Appointment deleted successfully', 200);
  } catch (error: unknown) {
    logger.error('Error deleting appointment: %o', error);
    return handleError(res, 'Server error', 500, error);
  }
};
