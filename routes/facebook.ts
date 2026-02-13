import { facebookDownload } from "../controllers/Facebook";
import { Router } from "express";
import { validateData } from "../middleware/zod";
import { JwtVerify } from "../middleware/jwt";
import { FacebookSchema } from "../schemas/facebook";

const router = Router();

router.post("/facebook", JwtVerify, validateData(FacebookSchema), facebookDownload);

export default router;