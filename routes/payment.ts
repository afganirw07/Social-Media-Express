import { Router } from "express";
import { createPayment, handleWebhook } from "../controllers/Payment";
import { JwtVerify } from "../middleware/jwt";
import { validateData } from "../middleware/zod";
import { paymentSchema } from "../schemas/payment";

const router = Router();

router.post("/payment/create", JwtVerify, validateData(paymentSchema), createPayment);
router.post("/payment/webhook", handleWebhook);

export default router;
