import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "@models/User";
import Patient from "@models/Patient";
import logger from "../utils/logger";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export const registerUser = async (req: Request, res: Response) => {
  const { email, password, role } = req.body;

  logger.info("Registering user: %s", email);

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      logger.warn("Email already in use: %s", email);
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      email,
      password: hashedPassword,
      role,
    };

    const user = await User.create(newUser);
    logger.info("User created: %s", user._id);

    await Patient.create({ userId: user._id, "contacts.email": user.email });
    logger.info("Patient record created for user: %s", user._id);

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    logger.error("Error registering user: %o", error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  logger.info("Logging in user: %s", email);

  try {
    const user = await User.findOne({ email });
    if (!user) {
      logger.warn("Invalid email or password for email: %s", email);
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      logger.warn("Invalid email or password for email: %s", email);
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: "1h",
    });
    logger.info("JWT token generated for user: %s", user._id);

    res.json({ token });
  } catch (error) {
    logger.error("Error logging in user: %o", error);
    res.status(500).json({ message: "Server error", error });
  }
};
