import { Request, Response } from "express";
import Patient from "../models/Patient";
import logger from "../utils/logger";

export const getPatient = async (req: Request, res: Response) => {
  logger.info("getPatient called");
  logger.info("Request userId: %s", req.userId);

  try {
    const patient = await Patient.findOne({ userId: req.userId }).populate(
      "userId"
    );
    logger.info("Patient found: %o", patient);

    if (!patient) {
      logger.warn("Patient not found for userId: %s", req.userId);
      return res.status(404).json({ message: "Patient not found" });
    }

    res.json(patient);
  } catch (error) {
    logger.error("Error fetching patient: %o", error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const updatePatient = async (req: Request, res: Response) => {
  const { name, contacts, profilePicture } = req.body;
  logger.info("updatePatient called");
  logger.info("Request userId: %s", req.userId);
  logger.info("Request body: %o", req.body);

  try {
    const updatedPatient = await Patient.findOneAndUpdate(
      { userId: req.userId },
      { name, contacts, profilePicture },
      { new: true }
    );

    logger.info("Updated patient: %o", updatedPatient);
    res.json(updatedPatient);
  } catch (error) {
    logger.error("Error updating patient: %o", error);
    res.status(500).json({ message: "Server error", error });
  }
};
