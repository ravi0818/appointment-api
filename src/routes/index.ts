import { Router } from "express";

import authRoutes from "./authRoutes";
import patientRoutes from "./patientRoutes";
import verifyToken from "@middlewares/authMiddleware";

const router = Router();

router.use("/auth", authRoutes);

router.use(verifyToken);
router.use("/patient", patientRoutes);

export default router;
