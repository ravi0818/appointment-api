import { Request, Response } from 'express';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import Clinic from '@models/Clinic';
import Patient from '@models/Patient';
import User from '@models/User';
import logger from '@utils/logger';
import { handleError, handleSuccess } from '@utils/responseHelper';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const registerUser = async (req: Request, res: Response) => {
  const { email, password, role, pushToken } = req.body;

  logger.info('Registering user: %s', email);

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      logger.warn('Email already in use: %s', email);
      return handleError(res, 'Email already in use', 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      email,
      password: hashedPassword,
      role,
      pushToken,
    };

    const user = await User.create(newUser);
    logger.info('User created: %s', user._id);

    if (user.role === 'Clinic') {
      await Clinic.create({ userId: user._id, 'contacts.email': user.email });
      logger.info('Clinic record created for user: %s', user._id);
    } else {
      await Patient.create({ userId: user._id, 'contacts.email': user.email });
      logger.info('Patient record created for user: %s', user._id);
    }

    return handleSuccess(res, 'User registered successfully', 201);
  } catch (error: unknown) {
    logger.error('Error registering user: %o', error);
    return handleError(res, 'Server error', 500, error);
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  logger.info('Logging in user: %s', email);

  try {
    const user = await User.findOne({ email });
    if (!user) {
      logger.warn('Invalid email or password for email: %s', email);
      return handleError(res, 'Invalid email or password', 400);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      logger.warn('Invalid email or password for email: %s', email);
      return handleError(res, 'Invalid email or password', 400);
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role, pushToken: user.pushToken },
      JWT_SECRET,
      { expiresIn: '8h' }
    );
    logger.info('JWT token generated for user: %s', user._id);

    return handleSuccess(res, 'Login successful', 200, { token });
  } catch (error: unknown) {
    logger.error('Error logging in user: %o', error);
    return handleError(res, 'Server error', 500, error);
  }
};
