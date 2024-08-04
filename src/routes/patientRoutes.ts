import { getPatient, updatePatient } from "@controllers/patientController";

import { Router } from "express";

const router = Router();

router.get("/profile", getPatient);
router.post("/profile", updatePatient);

export default router;
