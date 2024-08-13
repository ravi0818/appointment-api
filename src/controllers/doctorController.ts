import { Request, Response } from 'express';

import Doctor from '@models/Doctor';
import logger from '@utils/logger';
import { handleError, handleSuccess } from '@utils/responseHelper';

export const createDoctor = async (req: Request, res: Response) => {
  const { name, gender, description, specialization } = req.body;
  const userId = req.userId as string;

  logger.info('Creating new doctor for userId: %s', userId);

  try {
    const newDoctor = {
      userId,
      name,
      gender,
      description,
      specialization,
    };

    const savedDoctor = await Doctor.create(newDoctor);

    logger.info('Doctor created with ID: %s', savedDoctor._id);
    return handleSuccess(res, 'Doctor created successfully', 201, savedDoctor);
  } catch (error: unknown) {
    logger.error('Error creating doctor: %o', error);
    return handleError(res, 'Server error', 500, error);
  }
};

export const getDoctorsByUserId = async (req: Request, res: Response) => {
  const userId = req.userId as string;

  logger.info('Fetching doctors for userId: %s', userId);

  try {
    const doctors = await Doctor.find({ userId });

    if (!doctors.length) {
      return handleError(res, 'No doctors found for this user', 404);
    }

    return handleSuccess(res, 'Doctors fetched successfully', 200, doctors);
  } catch (error: unknown) {
    logger.error('Error fetching doctors: %o', error);
    return handleError(res, 'Server error', 500, error);
  }
};

export const updateDoctor = async (req: Request, res: Response) => {
  const { doctorId } = req.params;
  const { name, gender, description, specialization } = req.body;

  logger.info('Updating doctor with ID: %s', doctorId);

  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      doctorId,
      { name, gender, description, specialization },
      { new: true }
    );

    if (!updatedDoctor) {
      return handleError(res, 'Doctor not found', 404);
    }

    return handleSuccess(res, 'Doctor updated successfully', 200, updatedDoctor);
  } catch (error: unknown) {
    logger.error('Error updating doctor: %o', error);
    return handleError(res, 'Server error', 500, error);
  }
};

export const deleteDoctor = async (req: Request, res: Response) => {
  const { doctorId } = req.params;

  logger.info('Deleting doctor with ID: %s', doctorId);

  try {
    const deletedDoctor = await Doctor.findByIdAndDelete(doctorId);

    if (!deletedDoctor) {
      return handleError(res, 'Doctor not found', 404);
    }

    return handleSuccess(res, 'Doctor deleted successfully', 200);
  } catch (error: unknown) {
    logger.error('Error deleting doctor: %o', error);
    return handleError(res, 'Server error', 500, error);
  }
};

export const getAllDoctors = async (req: Request, res: Response) => {
  logger.info('Fetching all doctors');

  try {
    const doctors = await Doctor.find();
    return handleSuccess(res, 'Doctors fetched successfully', 200, doctors);
  } catch (error: unknown) {
    logger.error('Error fetching doctors: %o', error);
    return handleError(res, 'Server error', 500, error);
  }
};

export const getDoctorById = async (req: Request, res: Response) => {
  const { doctorId } = req.params;

  logger.info('Fetching doctor with ID: %s', doctorId);

  try {
    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      logger.warn('Doctor with ID %s not found', doctorId);
      return handleError(res, 'Doctor not found', 404);
    }

    return handleSuccess(res, 'Doctor fetched successfully', 200, doctor);
  } catch (error: unknown) {
    logger.error('Error fetching doctor by ID %s: %o', doctorId, error);
    return handleError(res, 'Server error', 500, error);
  }
};
