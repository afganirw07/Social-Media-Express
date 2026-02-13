import { tiktokDownloader } from "../controllers/Tiktok";
import { Router } from "express";

const router = Router();

// Tiktok
router.post("/tiktok", tiktokDownloader);

export default router;