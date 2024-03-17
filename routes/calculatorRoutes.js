import { Router } from "express";
import {
  calculateSolarBill,
  getAllEnquiries,
} from "../controllers/calculatorControllers.js";

const router = Router();

router.get("/enquiries", getAllEnquiries);

router.post("/calculate", calculateSolarBill);

export default router;
