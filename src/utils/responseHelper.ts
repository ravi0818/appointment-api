import { Response } from 'express';

interface ErrorResponse {
  message: string;
  status: 'failed';
  data: null;
  error: string | null;
}

interface SuccessResponse<T> {
  message: string;
  status: 'success';
  data: T;
  error: null;
}

export const handleError = (res: Response, message: string, statusCode: number = 500, error: unknown = null) => {
  const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
  const response: ErrorResponse = {
    message,
    status: 'failed',
    data: null,
    error: statusCode === 500 ? errorMessage : null,
  };
  res.status(statusCode).json(response);
};

export const handleSuccess = <T>(res: Response, message: string, statusCode: number = 200, data?: T) => {
  const response: SuccessResponse<T> = {
    message,
    status: 'success',
    data: data as T,
    error: null,
  };
  res.status(statusCode).json(response);
};
