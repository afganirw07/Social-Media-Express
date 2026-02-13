import { tiktokDownloader } from "../controllers/Tiktok";
import { Router } from "express";
import { TikTokSchema } from "../schemas/tiktok";
import { validateData } from "../middleware/zod";

const router = Router();

// Tiktok
router.post("/tiktok", validateData(TikTokSchema), tiktokDownloader);

export default router;