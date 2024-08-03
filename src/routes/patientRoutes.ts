import { getPatient, updatePatient } from "@controllers/patientController";

import { Router } from "express";

const router = Router();

router.get("/", getPatient);
router.post("/", updatePatient);

export default router;
