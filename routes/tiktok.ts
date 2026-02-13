import { tiktokDownloader } from "../controllers/Tiktok";
import { Router } from "express";
import { TikTokSchema } from "../schemas/tiktok";
import { validateData } from "../middleware/zod";
import { JwtVerify } from "../middleware/jwt";

const router = Router();

// Tiktok
router.post("/tiktok", JwtVerify, validateData(TikTokSchema), tiktokDownloader);

export default router;